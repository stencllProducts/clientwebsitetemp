import test from "node:test";
import assert from "node:assert/strict";
import { makePackagingSvg } from "../app/lib/local-studio.mjs";

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
