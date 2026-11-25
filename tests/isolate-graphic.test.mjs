import test from "node:test";
import assert from "node:assert/strict";
import { isolateGraphic } from "../app/lib/isolate-graphic.mjs";

function image(width, height, pixel) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) data.set(pixel(x, y), (y * width + x) * 4);
  }
  return { width, height, data };
}

test("isolates a plain background and traces foreground into cropped SVG paths", () => {
  const input = image(16, 16, (x, y) => x >= 4 && x < 12 && y >= 4 && y < 12 ? [200, 0, 0, 255] : [255, 255, 255, 255]);
  const svg = isolateGraphic(input);
  assert.match(svg, /viewBox="4 4 8 8"/);
  assert.match(svg, /<mask /);
  assert.match(svg, /<path /);
  assert.doesNotMatch(svg, /<image /);
  assert.equal(input.data[3], 255);
});

test("uses existing transparency rather than removing edge-colored foreground", () => {
  const input = image(12, 12, (x, y) => x >= 2 && x < 10 && y >= 3 && y < 9 ? [255, 255, 255, 255] : [0, 0, 0, 0]);
  assert.match(isolateGraphic(input), /viewBox="2 3 8 6"/);
});

test("reports an empty foreground or inconsistent corners", () => {
  assert.throws(() => isolateGraphic(image(8, 8, () => [255, 255, 255, 255])), /No foreground/);
  const corners = image(8, 8, (x, y) => [x * 36, y * 36, 0, 255]);
  assert.throws(() => isolateGraphic(corners), /consistent background/);
});
