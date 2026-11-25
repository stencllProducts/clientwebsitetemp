export const productMockups = [
  { id: "t-shirt", label: "T-shirt", x: 50, y: 50, size: 30 },
  { id: "hoodie", label: "Hoodie", x: 50, y: 56, size: 28 },
  { id: "tote-bag", label: "Tote bag", x: 50, y: 57, size: 30 },
  { id: "cap", label: "Cap", x: 50, y: 43, size: 22 },
  { id: "beanie", label: "Beanie", x: 50, y: 48, size: 22 },
  { id: "socks", label: "Socks", x: 35, y: 45, size: 13 },
  { id: "phone-case", label: "Phone case", x: 50, y: 52, size: 25 },
  { id: "watch-band", label: "Watch band", x: 50, y: 25, size: 12 },
  { id: "desk-mat", label: "Desk mat", x: 50, y: 50, size: 30 },
];

export function initialProductMockup() {
  const { id, x, y, size } = productMockups[0];
  return { product: id, mode: "illustrated", graphicIndex: "", graphicVersion: "original", x, y, size, color: "#e5e5e5", photo: null };
}

function rasterData(value) {
  return typeof value === "string" && /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value);
}

function illustration(product, fill) {
  const common = `fill="${fill}" stroke="#303030" stroke-width="8" stroke-linejoin="round"`;
  switch (product) {
    case "t-shirt":
      return `<path ${common} d="M340 200 L230 235 95 360 200 470 275 410 275 835 725 835 725 410 800 470 905 360 770 235 660 200 C625 290 375 290 340 200Z"/><path d="M390 205 C400 260 600 260 610 205" fill="none" stroke="#303030" stroke-width="7"/>`;
    case "hoodie":
      return `<path ${common} d="M380 235 C385 95 615 95 620 235 L735 255 890 610 790 670 730 540 730 850 270 850 270 540 210 670 110 610 265 255Z"/><path d="M380 235 C415 315 585 315 620 235 M420 750 Q500 720 580 750 M390 750 L410 675 H590 L610 750" fill="none" stroke="#303030" stroke-width="7"/><path d="M470 295v85 M530 295v85" stroke="#303030" stroke-width="5"/>`;
    case "tote-bag":
      return `<path d="M340 350 V255 C340 70 660 70 660 255 V350" fill="none" stroke="#303030" stroke-width="28"/><path ${common} d="M210 310 H790 L835 865 H165Z"/>`;
    case "cap":
      return `<path ${common} d="M190 570 C185 315 310 180 500 180 C690 180 815 315 810 570Z"/><path ${common} d="M185 570 Q500 515 815 570 Q920 595 940 650 Q650 690 370 665 Q245 655 185 620Z"/><path d="M500 185 Q430 340 440 550 M500 185 Q570 340 560 550" fill="none" stroke="#303030" stroke-width="4" opacity=".55"/>`;
    case "beanie":
      return `<path ${common} d="M230 625 V470 C230 245 335 155 500 155 C665 155 770 245 770 470 V625Z"/><rect ${common} x="215" y="595" width="570" height="135" rx="35"/><path d="M330 585 Q310 360 400 205 M670 585 Q690 360 600 205" fill="none" stroke="#303030" stroke-width="4" opacity=".4"/>`;
    case "socks":
      return `<path ${common} d="M200 135 H415 V590 Q415 660 470 710 L540 780 Q550 830 495 845 H195 Q130 840 130 775 Q130 710 190 645 L200 600Z"/><path ${common} d="M585 135 H800 V590 Q800 660 855 710 L925 780 Q935 830 880 845 H580 Q515 840 515 775 Q515 710 575 645 L585 600Z"/><path d="M200 225 H415 M585 225 H800" stroke="#303030" stroke-width="7" opacity=".55"/>`;
    case "phone-case":
      return `<rect ${common} x="275" y="90" width="450" height="820" rx="75"/><rect x="310" y="130" width="170" height="155" rx="35" fill="#222222"/><circle cx="360" cy="180" r="22" fill="#777777"/><circle cx="430" cy="180" r="22" fill="#777777"/><circle cx="360" cy="240" r="22" fill="#777777"/>`;
    case "watch-band":
      return `<path ${common} d="M405 45 H595 L620 365 H380Z M380 635 H620 L595 955 H405Z"/><rect x="305" y="340" width="390" height="320" rx="95" fill="#303030"/><rect x="325" y="360" width="350" height="280" rx="75" fill="#111111"/><path d="M460 825 H540 M460 865 H540" stroke="#303030" stroke-width="10" stroke-linecap="round"/>`;
    case "desk-mat":
      return `<rect ${common} x="90" y="250" width="820" height="500" rx="42"/><rect x="115" y="275" width="770" height="450" rx="28" fill="none" stroke="#303030" stroke-width="3" stroke-dasharray="7 9" opacity=".4"/>`;
    default:
      throw new Error("Choose a supported product.");
  }
}

export function makeProductMockupSvg({ product, mode, color, x, y, size, graphic, photo }) {
  if (!productMockups.some((item) => item.id === product)) throw new Error("Choose a supported product.");
  if (!["illustrated", "photo"].includes(mode)) throw new Error("Choose a supported mockup style.");
  if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error("Choose a valid product color.");
  if (![x, y, size].every(Number.isFinite) || x < 0 || x > 100 || y < 0 || y > 100 || size < 8 || size > 70) throw new Error("Invalid graphic placement.");
  if (graphic && !rasterData(graphic)) throw new Error("The selected graphic could not be rendered.");
  if (mode === "photo" && !rasterData(photo)) throw new Error("Choose a product photo first.");
  const background = mode === "photo"
    ? `<rect width="1000" height="1000" fill="#eeeeee"/><image href="${photo}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="xMidYMid meet"/>`
    : `<rect width="1000" height="1000" fill="#eeeeee"/>${illustration(product, color)}`;
  const boxSize = size * 10;
  const overlay = graphic ? `<image href="${graphic}" x="${x * 10 - boxSize / 2}" y="${y * 10 - boxSize / 2}" width="${boxSize}" height="${boxSize}" preserveAspectRatio="xMidYMid meet"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">${background}${overlay}</svg>`;
}
