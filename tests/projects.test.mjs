import test from "node:test";
import assert from "node:assert/strict";
import { validateWorkspace } from "../app/lib/projects.mjs";

function workspace() {
  return {
    brand: { name: "Brand", category: "", tagline: "", voice: "", audience: "", typography: "", logo: "", color: "#ffffff", ink: "#000000", palette: ["#ffffff", "#000000"] },
    brandSource: "Starter kit", scenes: ["Studio"], selectedScenes: ["Studio"],
    product: "Product", description: "", direction: 0, format: "Image", assetPreset: "social-square",
    prompt: "", photo: null, outputs: [{ blob: new Blob(["image"]), name: "test.png", type: "image", source: "Imported file", artwork: "" }],
    selected: 0, approved: false, step: 3,
  };
}

test("accepts a complete saved workspace with media", () => {
  assert.doesNotThrow(() => validateWorkspace(workspace()));
});

test("rejects incomplete or inconsistent saved workspaces", () => {
  const missingMedia = workspace();
  missingMedia.outputs[0].blob = null;
  assert.throws(() => validateWorkspace(missingMedia), /invalid/);
  const invalidSelection = workspace();
  invalidSelection.selected = 2;
  assert.throws(() => validateWorkspace(invalidSelection), /invalid/);
  const invalidScenes = workspace();
  invalidScenes.selectedScenes = ["Other"];
  assert.throws(() => validateWorkspace(invalidScenes), /invalid/);
});
