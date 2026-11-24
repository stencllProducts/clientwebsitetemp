function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]);
}

function color(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
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
