import test from "node:test";
import assert from "node:assert/strict";
import { brandAssetPresets, makeBrandAssetSvg, makeBrandBoardSvg, makePackagingSvg } from "../app/lib/local-studio.mjs";

test("packaging SVG includes the brand, product and uploaded raster logo safely", () => {
  const svg = makePackagingSvg({ name: "A & B", category: "Boxes", tagline: "<hello>", color: "#ffffff", ink: "#000000", logo: "data:image/png;base64,YQ==" }, "Box 001");
  assert.match(svg, /A &amp; B/);
  assert.match(svg, /BOX 001/);
  assert.match(svg, /&lt;hello&gt;/);
  assert.match(svg, /href="data:image\/png;base64,YQ=="/);
});

test("packaging SVG rejects unsafe logo and color values", () => {
  const svg = makePackagingSvg({ name: "Brand", color: 'red" onload="alert(1)', ink: "invalid", logo: 'https://example.com/logo.png" onload="alert(1)' }, "Box");
  assert.doesNotMatch(svg, /onload|https:\/\/example/);
  assert.match(svg, /fill="#f2f2ed"/);
});

test("brand assets produce the chosen dimensions and safely embed brand details", () => {
  const brand = { name: "A & B", tagline: "<hello>", category: "Care", color: "#aabbcc", ink: "#112233", logo: "https://example.com/logo.png" };
  for (const preset of brandAssetPresets) {
    const svg = makeBrandAssetSvg(brand, "Daily care", preset.id);
    assert.match(svg, new RegExp(`width="${preset.width}" height="${preset.height}"`));
    assert.match(svg, /A &amp; B/);
    assert.match(svg, /&lt;hello&gt;/);
    assert.doesNotMatch(svg, /https:\/\/example/);
  }
  assert.throws(() => makeBrandAssetSvg(brand, "Care", "unknown"), /supported asset format/);
});

test("brand board contains editable palette swatches and referenced typography", () => {
  const svg = makeBrandBoardSvg({ name: "North", tagline: "Hello", typography: "Inter", color: "#ffffff", ink: "#111111", palette: ["#abcdef", "#123456", "#f0e0d0"] });
  assert.match(svg, /#ABCDEF/);
  assert.match(svg, /#F0E0D0/);
  assert.match(svg, /Inter/);
  assert.doesNotMatch(svg, /<image /);
});
