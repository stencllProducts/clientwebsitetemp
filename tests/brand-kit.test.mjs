import test from "node:test";
import assert from "node:assert/strict";
import { parse } from "node-html-parser";
import { brandMarkdown, extractWebsiteBrand, parseBrandMarkdown } from "../app/lib/brand-kit.mjs";

test("imports labeled Markdown fields, colors and scene directions", () => {
  const result = parseBrandMarkdown("# North Studio\n\n**Tagline:** Better every day\n\n## Tone of voice\nWarm and clear.\n\n## Color palette\n- #abc\n- #123456\n\n## Scene directions\n- Morning light\n- Dark stone");
  assert.equal(result.name, "North Studio");
  assert.equal(result.tagline, "Better every day");
  assert.equal(result.voice, "Warm and clear.");
  assert.deepEqual(result.palette, ["#aabbcc", "#123456"]);
  assert.deepEqual(result.scenes, ["Morning light", "Dark stone"]);
});

test("downloaded kits can be imported without losing fields", () => {
  const brand = { name: "North", category: "Skincare", tagline: "Simply better", voice: "Calm", audience: "Everyone", typography: "Inter", palette: ["#abcdef", "#123456"], logo: "data:image/png;base64,YQ==" };
  const result = parseBrandMarkdown(brandMarkdown(brand, ["Morning light"]));
  assert.deepEqual(result, { ...brand, scenes: ["Morning light"] });
});

test("extracts site metadata, CSS and a resolved logo reference", () => {
  const html = `<html><head><title>North | Home</title><meta name="theme-color" content="#abc"><meta name="description" content="Daily care"><style>body{font-family: Inter; color:#123456}</style></head><body><img alt="North logo" src="/logo.png"></body></html>`;
  const result = extractWebsiteBrand(parse(html), "", "https://example.com");
  assert.equal(result.brand.name, "North");
  assert.equal(result.brand.tagline, "Daily care");
  assert.equal(result.brand.typography, "Inter");
  assert.deepEqual(result.brand.palette, ["#aabbcc", "#123456"]);
  assert.equal(result.logoUrl, "https://example.com/logo.png");
});

test("rejects empty or unrecognized kits", () => {
  assert.throws(() => parseBrandMarkdown(""));
  assert.throws(() => parseBrandMarkdown("Unstructured text without brand fields."));
});

test("imports design briefs with a brand line, tone section and typography guidance", () => {
  const markdown = "# Box 001\n\n**Brand Line:** *\"For the ones outside.\"*\n\n## Target Audience\nFive groups, one trait: building their own lane.\n\n| Group | Who |\n| --- | --- |\n| Creators | Builders |\n\n## Tone and Messaging\nThe voice is declarative and short.\n\n**Sample lines to explore:**\n\n* `NO BOX FITS.`\n\n## Typography and Graphic Language\n\n* **Headlines:** Heavy grotesk, all caps.\n\n* **Labels and details:** Monospace, small.\n";
  const result = parseBrandMarkdown(markdown);
  assert.equal(result.tagline, "For the ones outside.");
  assert.equal(result.voice, "The voice is declarative and short.");
  assert.equal(result.audience, "Five groups, one trait: building their own lane.");
  assert.equal(result.typography, "Headlines: Heavy grotesk, all caps. Labels and details: Monospace, small.");
});
