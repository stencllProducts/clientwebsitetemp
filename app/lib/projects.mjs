import { brandAssetPresets } from "./local-studio.mjs";

const databaseName = "form-studio-projects";

function openDatabase() {
  return new Promise((resolve, reject) => {
    let blocked = false;
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("projects", { keyPath: "id" });
      request.result.createObjectStore("project-list", { keyPath: "id" });
    };
    request.onsuccess = () => {
      const db = request.result;
      if (blocked) { db.close(); return; }
      db.onversionchange = () => db.close();
      resolve(db);
    };
    request.onerror = () => reject(request.error || new Error("Could not open project storage."));
    request.onblocked = () => { blocked = true; reject(new Error("Project storage is blocked by another tab.")); };
  });
}

async function transaction(stores, mode, action) {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(stores, mode);
      let request;
      try { request = action(tx); }
      catch (error) { tx.abort(); reject(error); return; }
      tx.oncomplete = () => resolve(request?.result);
      tx.onabort = () => reject(tx.error || new Error("Project storage operation was cancelled."));
      tx.onerror = () => reject(tx.error || new Error("Project storage operation failed."));
    });
  } finally { db.close(); }
}

export async function listProjects() {
  const projects = await transaction(["project-list"], "readonly", (tx) => tx.objectStore("project-list").getAll());
  return projects.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function saveProject(id, name, workspace) {
  validateWorkspace(workspace);
  const record = { id, name, version: 1, workspace, updatedAt: Date.now() };
  await transaction(["projects", "project-list"], "readwrite", (tx) => {
    tx.objectStore("projects").put(record);
    return tx.objectStore("project-list").put({ id, name, updatedAt: record.updatedAt });
  });
  return { id, name, updatedAt: record.updatedAt };
}

export function validateWorkspace(workspace) {
  const brand = workspace?.brand;
  const validBrand = brand && ["name", "category", "tagline", "voice", "audience", "typography", "logo", "color", "ink"].every((key) => typeof brand[key] === "string")
    && /^#[0-9a-f]{6}$/i.test(brand.color) && /^#[0-9a-f]{6}$/i.test(brand.ink)
    && (brand.brief === undefined || typeof brand.brief === "string")
    && Array.isArray(brand.palette) && brand.palette.length <= 8 && brand.palette.every((value) => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value));
  const validOutputs = Array.isArray(workspace?.outputs) && workspace.outputs.every((item) =>
    item && item.blob instanceof Blob && typeof item.name === "string" && ["image", "video"].includes(item.type)
    && typeof item.source === "string" && typeof item.artwork === "string"
    && (item.vector === undefined || typeof item.vector === "string"));
  const validScenes = Array.isArray(workspace?.scenes) && workspace.scenes.length > 0 && workspace.scenes.every((item) => typeof item === "string")
    && Array.isArray(workspace.selectedScenes) && workspace.selectedScenes.length > 0 && workspace.selectedScenes.every((item) => workspace.scenes.includes(item));
  if (!validBrand || !validOutputs || !validScenes || !["brandSource", "product", "description", "prompt"].every((key) => typeof workspace[key] === "string")
      || !["Image", "Video"].includes(workspace.format) || !brandAssetPresets.some((item) => item.id === workspace.assetPreset)
      || !Number.isInteger(workspace.direction) || workspace.direction < 0 || workspace.direction >= workspace.selectedScenes.length
      || !Number.isInteger(workspace.selected) || workspace.selected < 0 || (workspace.outputs.length > 0 && workspace.selected >= workspace.outputs.length)
      || !Number.isInteger(workspace.step) || workspace.step < 0 || workspace.step > 4
      || typeof workspace.approved !== "boolean" || (workspace.photo !== null && !(workspace.photo instanceof Blob))) {
    throw new Error("This saved project is incomplete or invalid.");
  }
}

export async function loadProject(id) {
  const project = await transaction(["projects"], "readonly", (tx) => tx.objectStore("projects").get(id));
  if (!project) throw new Error("That saved project could not be found.");
  if (project.version !== 1 || !project.workspace) throw new Error("This saved project uses an unsupported format.");
  validateWorkspace(project.workspace);
  return project;
}
