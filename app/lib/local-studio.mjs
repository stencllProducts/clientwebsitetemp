function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]);
}

function color(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

function logoOrName(brand, x, y, width, height, ink) {
  if (/^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(brand.logo || "")) {
    return `<image href="${brand.logo}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMinYMid meet"/>`;
  }
  const name = brand.name || "YOUR BRAND";
  return `<text x="${x}" y="${y + height * 0.7}" fill="${ink}" font-family="Arial,sans-serif" font-weight="bold" font-size="${Math.min(height * 0.65, width / Math.max(name.length * 0.65, 1))}">${escapeXml(name)}</text>`;
}

export const brandAssetPresets = [
  { id: "social-square", label: "Social square", width: 1080, height: 1080 },
  { id: "social-portrait", label: "Social portrait", width: 1080, height: 1350 },
  { id: "social-wide", label: "Social landscape", width: 1920, height: 1080 },
  { id: "business-card", label: "Business card mockup", width: 1200, height: 800 },
  { id: "tote", label: "Tote bag mockup", width: 1000, height: 1200 },
];

export function makeBrandBoardSvg(brand) {
  const background = color(brand.color, "#f2f2ed");
  const ink = color(brand.ink, "#263c2d");
  const palette = (brand.palette || []).slice(0, 8).map((value) => color(value, "#f2f2ed"));
  const tagline = brand.tagline || "Your tagline";
  const swatches = palette.map((value, index) => {
    const x = 70 + (index % 4) * 265, y = 600 + Math.floor(index / 4) * 120;
    return `<rect x="${x}" y="${y}" width="235" height="65" rx="4" fill="${value}"/><text x="${x}" y="${y + 90}" font-family="monospace" font-size="17" fill="#222222">${value.toUpperCase()}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#ffffff"/><text x="70" y="65" font-family="Arial,sans-serif" font-size="18" fill="#444444">BRAND IDENTITY / FORM STUDIO</text><rect x="70" y="100" width="1060" height="320" rx="8" fill="${background}"/>${logoOrName(brand, 110, 150, 750, 110, ink)}<text x="110" y="355" font-family="Arial,sans-serif" font-size="${Math.min(26, 900 / Math.max(tagline.length * 0.65, 1))}" fill="${ink}">${escapeXml(tagline)}</text><text x="70" y="485" font-family="Arial,sans-serif" font-size="19" font-weight="bold" fill="#222222">TYPOGRAPHY REFERENCE</text><text x="70" y="530" font-family="Arial,sans-serif" font-size="28" fill="#222222">${escapeXml((brand.typography || "Not specified").slice(0, 50))}</text><text x="70" y="575" font-family="Arial,sans-serif" font-size="19" font-weight="bold" fill="#222222">COLOR PALETTE</text>${swatches}</svg>`;
}

export function makeBrandAssetSvg(brand, product, presetId) {
  const preset = brandAssetPresets.find((item) => item.id === presetId);
  if (!preset) throw new Error("Choose a supported asset format.");
  const { width, height } = preset;
  const bg = color(brand.color, "#f2f2ed"), ink = color(brand.ink, "#263c2d");
  const title = product || "YOUR PRODUCT";
  const titleSize = Math.min(width * 0.1, height * 0.13, width * 0.75 / Math.max(title.length * 0.65, 1));
  const tagline = brand.tagline || "";
  let content;
  if (presetId.startsWith("social-")) {
    content = `<rect width="${width}" height="${height}" fill="${bg}"/><rect x="${width * 0.07}" y="${height * 0.08}" width="${width * 0.86}" height="${height * 0.84}" fill="none" stroke="${ink}" stroke-opacity=".35" stroke-width="2"/>${logoOrName(brand, width * 0.12, height * 0.13, width * 0.55, height * 0.1, ink)}<text x="${width * 0.12}" y="${height * 0.52}" fill="${ink}" font-family="Arial,sans-serif" font-weight="bold" font-size="${titleSize}">${escapeXml(title)}</text><text x="${width * 0.12}" y="${height * 0.63}" fill="${ink}" font-family="Arial,sans-serif" font-size="${Math.min(width * 0.027, height * 0.035, width * 0.75 / Math.max(tagline.length * 0.65, 1))}">${escapeXml(tagline)}</text><text x="${width * 0.12}" y="${height * 0.84}" fill="${ink}" font-family="monospace" font-size="${Math.min(width * 0.02, height * 0.025)}">${escapeXml((brand.category || "BRAND STUDIO").slice(0, 70))}</text>`;
  } else if (presetId === "business-card") {
    content = `<rect width="${width}" height="${height}" fill="#e9e9e9"/><rect x="175" y="180" width="850" height="470" rx="12" fill="#000000" opacity=".12"/><rect x="160" y="160" width="850" height="470" rx="12" fill="${bg}"/>${logoOrName(brand, 220, 220, 580, 110, ink)}<path d="M220 400H950" stroke="${ink}" stroke-opacity=".35"/><text x="220" y="470" fill="${ink}" font-family="Arial,sans-serif" font-size="28">${escapeXml((brand.tagline || "").slice(0, 55))}</text><text x="220" y="555" fill="${ink}" font-family="monospace" font-size="20">${escapeXml((brand.category || "").slice(0, 55))}</text>`;
  } else {
    content = `<rect width="${width}" height="${height}" fill="#eeeeee"/><path d="M340 400V290C340 80 660 80 660 290V400" fill="none" stroke="${ink}" stroke-width="28" opacity=".8"/><path d="M220 350H780L830 1050H170Z" fill="${bg}" stroke="${ink}" stroke-opacity=".25" stroke-width="4"/>${logoOrName(brand, 280, 565, 440, 120, ink)}<text x="280" y="755" fill="${ink}" font-family="Arial,sans-serif" font-size="24">${escapeXml((brand.tagline || "").slice(0, 35))}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
}

export function makePackagingSvg(brand, product) {
  const background = color(brand.color, "#f2f2ed");
  const ink = color(brand.ink, "#263c2d");
  const name = escapeXml(brand.name || "YOUR BRAND");
  const category = escapeXml(brand.category || "PACKAGING STUDIO");
  const title = escapeXml((product || "YOUR PRODUCT").toUpperCase());
  const tagline = escapeXml(brand.tagline || "");
  const accent = color(brand.palette?.[brand.palette.length - 1], ink);
  const logo = /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(brand.logo || "")
    ? `<image href="${brand.logo}" x="80" y="70" width="520" height="150" preserveAspectRatio="xMinYMid meet"/>`
    : `<text x="80" y="160" fill="${ink}" font-family="Arial,sans-serif" font-weight="bold" font-size="56">${name}</text>`;
  const titleSize = Math.min(140, Math.max(32, Math.floor(1050 / (product || "YOUR PRODUCT").length)));
  const taglineSize = Math.min(28, Math.max(13, Math.floor(1050 / (brand.tagline || " ").length)));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1200" viewBox="0 0 1000 1200"><rect width="1000" height="1200" fill="${background}"/><g fill="none" stroke="${ink}" stroke-width="2" opacity=".3"><path d="M80 270h840M80 910h840M80 270v640M920 270v230M920 690v220"/><path d="M80 340h840M80 840h840" stroke-dasharray="5 8"/></g>${logo}<rect x="850" y="90" width="60" height="60" fill="${accent}"/><text x="80" y="320" fill="${ink}" font-family="monospace" font-size="22" letter-spacing="3">${category}</text><text x="80" y="570" fill="${ink}" font-family="Arial,sans-serif" font-weight="900" font-size="${titleSize}">${title}</text><text x="80" y="665" fill="${ink}" font-family="Arial,sans-serif" font-weight="bold" font-size="38">${name}</text><text x="80" y="975" fill="${ink}" font-family="Arial,sans-serif" font-weight="bold" font-size="${taglineSize}">${tagline}</text><text x="80" y="1115" fill="${ink}" font-family="monospace" font-size="20" letter-spacing="2">FORM / PACKAGING STUDY</text><path d="M820 1100h90M865 1055v90" stroke="${ink}" stroke-width="3"/></svg>`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load artwork for the preview."));
    image.src = src;
  });
}

export async function renderSvgPng(svg) {
  const image = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser cannot render this artwork.");
  context.drawImage(image, 0, 0);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not export this artwork.")), "image/png"));
}

function drawScene(ctx, artwork, photo, brand, direction, time) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const dark = direction === "After hours";
  ctx.fillStyle = dark ? "#343a36" : direction === "Soft shadows" ? "#d9cdbd" : "#e8e9df";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = dark ? "#46504a" : "#d3d8ca";
  ctx.fillRect(0, height * 0.79, width, height * 0.21);
  ctx.save();
  ctx.translate(width * 0.51, height * 0.5 + Math.sin(time * Math.PI * 2) * 7);
  ctx.rotate(Math.sin(time * Math.PI * 2) * 0.018);
  const boxWidth = 350;
  const boxHeight = 420;
  ctx.shadowColor = "#1b281d55";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = "#697c68";
  ctx.beginPath();
  ctx.moveTo(-boxWidth / 2 - 44, -boxHeight / 2 + 23);
  ctx.lineTo(-boxWidth / 2, -boxHeight / 2);
  ctx.lineTo(-boxWidth / 2, boxHeight / 2);
  ctx.lineTo(-boxWidth / 2 - 44, boxHeight / 2 - 20);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.drawImage(artwork, -boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
  ctx.restore();
  ctx.fillStyle = dark ? "#edf2e8" : "#465b49";
  ctx.font = "600 19px Arial, sans-serif";
  ctx.fillText((brand.name || "YOUR BRAND").slice(0, 42).toUpperCase(), 60, 75, 320);
  ctx.font = "13px Arial, sans-serif";
  ctx.fillText("PACKAGING PREVIEW", 60, 102);
  if (photo) {
    const ratio = Math.min(190 / photo.width, 190 / photo.height);
    const w = photo.width * ratio;
    const h = photo.height * ratio;
    ctx.drawImage(photo, 90 + (190 - w) / 2, 390 + (190 - h) / 2, w, h);
    ctx.fillText("PRODUCT REFERENCE", 90, 605);
  }
}

async function prepareScene(svg, photoUrl) {
  const artwork = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  const photo = photoUrl ? await loadImage(photoUrl) : null;
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser cannot render the local preview.");
  return { canvas, context, artwork, photo };
}

export async function makePreviewImage(svg, photoUrl, brand, direction) {
  const { canvas, context, artwork, photo } = await prepareScene(svg, photoUrl);
  drawScene(context, artwork, photo, brand, direction, 0);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not export the preview image.")), "image/png"));
}

export async function makePreviewVideo(svg, photoUrl, brand, direction) {
  if (typeof MediaRecorder === "undefined") throw new Error("This browser cannot record video. Try a current Chromium browser.");
  const player = document.createElement("video");
  const mimeType = ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/webm"].find((type) => MediaRecorder.isTypeSupported(type) && player.canPlayType(type));
  if (!mimeType) throw new Error("This browser cannot record WebM video. Try a current Chromium browser.");
  const { canvas, context, artwork, photo } = await prepareScene(svg, photoUrl);
  if (typeof canvas.captureStream !== "function") throw new Error("This browser cannot capture the preview as video.");
  drawScene(context, artwork, photo, brand, direction, 0);
  const stream = canvas.captureStream(24);
  const chunks = [];
  return new Promise((resolve, reject) => {
    let recorder;
    let timer;
    let finish;
    function cleanup() {
      clearInterval(timer);
      clearTimeout(finish);
      stream.getTracks().forEach((track) => track.stop());
    }
    try {
      recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onerror = () => { cleanup(); reject(new Error("Video recording failed.")); };
      recorder.onstop = () => {
        cleanup();
        const blob = new Blob(chunks, { type: "video/webm" });
        if (!blob.size) reject(new Error("Video recording produced an empty file."));
        else resolve(blob);
      };
      recorder.start();
      const start = performance.now();
      timer = setInterval(() => drawScene(context, artwork, photo, brand, direction, Math.min((performance.now() - start) / 4000, 1)), 1000 / 24);
      finish = setTimeout(() => { if (recorder.state === "recording") recorder.stop(); }, 4000);
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}
