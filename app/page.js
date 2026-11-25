"use client";

import { useEffect, useRef, useState } from "react";
import { BrandEditor, IdentityBoard } from "../components/brand-kit";
import ProductMockups from "../components/product-mockups";
import { brandAssetPresets, makeBrandAssetSvg, makePackagingSvg, makePreviewImage, makePreviewVideo, renderSvgPng } from "./lib/local-studio.mjs";
import { initialProductMockup } from "./lib/product-mockups.mjs";
import { listProjects, loadProject, saveProject } from "./lib/projects.mjs";

const steps = ["Brand", "Product", "Create", "Review", "Export"];
const defaultDirections = [
  { name: "Studio light", detail: "Clean & considered", color: "#d9d4c8" },
  { name: "Soft shadows", detail: "Warm & natural", color: "#ad9d85" },
  { name: "After hours", detail: "Moody & dramatic", color: "#383c35" },
];
const initialBrand = { name: "SŌL FORM", category: "DAILY ESSENTIALS", tagline: "A little ritual, just for you.", voice: "Thoughtful, uncomplicated, and quietly confident.", audience: "People who find beauty in the everyday.", color: "#c5e1b5", ink: "#263c2d", palette: ["#c5e1b5", "#263c2d"], typography: "Georgia", logo: "" };

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    spark: <><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    export: <><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v3h16v-3"/></>,
    arrow: <><path d="M4 12h16M15 7l5 5-5 5"/></>,
    upload: <><path d="M12 16V4m-4 4 4-4 4 4"/><path d="M4 16v4h16v-4"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 3-3 6 6"/></>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Label({ children, hint }) { return <div className="label-row"><label>{children}</label>{hint && <span>{hint}</span>}</div>; }

export default function Home() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(initialBrand);
  const [brandSource, setBrandSource] = useState("Starter kit");
  const [scenes, setScenes] = useState(defaultDirections.map((item) => item.name));
  const [selectedScenes, setSelectedScenes] = useState(defaultDirections.map((item) => item.name));
  const [product, setProduct] = useState("Daily nourishment");
  const [description, setDescription] = useState("A considered essential for a more intentional everyday.");
  const [direction, setDirection] = useState(0);
  const [format, setFormat] = useState("Image");
  const [assetPreset, setAssetPreset] = useState(brandAssetPresets[0].id);
  const [mockup, setMockup] = useState(initialProductMockup);
  const [prompt, setPrompt] = useState("A premium product photograph with soft natural light, thoughtful shadows and tactile materials.");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [savedProjectId, setSavedProjectId] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [projectError, setProjectError] = useState("");
  const [projectMessage, setProjectMessage] = useState("");
  const outputUrls = useRef(new Set());
  const creating = useRef(false);
  const directions = scenes.filter((scene) => selectedScenes.includes(scene)).map((name, index) => ({
    name,
    detail: defaultDirections.find((item) => item.name === name)?.detail || "Brand direction",
    color: defaultDirections[index % defaultDirections.length].color,
  }));
  const svg = makePackagingSvg(brand, product);
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const activeOutput = outputs[selected];

  useEffect(() => {
    if (!photo) { setPhotoUrl(""); return; }
    const url = URL.createObjectURL(photo);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);
  useEffect(() => {
    const urls = outputUrls.current;
    return () => { urls.forEach((url) => URL.revokeObjectURL(url)); urls.clear(); };
  }, []);
  useEffect(() => {
    let active = true;
    listProjects().then((items) => { if (active) setProjects(items); })
      .catch(() => { if (active) setProjectError("Could not access local project storage. Check browser storage permissions."); });
    return () => { active = false; };
  }, []);

  function addOutput(blob, name, type, source, artwork = "") {
    const url = URL.createObjectURL(blob);
    outputUrls.current.add(url);
    setOutputs((current) => [...current, { blob, url, name, type, source, artwork }]);
    setSelected(outputs.length);
    setApproved(false);
    setStep(3);
  }

  async function createPreview() {
    if (creating.current) return;
    creating.current = true;
    setBusy(true); setError(""); setMessage("");
    try {
      const directionName = directions[direction]?.name || "Studio light";
      const blob = format === "Video"
        ? await makePreviewVideo(svg, photoUrl, brand, directionName)
        : await makePreviewImage(svg, photoUrl, brand, directionName);
      addOutput(blob, `packaging-preview-${outputs.length + 1}.${format === "Video" ? "webm" : "png"}`, format.toLowerCase(), "Local preview", svg);
    } catch (err) { setError(err.message); }
    finally { creating.current = false; setBusy(false); }
  }

  async function createBrandAsset() {
    if (creating.current) return;
    creating.current = true;
    setBusy(true); setError(""); setMessage("");
    try {
      const preset = brandAssetPresets.find((item) => item.id === assetPreset);
      if (!preset) throw new Error("Choose a supported asset format.");
      const artwork = makeBrandAssetSvg(brand, product, preset.id);
      const blob = await renderSvgPng(artwork);
      addOutput(blob, `${preset.id}-${outputs.length + 1}.png`, "image", preset.label, artwork);
    } catch (err) { setError(err.message || "Could not create the brand asset."); }
    finally { creating.current = false; setBusy(false); }
  }

  async function createProductMockup(artwork, preset) {
    if (creating.current) return;
    creating.current = true;
    setBusy(true); setError(""); setMessage("");
    try {
      const blob = await renderSvgPng(artwork);
      addOutput(blob, `${preset.id}-mockup-${outputs.length + 1}.png`, "image", `${preset.label} mockup`, artwork);
    } catch (err) { setError(err.message || "Could not create the product mockup."); }
    finally { creating.current = false; setBusy(false); }
  }

  async function saveWorkspace(update) {
    if (creating.current) return;
    const name = projectName.trim();
    if (!name) { setProjectError("Enter a project name before saving."); setProjectMessage(""); return; }
    if (update && !currentProjectId) { setProjectError("Open or save a project before updating it."); setProjectMessage(""); return; }
    creating.current = true;
    setBusy(true); setProjectError(""); setProjectMessage("");
    try {
      const id = update ? currentProjectId : crypto.randomUUID();
      const workspace = {
        brand, brandSource, scenes, selectedScenes, product, description, direction, format, assetPreset, prompt, photo, selected, approved, step, mockup,
        outputs: outputs.map(({ blob, name: outputName, type, source, artwork, vector }) => ({ blob, name: outputName, type, source, artwork, vector })),
      };
      const saved = await saveProject(id, name, workspace);
      setProjects((current) => [saved, ...current.filter((item) => item.id !== id)]);
      setSavedProjectId(id); setCurrentProjectId(id);
      setProjectMessage(`Saved "${name}" on this device.`);
    } catch (err) { setProjectError(`Could not save the project: ${err.message || "Browser storage is unavailable."}`); }
    finally { creating.current = false; setBusy(false); }
  }

  async function openWorkspace() {
    if (!savedProjectId || creating.current) return;
    if (!window.confirm("Opening a saved project replaces the current workspace. Save any changes you want to keep first.")) return;
    creating.current = true;
    setBusy(true); setProjectError(""); setProjectMessage("");
    try {
      const saved = await loadProject(savedProjectId);
      const workspace = saved.workspace;
      const restored = workspace.outputs.map((item) => {
        const url = URL.createObjectURL(item.blob);
        const vectorUrl = item.vector ? URL.createObjectURL(new Blob([item.vector], { type: "image/svg+xml" })) : "";
        return { ...item, url, vectorUrl };
      });
      outputUrls.current.forEach((url) => URL.revokeObjectURL(url));
      outputUrls.current.clear();
      restored.forEach((item) => { outputUrls.current.add(item.url); if (item.vectorUrl) outputUrls.current.add(item.vectorUrl); });
      setBrand(workspace.brand); setBrandSource(workspace.brandSource); setScenes(workspace.scenes); setSelectedScenes(workspace.selectedScenes);
      setProduct(workspace.product); setDescription(workspace.description); setDirection(workspace.direction); setFormat(workspace.format);
      setAssetPreset(workspace.assetPreset); setPrompt(workspace.prompt); setPhoto(workspace.photo); setOutputs(restored);
      setMockup(workspace.mockup || initialProductMockup());
      setSelected(workspace.selected); setApproved(workspace.approved); setStep(workspace.step);
      setProjectName(saved.name); setCurrentProjectId(saved.id);
      setError(""); setMessage("");
      setProjectMessage(`Opened "${saved.name}" from this device.`);
    } catch (err) { setProjectError(`Could not open the project: ${err.message || "Browser storage is unavailable."}`); }
    finally { creating.current = false; setBusy(false); }
  }

  function importCreative(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageTypes = ["image/png", "image/jpeg", "image/webp"];
    const videoTypes = ["video/mp4", "video/webm"];
    if (![...imageTypes, ...videoTypes].includes(file.type) || file.size > 60_000_000) {
      setError("Choose a PNG, JPEG, WebP, MP4 or WebM file under 60 MB.");
    } else {
      setError("");
      addOutput(file, file.name, imageTypes.includes(file.type) ? "image" : "video", "Imported file");
    }
    event.target.value = "";
  }

  async function copyAiBrief() {
    const brief = `${prompt}\n\nBrand: ${brand.name}\nProduct: ${product}\nDescription: ${description}\nDirection: ${directions[direction]?.name || "Studio light"}\nVoice: ${brand.voice}\nAudience: ${brand.audience}\nTagline: ${brand.tagline}\nTypography: ${brand.typography}\nPalette: ${brand.palette.join(", ")}${brand.brief ? `\n\nImported brand brief:\n${brand.brief}` : ""}`;
    try {
      await navigator.clipboard.writeText(brief);
      setError(""); setMessage("Brief copied. Paste it into Google AI Studio or Copilot, save the image, then import it here.");
    } catch { setError("Could not copy the brief. Check clipboard permissions and try again."); }
  }

  async function isolateSelected() {
    const item = outputs[selected];
    if (!item || (!item.artwork && item.type !== "image") || creating.current) return;
    creating.current = true;
    setBusy(true); setError(""); setMessage("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const isolated = item.artwork || await (await import("./lib/isolate-graphic.mjs")).isolateImage(item.url);
      const url = URL.createObjectURL(new Blob([isolated], { type: "image/svg+xml" }));
      outputUrls.current.add(url);
      if (item.vectorUrl) {
        URL.revokeObjectURL(item.vectorUrl);
        outputUrls.current.delete(item.vectorUrl);
      }
      setOutputs((current) => current.map((output) => output.url === item.url ? { ...output, vector: isolated, vectorUrl: url } : output));
      setMessage("Graphic isolated. Review the result before downloading.");
    } catch (err) {
      setError(err.message || "Could not isolate this graphic.");
    } finally {
      creating.current = false; setBusy(false);
    }
  }

  function downloadIsolated(item, format) {
    const filename = `${item.name.replace(/\.[^.]+$/, "")}-isolated.${format}`;
    if (format === "svg") {
      saveBlob(new Blob([item.vector], { type: "image/svg+xml" }), filename);
      return;
    }
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) { setError("Could not render the isolated graphic."); return; }
      if (format === "jpg") { context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height); }
      context.drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) saveBlob(blob, filename);
        else setError("Could not export the isolated graphic.");
      }, format === "jpg" ? "image/jpeg" : "image/png", 0.92);
    };
    image.onerror = () => setError("Could not render the isolated graphic.");
    image.src = item.vectorUrl;
  }

  function downloadPng() {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas"); canvas.width = 1000; canvas.height = 1200;
      const context = canvas.getContext("2d");
      if (!context) { setError("Could not render the packaging artwork."); return; }
      context.drawImage(image, 0, 0);
      canvas.toBlob((blob) => { if (blob) saveBlob(blob, "form-packaging.png"); else setError("Could not export PNG."); }, "image/png");
    };
    image.onerror = () => setError("Could not render the packaging artwork.");
    image.src = svgUrl;
  }

  const navIcons = ["grid", "box", "spark", "check", "export"];
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="wordmark"><span className="mark">✳</span><div>form<span className="wordmark-dot">.</span><small>BRAND STUDIO</small></div></div>
      <div className="sidebar-section">YOUR WORKSPACE <span>✳</span></div>
      <nav aria-label="Studio workflow">{steps.map((item, index) => <button key={item} className={`nav-item ${step === index ? "active" : ""}`} onClick={() => setStep(index)} aria-current={step === index ? "step" : undefined}><Icon name={navIcons[index]}/><span>{item}</span><small>{String(index + 1).padStart(2, "0")}</small></button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-note"><span className="note-icon">✳</span><div><strong>Made for ideas.</strong><p>From first thought to final form.</p></div></div><div className="sidebar-foot"><span className="status-dot"/> YOUR CREATIVE SPACE <span>↗</span></div></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="breadcrumbs">Workspace <span>/</span> <strong>{steps[step]}</strong></div><span className="workspace-pill">✳ &nbsp; Brand studio</span><div className="top-actions"><span className="draft-badge"><span/> LOCAL WORKSPACE</span><div className="avatar">F</div></div></header>
      <div className="mobile-nav">{steps.map((item, index) => <button key={item} onClick={() => setStep(index)} className={index === step ? "active" : ""}>{item}</button>)}</div>
      <main className="content">
        <div className="studio-grid">
          <section className="editor-panel">
            <div className="panel-title"><div><span className="section-index">0{step + 1} / {steps[step].toUpperCase()}</span><h2>{["Build your brand", "Your product", "Creative direction", "Review creative", "Export your work"][step]}</h2></div><span className="panel-symbol">✳</span></div>
            <details className="project-library"><summary><span><strong>Project library</strong><small>Save and reopen work on this device</small></span><span>＋</span></summary><div className="project-library-content"><div><label htmlFor="project-name">Project name</label><input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} maxLength={80} placeholder="Name this project"/><div className="project-actions"><button type="button" onClick={() => saveWorkspace(false)} disabled={busy}>Save new project</button><button type="button" onClick={() => saveWorkspace(true)} disabled={busy || !currentProjectId}>Update open project</button></div>{currentProjectId && <p>Updating replaces: {projects.find((item) => item.id === currentProjectId)?.name}</p>}</div><div><label htmlFor="saved-project">Saved projects</label><select id="saved-project" value={savedProjectId} onChange={(event) => setSavedProjectId(event.target.value)} disabled={busy}><option value="">Choose a project</option>{projects.map((item) => <option key={item.id} value={item.id}>{item.name} · {new Date(item.updatedAt).toLocaleString()}</option>)}</select><button type="button" className="project-open" onClick={openWorkspace} disabled={busy || !savedProjectId}>Open project</button><p>Opening replaces the current workspace. Saves stay in this browser; clearing site data removes them.</p></div>{projectError && <div role="alert" className="error project-feedback">{projectError}</div>}{projectMessage && <div role="status" className="job-status project-feedback">{projectMessage}</div>}</div></details>
            {step === 0 && <BrandEditor brand={brand} setBrand={setBrand} source={brandSource} setSource={setBrandSource} scenes={scenes} setScenes={setScenes} selectedScenes={selectedScenes} setSelectedScenes={setSelectedScenes} fallbackScenes={defaultDirections.map((item) => item.name)} onScenesChange={() => setDirection(0)}/>}
            {step === 1 && <><p className="panel-description">Tell us what you’re making. Optionally add a product reference to your local preview.</p><div className="fields"><div><Label>Product name</Label><input value={product} onChange={(event) => setProduct(event.target.value)} maxLength={40}/></div><div><Label>Product description</Label><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3}/></div><div><Label hint="PNG / JPG / WEBP">Product reference</Label><label className="upload-box"><Icon name="upload" size={22}/><strong>{photo ? photo.name : "Choose a product image"}</strong><span>{photo ? "Click to replace image" : "Optional reference image"}</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file && (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 10_000_000)) setError("Choose a PNG, JPEG or WebP under 10 MB."); else { setPhoto(file || null); setError(""); } event.target.value = ""; }}/></label>{photo && <button className="text-button" onClick={() => setPhoto(null)}>Remove image</button>}</div><div className="info-box">✳ <span>The reference appears beside the artwork in local previews. It is not automatically applied to the packaging.</span></div></div></>}
            {step === 2 && <><p className="panel-description">Create a local mockup or import an image made with Gemini or Copilot.</p><div className="fields">
              <div><Label>Scene direction</Label><div className="direction-grid">{directions.map((item, index) => <button key={item.name} className={`direction-card ${direction === index ? "selected" : ""}`} onClick={() => setDirection(index)}><span className={`direction-art art-${index % 3}`} style={{ backgroundColor: item.color }}><i/></span><strong>{item.name}</strong><small>{item.detail}</small></button>)}</div><p className="field-hint">The built-in backgrounds are shown for the three default directions; custom directions use the studio background.</p></div>
              <div><Label>Local preview</Label><div className="segmented">{["Image", "Video"].map((item) => <button key={item} className={format === item ? "selected" : ""} onClick={() => setFormat(item)}><Icon name={item === "Image" ? "image" : "video"} size={16}/> {item}</button>)}</div><p className="field-hint">Locally rendered, not AI-generated. Video is a four-second WebM animation; keep this tab open while recording.</p></div>
              <div className="settings asset-workflow"><h3>Brand assets</h3><p>Create a social layout or illustrated mockup using your current brand and product. Choose a format and review the result.</p><div className="label-row"><span>Choose an asset</span></div><div className="brand-asset-grid">{brandAssetPresets.map((item) => <button key={item.id} type="button" className={`brand-asset-option ${assetPreset === item.id ? "selected" : ""}`} aria-pressed={assetPreset === item.id} disabled={busy} onClick={() => setAssetPreset(item.id)}><span className="asset-thumbnail" style={{ backgroundColor: brand.color, color: brand.ink }}><span>✳</span><i/></span><strong>{item.label}</strong><small>{item.width} × {item.height}</small></button>)}</div><button type="button" className="file-button local-action" disabled={busy} onClick={createBrandAsset}>Create brand asset</button><p className="field-hint">These are editable flat layouts, not AI-generated or photorealistic. The logo remains a raster image.</p></div>
              <ProductMockups value={mockup} onChange={setMockup} outputs={outputs} busy={busy} onCreate={createProductMockup}/>
              <div className="settings"><h3>Optional: create with AI</h3><p>Copy your brief, paste it into Google AI Studio or Copilot, then save and import the resulting image. Generation happens outside this app.</p><div className="label-row"><label htmlFor="creative-prompt">Creative prompt</label></div><textarea id="creative-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4}/><button type="button" className="file-button local-action" onClick={copyAiBrief}>Copy creative brief</button><p className="field-hint">The copied text includes your brand and product details and the full imported Markdown brief. Review it before sharing; do not share sensitive information.</p><a className="file-button local-action external-action" href="https://aistudio.google.com?model=gemini-2.5-flash-image" target="_blank" rel="noopener noreferrer">Open Nano Banana in Google AI Studio ↗</a><a className="file-button local-action external-action" href="https://aistudio.google.com?model=gemini-nano-banana-2.1" target="_blank" rel="noopener noreferrer">Open Nano Banana 2.1 in Google AI Studio ↗</a><p className="field-hint">Google sign-in and model availability are subject to Google’s terms and limits. Free use in AI Studio is not guaranteed; check your account before generating. Copilot may use AI credits.</p><label className="file-button local-action">Import AI image or video<input type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" disabled={busy} onChange={importCreative}/></label></div>
              <div className="settings"><h3>Isolate a graphic</h3><p>Choose a creative to isolate and export. Local packaging previews use their original artwork; local brand assets retain their complete editable layout. Imported images are traced together as one graphic.</p>
                {outputs.length > 0 ? <><div className="label-row"><label htmlFor="isolate-output">Creative</label></div><select id="isolate-output" value={selected} disabled={busy} onChange={(event) => { setSelected(Number(event.target.value)); setError(""); setMessage(""); }}>{outputs.map((item, index) => <option key={item.url} value={index}>{item.name}{!item.artwork && item.type === "video" ? " (video not supported)" : ""}</option>)}</select><button type="button" className="file-button local-action" disabled={busy || (!activeOutput?.artwork && activeOutput?.type !== "image")} onClick={isolateSelected}>{busy ? "Working…" : "Isolate graphic"}</button>{activeOutput?.vector && <><div className="export-actions">{["svg", "png", "jpg"].map((kind) => <button key={kind} type="button" onClick={() => downloadIsolated(activeOutput, kind)}>↓ {kind === "jpg" ? "JPEG" : kind.toUpperCase()}</button>)}</div><p className="field-hint">PNG and SVG can be transparent; JPEG uses white. Local artwork may contain a raster logo.</p></>}</> : <p>Create or import an image first, then return here to isolate it.</p>}
                <p className="field-hint">Imported images work best with transparency or a plain, consistent background. Tracing simplifies colors and details; complex scenes and multiple objects may not isolate cleanly. Imported videos cannot be traced.</p>
              </div>
            </div></>}
            {step === 3 && <><p className="panel-description">A thoughtful final look makes all the difference.</p>{outputs.length ? <><div className="output-list">{outputs.map((item, index) => <button key={item.url} className={`output-item ${selected === index ? "selected" : ""}`} onClick={() => { setSelected(index); setApproved(false); setError(""); }}><span className="output-icon"><Icon name={item.type === "video" ? "video" : "image"}/></span><span><strong>{item.name}</strong><small>{item.type} · {item.source}</small></span><span>↗</span></button>)}</div><button className={`approve-button ${approved ? "approved" : ""}`} onClick={() => setApproved(!approved)}>{approved ? "✓ Approved for export" : "Approve this creative"}</button></> : <div className="empty-state"><Icon name="spark" size={26}/><strong>Nothing to review just yet.</strong><p>Create a local preview or import a creative first.</p><button className="text-button" onClick={() => setStep(2)}>Go to Create →</button></div>}</>}
            {step === 4 && <><p className="panel-description">Take your brand with you. Download the editable vector or a ready-to-share image.</p><div className="export-card"><div className="export-icon"><Icon name="box"/></div><div><strong>Packaging artwork</strong><p>Original layout with your brand details</p></div><span>01</span></div><div className="export-actions"><button onClick={() => saveBlob(new Blob([svg], { type: "image/svg+xml" }), "form-packaging.svg")}>↓ &nbsp; Download SVG</button><button onClick={downloadPng}>↓ &nbsp; Download PNG</button></div><p className="field-hint">SVG text and shapes are editable. An uploaded logo is embedded as a raster image, not converted to vectors.</p>{outputs.length > 0 && <><div className="divider"/><Label>Creative outputs</Label>{outputs.map((item) => <div key={item.url}><div className="download-row"><div><strong>{item.name}</strong><small>{item.type} · {item.source}</small></div><button onClick={() => saveBlob(item.blob, item.name)}>Download ↓</button></div>{item.artwork && <div className="export-actions"><button onClick={() => saveBlob(new Blob([item.artwork], { type: "image/svg+xml" }), `${item.name.replace(/\.[^.]+$/, "")}-artwork.svg`)}>Original artwork SVG ↓</button></div>}{item.vector && <div className="export-actions">{["svg", "png", "jpg"].map((kind) => <button key={kind} onClick={() => downloadIsolated(item, kind)}>Isolated {kind === "jpg" ? "JPEG" : kind.toUpperCase()} ↓</button>)}</div>}</div>)}</>}</>}
            {error && <div role="alert" className="error">{error}</div>}
            {message && <div role="status" className="job-status">{message}</div>}
            <div className="editor-footer">{step > 0 && <button className="back-button" disabled={busy} onClick={() => setStep(step - 1)}>← Back</button>}{step < 4 && <button className="primary-button" disabled={busy} onClick={() => step === 2 ? createPreview() : setStep(step + 1)}>{busy ? "Working…" : step === 2 ? `Create local ${format.toLowerCase()}` : step === 3 ? "Continue to export" : `Continue to ${steps[step + 1]}`} <Icon name="arrow" size={17}/></button>}</div>
          </section>
          <section className="preview-panel" aria-label="Live preview"><div className="preview-hero"><div className="page-heading"><div><div className="eyebrow"><span className="green-dot"/> YOUR BRAND STUDIO <span className="eyebrow-line"/> {String(step + 1).padStart(2, "0")} / 05</div><h1>{["Build a brand that feels like you.", "Your product, in focus.", "Bring your ideas to life.", "Make the final touches.", "Made to go everywhere."][step]}</h1><p>{["Shape your identity, colors and voice in one space. See your brand come together as you create.", "Introduce what you’re making and add a reference to your local preview.", "Create local brand assets and product mockups, or import a creative made elsewhere.", "Take a closer look at your creative before sharing it with the world.", "Download your brand artwork and creatives, ready to take wherever you go."][step]}</p></div></div><div className="preview-visual"><div className="preview-header"><div><span className="preview-indicator"/> {step === 0 ? "BRAND PREVIEW" : step === 2 && activeOutput?.vectorUrl ? "ISOLATED GRAPHIC" : step >= 3 && activeOutput ? "CREATIVE PREVIEW" : "PACKAGING PREVIEW"}</div><span>✳ &nbsp; LIVE ON YOUR DEVICE</span></div><div className="preview-stage">
            {step === 0 ? <IdentityBoard brand={brand}/> : step === 2 && activeOutput?.vectorUrl ? <div className="generated-preview"><img src={activeOutput.vectorUrl} alt={`Isolated graphic from ${activeOutput.name}`} onError={() => setError("Could not display the isolated graphic.")}/></div> : step >= 3 && activeOutput ? <div className="generated-preview">{activeOutput.type === "video" ? <video src={activeOutput.url} controls playsInline onError={() => setError("This browser could not play the video. Download it from Export or try another browser.")}/> : <img src={activeOutput.url} alt={activeOutput.name} onError={() => setError("This browser could not display the imported image.")}/>}</div> : <div className="art-scene"><div className="scene-orbit orbit-one"/><div className="scene-orbit orbit-two"/><div className="scene-caption top-caption">A LITTLE SOMETHING<br/>MADE BY YOU <span>↗</span></div><div className="product-shadow"/><div className="product-mockup"><img src={svgUrl} alt="Live packaging artwork preview"/></div><div className="scene-caption bottom-caption">CONSIDERED BY NATURE.<br/>CREATED BY YOU.</div><div className="scene-number">01 — 05</div></div>}
          </div><div className="preview-bottom"><div><span className="preview-mini">THE CURRENT VIEW</span><strong>{step >= 3 && activeOutput ? activeOutput.name : brand.name || "Your brand"} <span>↗</span></strong><p>{step >= 3 && activeOutput ? activeOutput.source : "Your brand, in its element."}</p></div><div className="preview-bottom-right"><span className="swatch" style={{ background: brand.color }}/><span className="swatch" style={{ background: brand.ink }}/><span className="swatch swatch-light"/><div>LIVE PREVIEW<br/><strong>MADE IN FORM.</strong></div></div></div></div></div><div className="studio-guide"><div className="guide-heading"><div><span className="section-index">FROM IDEA TO IDENTITY</span><h2>Make it yours, step by step.</h2></div><span>✳</span></div><div className="guide-grid">{[{ number: "01", title: "Shape your brand", detail: "Set your identity, colors and voice.", target: 0 }, { number: "02", title: "Create your assets", detail: "Explore layouts and product mockups.", target: 2 }, { number: "03", title: "Share your work", detail: "Review and export your creatives.", target: 4 }].map((item) => <button key={item.number} type="button" disabled={busy} onClick={() => setStep(item.target)}><span>{item.number} <b>↗</b></span><strong>{item.title}</strong><small>{item.detail}</small></button>)}</div></div></section>
        </div><div className="workspace-footer"><span>FORM STUDIO © 2026</span><span>MADE FOR THE MAKING &nbsp; ✳</span></div>
      </main>
    </div>
  </div>;
}
