const fields = {
  name: ["brand name", "name"],
  category: ["brand category", "category"],
  tagline: ["tagline", "slogan", "brand line"],
  voice: ["tone of voice", "brand voice", "voice", "tone and messaging"],
  audience: ["target audience", "audience"],
  typography: ["typography", "font family", "font", "typography and graphic language"],
};

const clean = (value) => value.replace(/^[\s*`"']+|[\s*`"']+$/g, "").trim();

export function extractColors(text) {
  return [...new Set((text.match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi) || []).map((value) => {
    const color = value.toLowerCase();
    return color.length === 4 ? `#${[...color.slice(1)].map((c) => c + c).join("")}` : color;
  }))].slice(0, 8);
}

export function parseBrandMarkdown(markdown) {
  if (!markdown.trim()) throw new Error("The brand kit is empty.");
  const result = {};
  const sections = {};
  let section = "";
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
    if (heading) {
      section = clean(heading[1]).toLowerCase();
      if (!result.name && /^#\s/.test(line)) result.name = clean(heading[1]);
      continue;
    }
    const property = line.replace(/\*\*/g, "").match(/^\s*(?:[-*]\s*)?([^:*]+?)\s*:\s*(.+)$/);
    if (property) {
      const key = clean(property[1]).toLowerCase();
      if (key === "logo" && /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(property[2].trim())) result.logo = property[2].trim();
      if (key === "logo" && /^https?:\/\//i.test(property[2].trim())) result.logoUrl = property[2].trim();
      for (const [field, names] of Object.entries(fields)) {
        if (names.includes(key)) result[field] = clean(property[2]);
      }
      if (section === "typography and graphic language" && ["headlines", "labels and details"].includes(key)) {
        (sections[section] ||= []).push(`${clean(property[1])}: ${clean(property[2])}`);
      }
      if (section === "target audience" && !line.trim().startsWith("-") && !line.trim().startsWith("*") && !fields.audience.includes(key)) {
        (sections[section] ||= []).push(clean(line));
      }
    }
    if (section && line.trim() && !property && !line.trim().startsWith("|") && !/^[-|:\s]+$/.test(line)) {
      (sections[section] ||= []).push(clean(line.replace(/^[-*]\s+/, "")));
    }
  }
  for (const [field, names] of Object.entries(fields)) {
    if (!result[field]) {
      const match = names.find((name) => sections[name]?.length);
      if (match) result[field] = field === "voice" || field === "audience" ? sections[match][0] : sections[match].join(" ");
    }
  }
  const colors = extractColors(markdown);
  if (colors.length) result.palette = colors;
  const imageLogo = markdown.match(/!\[[^\]]*logo[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
  if (!result.logo && !result.logoUrl && imageLogo) result.logoUrl = imageLogo[1];
  const sceneKey = Object.keys(sections).find((key) => /^(scene directions|scenes)$/.test(key));
  if (sceneKey) result.scenes = sections[sceneKey].filter(Boolean).slice(0, 12);
  if (!Object.keys(result).length) throw new Error("No recognizable brand details were found. Add a brand name, voice, palette, or other labeled fields.");
  return result;
}

export function brandMarkdown(brand, scenes) {
  const singleLine = (value) => String(value || "").replace(/\s*\n\s*/g, " ").trim();
  return `# ${singleLine(brand.name) || "Brand kit"}\n\nBrand name: ${singleLine(brand.name)}\nBrand category: ${singleLine(brand.category)}\nTagline: ${singleLine(brand.tagline)}\nTone of voice: ${singleLine(brand.voice)}\nTarget audience: ${singleLine(brand.audience)}\nTypography: ${singleLine(brand.typography)}\n${brand.logo ? `Logo: ${brand.logo}\n` : ""}\n## Color palette\n\n${brand.palette.map((color) => `- ${color}`).join("\n")}\n\n## Scene directions\n\n${scenes.map((scene) => `- ${singleLine(scene)}`).join("\n")}\n`;
}

export function extractWebsiteBrand(doc, css, baseUrl) {
  const meta = (selector) => doc.querySelector(selector)?.getAttribute("content")?.trim() || "";
  const title = meta('meta[property="og:site_name"]') || doc.querySelector("title")?.textContent?.split(/\s+[|–—-]\s+/)[0]?.trim() || "";
  const theme = meta('meta[name="theme-color"]');
  const styleText = [...doc.querySelectorAll("style")].map((node) => node.textContent).join("\n");
  const inlineStyles = [...doc.querySelectorAll("[style]")].slice(0, 200).map((node) => node.getAttribute("style")).join("\n");
  const colors = extractColors(`${theme} ${styleText} ${inlineStyles} ${css}`);
  const font = `${styleText}\n${inlineStyles}\n${css}`.match(/font-family\s*:\s*["']?([^;"'},\n]+)/i)?.[1]?.trim() || "";
  const logoElement = doc.querySelector('img[alt*="logo" i], img[class*="logo" i], img[id*="logo" i]');
  const logoPath = logoElement?.getAttribute("src") || doc.querySelector('link[rel~="icon"]')?.getAttribute("href") || "";
  let logoUrl = "";
  try {
    const url = new URL(logoPath, baseUrl);
    if (logoPath && ["http:", "https:"].includes(url.protocol)) logoUrl = url.href;
  } catch {
    // An invalid image reference is ignored; the rest of the kit can still be imported.
  }
  const result = { name: title.slice(0, 100), tagline: (meta('meta[property="og:description"]') || meta('meta[name="description"]')).slice(0, 500), typography: font.slice(0, 100), palette: colors };
  return { brand: result, logoUrl };
}
