"use client";

import { useEffect, useMemo, useState } from "react";
import { makeProductMockupSvg, productMockups } from "../app/lib/product-mockups.mjs";

function useRasterData(source, maxSide, description) {
  const [result, setResult] = useState({ source: "", data: "", error: "" });
  useEffect(() => {
    if (!source) return;
    let active = true;
    const image = new Image();
    image.onload = () => {
      try {
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas is unavailable.");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/png");
        if (active) setResult({ source, data, error: "" });
      } catch {
        if (active) setResult({ source, data: "", error: `Could not prepare the ${description}.` });
      }
    };
    image.onerror = () => { if (active) setResult({ source, data: "", error: `Could not open the ${description}.` }); };
    image.src = source;
    return () => { active = false; };
  }, [source, maxSide, description]);
  return result.source === source ? result : { data: "", error: "" };
}

export default function ProductMockups({ value, onChange, outputs, busy, onCreate }) {
  const [photoSource, setPhotoSource] = useState({ photo: null, url: "" });
  const [fileError, setFileError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const selected = value.graphicIndex === "" ? null : outputs[Number(value.graphicIndex)];
  const graphicSource = selected ? (value.graphicVersion === "isolated" ? selected.vectorUrl : selected.url) : "";

  useEffect(() => {
    if (!value.photo) { setPhotoSource({ photo: null, url: "" }); return; }
    const url = URL.createObjectURL(value.photo);
    setPhotoSource({ photo: value.photo, url });
    return () => URL.revokeObjectURL(url);
  }, [value.photo]);

  const graphic = useRasterData(graphicSource, 1200, "graphic");
  const photo = useRasterData(value.mode === "photo" && photoSource.photo === value.photo ? photoSource.url : "", 1600, "product photo");
  const svg = useMemo(() => {
    if (value.mode === "photo" && !photo.data) return "";
    return makeProductMockupSvg({ ...value, graphic: graphic.data, photo: photo.data });
  }, [value, graphic.data, photo.data]);
  useEffect(() => {
    if (!svg) { setPreviewUrl(""); return; }
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [svg]);

  function update(patch) { onChange((current) => ({ ...current, ...patch })); }
  function selectProduct(event) {
    const preset = productMockups.find((item) => item.id === event.target.value);
    if (preset) update({ product: preset.id, x: preset.x, y: preset.y, size: preset.size });
  }
  function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 10_000_000) {
        setFileError("Choose a PNG, JPEG or WebP product photo under 10 MB.");
      } else {
        setFileError("");
        update({ photo: file });
      }
    }
    event.target.value = "";
  }

  const preset = productMockups.find((item) => item.id === value.product);
  const canCreate = Boolean(svg && graphic.data && (value.mode !== "photo" || photo.data) && !fileError && !busy);
  return <div className="settings product-workflow">
    <h3>Product mockups</h3>
    <p>Place a creative on a product. Isolate an imported image first to try removing its background.</p>
    <div className="product-controls">
      <div><label htmlFor="mockup-product">Product</label><select id="mockup-product" value={value.product} disabled={busy} onChange={selectProduct}>{productMockups.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
      <div><label htmlFor="mockup-graphic">Graphic</label><select id="mockup-graphic" value={value.graphicIndex} disabled={busy} onChange={(event) => update({ graphicIndex: event.target.value, graphicVersion: "original" })}><option value="">Choose an image</option>{outputs.map((item, index) => item.type === "image" ? <option value={String(index)} key={item.url}>{item.name}</option> : null)}</select></div>
      {selected && <div><label htmlFor="mockup-version">Graphic version</label><select id="mockup-version" value={value.graphicVersion} disabled={busy} onChange={(event) => update({ graphicVersion: event.target.value })}><option value="original">Original image</option>{selected.vectorUrl && <option value="isolated">Isolated graphic</option>}</select></div>}
      <div><label htmlFor="mockup-style">Product appearance</label><select id="mockup-style" value={value.mode} disabled={busy} onChange={(event) => { setFileError(""); update({ mode: event.target.value }); }}><option value="illustrated">Illustrated template</option><option value="photo">My product photo</option></select></div>
      {value.mode === "illustrated" ? <div><label htmlFor="mockup-color">Product color</label><div className="color-input"><input id="mockup-color" type="color" value={value.color} disabled={busy} onChange={(event) => update({ color: event.target.value })}/><span>{value.color.toUpperCase()}</span></div></div> : <div><label htmlFor="mockup-photo">Product photo</label><input id="mockup-photo" type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={uploadPhoto}/><p className="field-hint">{value.photo ? value.photo.name || "Saved product photo" : "PNG, JPEG or WebP under 10 MB."}</p></div>}
      {[["x", "Horizontal position", 0, 100], ["y", "Vertical position", 0, 100], ["size", "Graphic size", 8, 70]].map(([key, label, min, max]) => <div key={key}><label htmlFor={`mockup-${key}`}>{label} <span>{value[key]}%</span></label><input id={`mockup-${key}`} type="range" min={min} max={max} value={value[key]} disabled={busy} onChange={(event) => update({ [key]: Number(event.target.value) })}/></div>)}
    </div>
    {(fileError || graphic.error || photo.error) && <div role="alert" className="error">{fileError || graphic.error || photo.error}</div>}
    <div className="product-mockup-preview">{previewUrl ? <img src={previewUrl} alt={`${preset.label} mockup preview`}/> : <span>{value.mode === "photo" && !value.photo ? "Choose a product photo to preview." : "Preparing preview…"}</span>}</div>
    {graphicSource && !graphic.data && !graphic.error && <p className="field-hint">Preparing graphic…</p>}
    <button type="button" className="file-button local-action" disabled={!canCreate} onClick={() => onCreate(svg, preset)}>Save mockup to Review</button>
    <p className="field-hint">Illustrations are flat concepts. Photo graphics are simple overlays without perspective, fabric texture or automatic background removal. Mockup SVGs embed the graphic and photo as raster images.</p>
  </div>;
}
