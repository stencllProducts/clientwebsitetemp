"use client";

import { useState } from "react";
import { brandMarkdown, parseBrandMarkdown } from "../app/lib/brand-kit.mjs";
import { makeBrandBoardSvg, renderSvgPng } from "../app/lib/local-studio.mjs";

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function BrandEditor({ brand, setBrand, source, setSource, scenes, setScenes, selectedScenes, setSelectedScenes, fallbackScenes, onScenesChange }) {
  const [expanded, setExpanded] = useState(false);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function applyBrand(imported, label, warnings = []) {
    const palette = imported.palette?.length ? imported.palette : [];
    setBrand({
      name: imported.name || "",
      category: imported.category || "",
      tagline: imported.tagline || "",
      voice: imported.voice || "",
      audience: imported.audience || "",
      typography: imported.typography || "",
      logo: imported.logo || "",
      brief: imported.brief || "",
      palette,
      color: palette[0] || "#f2f2ed",
      ink: palette[1] || "#263c2d",
    });
    const newScenes = imported.scenes?.length ? [...new Set(imported.scenes)] : fallbackScenes;
    setScenes(newScenes);
    setSelectedScenes(newScenes);
    onScenesChange();
    setSource(label);
    setError("");
    setMessage([`Imported ${label}. Review and edit the details below.`, ...warnings].join(" "));
  }

  async function importWebsite(event) {
    event.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      const response = await fetch("/api/brand-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not import the website.");
      applyBrand(data.brand, data.source, data.warnings);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function importMarkdown(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (!/\.md$/i.test(file.name)) throw new Error("Choose a Markdown (.md) file.");
      if (file.size > 2_000_000) throw new Error("The brand kit must be under 2 MB.");
      const text = await file.text();
      const kit = parseBrandMarkdown(text);
      kit.brief = text;
      const warnings = kit.palette?.length ? [] : ["No colors found; neutral placeholders are shown."];
      if (/!\[[^\]]*(?:logo|wordmark)[^\]]*\]\((?!https?:|data:)[^)]+\)/i.test(text)) warnings.push("The kit references a local logo; upload that image below.");
      if (kit.logoUrl) {
        try {
          const response = await fetch("/api/brand-import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: kit.logoUrl, kind: "logo" }) });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Could not import the logo.");
          kit.logo = data.data;
        } catch (err) {
          warnings.push(`Logo could not be imported: ${err.message}`);
        }
      }
      applyBrand(kit, file.name, warnings);
    } catch (err) { setError(err.message); setMessage(""); }
    event.target.value = "";
  }

  function changeField(field, value) {
    setBrand((current) => {
      const next = { ...current, [field]: value };
      if (field === "color" || field === "ink") {
        const palette = [...current.palette];
        if (!palette.length) palette.push(current.color);
        if (palette.length < 2) palette.push(current.ink);
        palette[field === "color" ? 0 : 1] = value;
        next.palette = palette;
      }
      return next;
    });
  }

  async function uploadLogo(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 1_000_000) {
      setError("Choose a PNG, JPEG or WebP logo under 1 MB.");
      event.target.value = "";
      return;
    }
    try {
      const logo = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Could not read the logo file."));
        reader.readAsDataURL(file);
      });
      changeField("logo", logo);
      setError("");
    } catch (err) { setError(err.message); }
    event.target.value = "";
  }

  function toggleScene(scene) {
    if (selectedScenes.includes(scene) && selectedScenes.length === 1) {
      setError("Keep at least one scene direction selected.");
      return;
    }
    setError("");
    setSelectedScenes(selectedScenes.includes(scene) ? selectedScenes.filter((item) => item !== scene) : [...selectedScenes, scene]);
    onScenesChange();
  }

  function downloadKit() {
    const blob = new Blob([brandMarkdown(brand, selectedScenes)], { type: "text/markdown;charset=utf-8" });
    download(blob, "brand-kit.md");
  }

  async function downloadBoard(format) {
    try {
      const svg = makeBrandBoardSvg(brand);
      const blob = format === "svg" ? new Blob([svg], { type: "image/svg+xml" }) : await renderSvgPng(svg);
      download(blob, `brand-board.${format}`);
      setError("");
    } catch (err) { setError(err.message || "Could not export the brand board."); }
  }

  function changePalette(index, value) {
    setBrand((current) => ({ ...current, palette: current.palette.map((entry, i) => i === index ? value : entry) }));
  }

  function addColor() {
    setBrand((current) => {
      const palette = [...current.palette];
      if (!palette.length) palette.push(current.color);
      if (palette.length < 2) palette.push(current.ink);
      if (palette.length < 8) palette.push("#808080");
      return { ...current, palette };
    });
  }

  return <>
    <p className="panel-description">Your identity, type and voice. The reference for every creative.</p>
    <div className="brand-import">
      <button className="brand-import-toggle" aria-expanded={expanded} aria-controls="brand-import-content" onClick={() => setExpanded(!expanded)}>
        <span>{expanded ? "−" : "+"} &nbsp; Import brand</span><small>URL / .md</small>
      </button>
      {expanded && <div id="brand-import-content" className="brand-import-content">
        <form onSubmit={importWebsite}>
          <label htmlFor="brand-website">Brand website</label>
          <div className="brand-url-row"><input id="brand-website" type="text" placeholder="yourbrand.com" value={website} onChange={(event) => setWebsite(event.target.value)} required/><button type="submit" disabled={loading}>{loading ? "Extracting…" : "Extract"}</button></div>
          <p>Extract available colors, logo and typography from a public website.</p>
        </form>
        <label className="brand-upload">Upload a brand kit (.md)<input type="file" accept=".md,text/markdown" onChange={importMarkdown}/></label>
      </div>}
    </div>
    {error && <div className="error" role="alert">{error}</div>}
    {message && <div className="brand-message" role="status">{message}</div>}
    <div className="active-brand"><span className="section-index">ACTIVE BRAND</span><h3>{brand.name || "Untitled brand"}</h3><p>{source}</p><div className="brand-downloads"><button className="kit-download" onClick={downloadKit}>Kit .md ↓</button><button className="kit-download" onClick={() => downloadBoard("svg")}>Board SVG ↓</button><button className="kit-download" onClick={() => downloadBoard("png")}>Board PNG ↓</button></div><p>Board typography is a reference; an uploaded logo remains raster.</p></div>
    <div className="brand-section"><h3>Brand identity</h3><p>Make the details your own.</p><div className="fields">
      <div><label className="brand-field-label" htmlFor="brand-name">Brand name</label><input id="brand-name" value={brand.name} onChange={(event) => changeField("name", event.target.value)} maxLength={100}/></div>
      <div><label className="brand-field-label" htmlFor="brand-category">Brand category</label><input id="brand-category" value={brand.category} onChange={(event) => changeField("category", event.target.value)} maxLength={100}/></div>
      <div className="field-pair"><div><label className="brand-field-label" htmlFor="brand-color">Brand color</label><div className="color-input"><input id="brand-color" type="color" value={brand.color} onChange={(event) => changeField("color", event.target.value)}/><span>{brand.color.toUpperCase()}</span></div></div><div><label className="brand-field-label" htmlFor="brand-ink">Ink color</label><div className="color-input"><input id="brand-ink" type="color" value={brand.ink} onChange={(event) => changeField("ink", event.target.value)}/><span>{brand.ink.toUpperCase()}</span></div></div></div>
      <div><span className="brand-field-label">Additional palette colors</span><div className="palette-editor">{brand.palette.slice(2).map((value, offset) => <div className="palette-edit-row" key={offset}><label className="color-input"><input type="color" aria-label={`Palette color ${offset + 3}`} value={value} onChange={(event) => changePalette(offset + 2, event.target.value)}/><span>{value.toUpperCase()}</span></label><button type="button" className="text-button" aria-label={`Remove palette color ${offset + 3}`} onClick={() => setBrand((current) => ({ ...current, palette: current.palette.filter((_, index) => index !== offset + 2) }))}>Remove</button></div>)}</div><button type="button" className="text-button" onClick={addColor} disabled={brand.palette.length >= 8}>+ Add color</button><p className="field-hint">Up to eight colors, including brand and ink.</p></div>
      <div><label className="brand-field-label" htmlFor="brand-typography">Typography</label><input id="brand-typography" value={brand.typography} onChange={(event) => changeField("typography", event.target.value)} placeholder="Font family"/></div>
      <div><label className="brand-field-label" htmlFor="brand-logo">Brand logo</label><input id="brand-logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadLogo}/><p className="field-hint">PNG, JPEG or WebP under 1 MB. Included as an image in local packaging artwork.</p></div>
    </div></div>
    <div className="brand-section"><h3>Brand voice</h3><p>Set the message, tone and audience for your creatives.</p><div className="fields">
      <div><label className="brand-field-label" htmlFor="brand-tagline">Tagline</label><input id="brand-tagline" value={brand.tagline} onChange={(event) => changeField("tagline", event.target.value)}/></div>
      <div><label className="brand-field-label" htmlFor="brand-voice">Tone of voice</label><textarea id="brand-voice" value={brand.voice} onChange={(event) => changeField("voice", event.target.value)} rows={3}/></div>
      <div><label className="brand-field-label" htmlFor="brand-audience">Target audience</label><textarea id="brand-audience" value={brand.audience} onChange={(event) => changeField("audience", event.target.value)} rows={3}/></div>
    </div></div>
    <div className="brand-section"><h3>Scene directions</h3><p>Choose one or more settings for your product.</p><div className="scene-options">{scenes.map((scene) => <button key={scene} type="button" aria-pressed={selectedScenes.includes(scene)} className={selectedScenes.includes(scene) ? "selected" : ""} onClick={() => toggleScene(scene)}><span>{selectedScenes.includes(scene) ? "✓" : "+"}</span>{scene}</button>)}</div><p className="field-hint">At least one direction must stay selected. Choose a specific setting when creating.</p></div>
  </>;
}

export function IdentityBoard({ brand }) {
  return <div className="identity-board">
    <div className="identity-mark">
      <div className="identity-heading"><strong><span>01</span> Identity</strong><small>PRIMARY MARK</small></div>
      {brand.logo ? <img src={brand.logo} alt={`${brand.name || "Brand"} logo`}/> : <div className="identity-name">{brand.name || "Your brand"}</div>}
      <div className="identity-tagline">{brand.tagline || "Your tagline goes here."}</div>
    </div>
    <div className="identity-details"><div><div className="identity-heading"><strong><span>02</span> Typography</strong></div><div className="type-sample">Aa <small>Bb 123</small></div><strong>{brand.typography || "Not specified"}</strong><p>Font name is a reference; the font is not automatically installed.</p></div><div><div className="identity-heading"><strong><span>03</span> Color palette</strong></div>{brand.palette.length ? <div className="palette-grid">{brand.palette.map((color, index) => <div key={`${color}-${index}`}><span style={{ backgroundColor: color }}/><small>{color.toUpperCase()}</small></div>)}</div> : <p>No palette imported yet. Set your brand colors in the editor.</p>}</div></div>
  </div>;
}
