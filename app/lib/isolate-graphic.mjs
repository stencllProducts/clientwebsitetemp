import ImageTracer from "imagetracerjs";

const traceOptions = {
  numberofcolors: 16, colorsampling: 2, colorquantcycles: 3,
  mincolorratio: 0, pathomit: 2, strokewidth: 0, roundcoords: 1,
};

function svgContents(svg) {
  return svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
}

export function isolateGraphic(image) {
  const { width, height } = image;
  const pixels = new Uint8ClampedArray(image.data);
  if (!width || !height || pixels.length !== width * height * 4) {
    throw new Error("Could not read the image pixels.");
  }
  const count = width * height;
  const removed = new Uint8Array(count);
  let transparent = 0;
  for (let i = 0; i < count; i++) {
    if (pixels[i * 4 + 3] < 128) transparent++;
  }

  if (transparent) {
    for (let i = 0; i < count; i++) removed[i] = pixels[i * 4 + 3] < 128 ? 1 : 0;
  } else {
    const corners = [0, width - 1, (height - 1) * width, count - 1];
    const distance = (a, b) => {
      const ai = a * 4, bi = b * 4;
      return Math.hypot(pixels[ai] - pixels[bi], pixels[ai + 1] - pixels[bi + 1], pixels[ai + 2] - pixels[bi + 2]);
    };
    const background = corners.reduce((best, corner) =>
      corners.filter((other) => distance(corner, other) < 45).length >
      corners.filter((other) => distance(best, other) < 45).length ? corner : best, corners[0]);
    if (corners.filter((corner) => distance(background, corner) < 45).length < 2) {
      throw new Error("Could not identify a consistent background. Try an image with a plain background or transparency.");
    }
    const queue = new Uint32Array(count);
    let head = 0, tail = 0;
    function enqueue(index) {
      if (!removed[index] && distance(index, background) < 45) {
        removed[index] = 1;
        queue[tail++] = index;
      }
    }
    for (let x = 0; x < width; x++) { enqueue(x); enqueue((height - 1) * width + x); }
    for (let y = 0; y < height; y++) { enqueue(y * width); enqueue(y * width + width - 1); }
    while (head < tail) {
      const index = queue[head++], x = index % width, y = Math.floor(index / width);
      if (x > 0) enqueue(index - 1);
      if (x + 1 < width) enqueue(index + 1);
      if (y > 0) enqueue(index - width);
      if (y + 1 < height) enqueue(index + width);
    }
    if (tail < count * 0.02) {
      throw new Error("Could not isolate the background. Try an image with a plain background or transparency.");
    }
  }

  let minX = width, minY = height, maxX = -1, maxY = -1;
  const mask = new Uint8ClampedArray(count * 4);
  for (let i = 0; i < count; i++) {
    const offset = i * 4, value = removed[i] ? 0 : 255;
    mask[offset] = mask[offset + 1] = mask[offset + 2] = value;
    mask[offset + 3] = 255;
    if (!removed[i]) {
      const x = i % width, y = Math.floor(i / width);
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    } else {
      pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = 255;
    }
    pixels[offset + 3] = 255;
  }
  if (maxX < minX || maxY < minY) {
    throw new Error("No foreground graphic was found. Try a different image.");
  }
  const maskSvg = ImageTracer.imagedataToSVG({ width, height, data: mask }, {
    ...traceOptions, pal: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }],
    colorquantcycles: 1, pathomit: 0,
  });
  const colorSvg = ImageTracer.imagedataToSVG({ width, height, data: pixels }, traceOptions);
  const resultWidth = maxX - minX + 1, resultHeight = maxY - minY + 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${resultWidth}" height="${resultHeight}" viewBox="${minX} ${minY} ${resultWidth} ${resultHeight}"><defs><mask id="foreground" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}" style="mask-type:luminance">${svgContents(maskSvg)}</mask></defs><g mask="url(#foreground)">${svgContents(colorSvg)}</g></svg>`;
}

export async function isolateImage(url) {
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error("Could not open the image for isolation."));
    image.src = url;
  });
  const scale = Math.min(1, 320 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Your browser cannot isolate this image.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return isolateGraphic(context.getImageData(0, 0, canvas.width, canvas.height));
}
