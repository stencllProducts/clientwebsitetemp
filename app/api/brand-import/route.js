import { resolve4 } from "node:dns/promises";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { BlockList, isIP } from "node:net";
import { parse } from "node-html-parser";
import { NextResponse } from "next/server";
import { extractWebsiteBrand } from "../../lib/brand-kit.mjs";

export const runtime = "nodejs";

const blocked = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24],
  ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24],
  ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4],
]) blocked.addSubnet(address, prefix, "ipv4");

async function publicAddress(url) {
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || (url.port && url.port !== (url.protocol === "https:" ? "443" : "80"))) {
    throw new Error("Enter a public HTTP or HTTPS website on its standard port.");
  }
  const host = url.hostname;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || isIP(host.replace(/^\[|\]$/g, "")) === 6) throw new Error("Private or local addresses are not allowed.");
  let addresses;
  if (isIP(host) === 4) {
    addresses = [host];
  } else {
    let timer;
    try {
      addresses = await Promise.race([
        resolve4(host),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Website DNS lookup timed out.")), 5000); }),
      ]);
    } finally { clearTimeout(timer); }
  }
  if (!addresses.length || addresses.some((address) => blocked.check(address, "ipv4"))) throw new Error("Private or local addresses are not allowed.");
  return addresses[0];
}

async function fetchPublic(url, redirects = 0) {
  if (redirects > 3) throw new Error("The website redirected too many times.");
  const address = await publicAddress(url);
  const result = await new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? httpsRequest : httpRequest;
    const req = transport(url, {
      agent: false,
      family: 4,
      lookup: (_host, _options, callback) => callback(null, address, 4),
      headers: { "User-Agent": "FormStudioBrandImport/1.0", Accept: "text/html,text/css,image/png,image/jpeg,image/webp;q=0.9,*/*;q=0.1" },
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        resolve({ redirect: response.headers.location });
        return;
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        reject(new Error(`Website returned HTTP ${response.statusCode}.`));
        return;
      }
      const chunks = [];
      let size = 0;
      response.on("data", (chunk) => {
        size += chunk.length;
        if (size > 1_000_000) response.destroy(new Error("The website resource is larger than 1 MB."));
        else chunks.push(chunk);
      });
      const timer = setTimeout(() => req.destroy(new Error("Website request timed out.")), 10000);
      req.on("close", () => clearTimeout(timer));
      response.on("end", () => resolve({ contentType: (response.headers["content-type"] || "").split(";")[0].toLowerCase(), bytes: Buffer.concat(chunks) }));
      response.on("error", reject);
    });
    req.setTimeout(8000, () => req.destroy(new Error("Website request timed out.")));
    req.on("error", reject);
    req.end();
  });
  if (result.redirect) return fetchPublic(new URL(result.redirect, url), redirects + 1);
  return { ...result, url: url.href };
}

export async function POST(request) {
  try {
    const { url: input, kind = "page" } = await request.json();
    if (typeof input !== "string" || !input.trim() || input.length > 2048 || !["page", "logo"].includes(kind)) {
      return NextResponse.json({ error: "Enter a valid website URL." }, { status: 400 });
    }
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input.trim()) ? input.trim() : `https://${input.trim()}`);
    const resource = await fetchPublic(url);
    if (kind === "logo") {
      if (!["image/png", "image/jpeg", "image/webp"].includes(resource.contentType)) throw new Error("The logo must be a PNG, JPEG or WebP image.");
      return NextResponse.json({ data: `data:${resource.contentType};base64,${resource.bytes.toString("base64")}` });
    }
    if (!["text/html", "application/xhtml+xml"].includes(resource.contentType)) throw new Error("The URL did not return a supported HTML page.");
    const doc = parse(resource.bytes.toString("utf8"));
    const warnings = [];
    const styles = [];
    for (const link of doc.querySelectorAll('link[rel~="stylesheet"]').slice(0, 2)) {
      try {
        const css = await fetchPublic(new URL(link.getAttribute("href"), resource.url));
        if (css.contentType !== "text/css") throw new Error("Unsupported stylesheet format.");
        styles.push(css.bytes.toString("utf8"));
      } catch {
        warnings.push("A stylesheet could not be read, so some colors or fonts may be missing.");
      }
    }
    const { brand, logoUrl } = extractWebsiteBrand(doc, styles.join("\n"), resource.url);
    if (logoUrl) {
      try {
        const logo = await fetchPublic(new URL(logoUrl));
        if (!["image/png", "image/jpeg", "image/webp"].includes(logo.contentType)) throw new Error("Unsupported logo format.");
        brand.logo = `data:${logo.contentType};base64,${logo.bytes.toString("base64")}`;
      } catch {
        warnings.push("The logo could not be imported. PNG, JPEG and WebP logos are supported.");
      }
    } else {
      warnings.push("No logo image was found.");
    }
    if (!brand.palette.length) warnings.push("No hex colors were found.");
    if (!brand.typography) warnings.push("No font family was found.");
    if (!brand.name) warnings.push("No brand name was found.");
    return NextResponse.json({ brand, source: resource.url, warnings });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not import the website." }, { status: 400 });
  }
}
