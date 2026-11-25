import test from "node:test";
import assert from "node:assert/strict";
import { initialProductMockup, makeProductMockupSvg, productMockups } from "../app/lib/product-mockups.mjs";

const graphic = "data:image/png;base64,YQ==";
const photo = "data:image/jpeg;base64,Yg==";

test("each illustrated product embeds the selected graphic at its preset placement", () => {
  const illustrations = new Set();
  for (const preset of productMockups) {
    const svg = makeProductMockupSvg({ ...initialProductMockup(), product: preset.id, x: preset.x, y: preset.y, size: preset.size, graphic });
    assert.match(svg, /width="1000" height="1000" viewBox="0 0 1000 1000"/);
    assert.ok(svg.includes(`href="${graphic}" x="${preset.x * 10 - preset.size * 5}" y="${preset.y * 10 - preset.size * 5}"`));
    assert.match(svg, /fill="#e5e5e5"/);
    illustrations.add(svg.replace(/<image .*?\/>/, ""));
  }
  assert.equal(illustrations.size, productMockups.length);
});

test("photo mode embeds the photo and graphic without product illustration", () => {
  const svg = makeProductMockupSvg({ ...initialProductMockup(), mode: "photo", photo, graphic, x: 20, y: 30, size: 10 });
  assert.ok(svg.indexOf(photo) < svg.indexOf(graphic));
  assert.match(svg, /x="150" y="250" width="100" height="100"/);
  assert.doesNotMatch(svg, /fill="#e5e5e5"/);
});

test("invalid products, placements, colors and image data are rejected", () => {
  const base = { ...initialProductMockup(), graphic };
  for (const invalid of [
    { product: "unknown" }, { mode: "unknown" }, { color: 'red" onload="bad' },
    { x: -1 }, { y: Infinity }, { size: 71 },
    { graphic: 'https://example.com/image.png' }, { graphic: 'data:image/svg+xml;base64,YQ==' },
    { mode: "photo", photo: 'data:image/png;base64,YQ==" onload="bad' },
  ]) assert.throws(() => makeProductMockupSvg({ ...base, ...invalid }));
});
