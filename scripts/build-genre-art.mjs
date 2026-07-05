import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import { getIconData, iconToSVG } from "@iconify/utils";

const require = createRequire(import.meta.url);
const phIcons = require("@iconify-json/ph/icons.json");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "genres", "v2");
const contactSheetPath = path.join(repoRoot, "genres", "v2-contact-sheet.jpg");

const items = [
  {
    slug: "anime",
    title: "Anime",
    kind: "FILM",
    icon: "shooting-star-bold",
    colors: ["#111A33", "#37D6FF", "#FF5CA8"],
  },
  {
    slug: "action",
    title: "Action",
    kind: "FILM",
    icon: "sword-bold",
    colors: ["#1E2437", "#D93636", "#FFB84D"],
  },
  {
    slug: "thriller",
    title: "Thriller",
    kind: "FILM",
    icon: "crosshair-bold",
    colors: ["#171C24", "#4267D9", "#C6F1FF"],
  },
  {
    slug: "scifi",
    title: "Sci-fi",
    kind: "FILM",
    icon: "planet-bold",
    colors: ["#101A33", "#2A8FDB", "#71F6D5"],
  },
  {
    slug: "horror",
    title: "Skräck",
    kind: "FILM",
    icon: "ghost-bold",
    colors: ["#17121C", "#8F253B", "#EDE0CC"],
  },
  {
    slug: "comedy",
    title: "Komedi",
    kind: "FILM",
    icon: "mask-happy-bold",
    colors: ["#1B2720", "#F0A22E", "#7FE36D"],
  },
  {
    slug: "drama",
    title: "Drama",
    kind: "FILM",
    icon: "mask-sad-bold",
    colors: ["#222033", "#9867D9", "#F0C8A8"],
  },
  {
    slug: "documentary",
    title: "Dokumentärer",
    kind: "FILM",
    icon: "camera-bold",
    colors: ["#152523", "#2CA58D", "#D9F6E8"],
  },
  {
    slug: "animation-family",
    title: "Animation & familj",
    kind: "FILM",
    icon: "palette-bold",
    colors: ["#1B2342", "#E85DA2", "#FFE066"],
  },
  {
    slug: "fantasy",
    title: "Fantasy",
    kind: "FILM",
    icon: "castle-turret-bold",
    colors: ["#1A1B30", "#6E5AE6", "#D8C7FF"],
  },
  {
    slug: "crime",
    title: "Krim",
    kind: "FILM",
    icon: "fingerprint-bold",
    colors: ["#171B1F", "#4A6378", "#F7D08A"],
  },
  {
    slug: "series-anime",
    title: "Anime",
    kind: "SERIE",
    icon: "star-four-bold",
    colors: ["#12172E", "#7C5CFF", "#72F2C8"],
  },
  {
    slug: "series-crime",
    title: "Krim",
    kind: "SERIE",
    icon: "detective-bold",
    colors: ["#141B22", "#386C72", "#E9C46A"],
  },
  {
    slug: "series-drama",
    title: "Drama",
    kind: "SERIE",
    icon: "mask-sad-bold",
    colors: ["#231C2D", "#B05E7C", "#FFD6BA"],
  },
  {
    slug: "series-comedy",
    title: "Komedi",
    kind: "SERIE",
    icon: "mask-happy-bold",
    colors: ["#172A25", "#36B37E", "#FFE56B"],
  },
  {
    slug: "series-scifi-fantasy",
    title: "Sci-fi & fantasy",
    kind: "SERIE",
    icon: "rocket-launch-bold",
    colors: ["#10172E", "#4257F5", "#8EF9F3"],
  },
  {
    slug: "series-documentary",
    title: "Dokumentärer",
    kind: "SERIE",
    icon: "film-slate-bold",
    colors: ["#132425", "#188F8F", "#B8F2E6"],
  },
  {
    slug: "reality",
    title: "Reality",
    kind: "SERIE",
    icon: "microphone-stage-bold",
    colors: ["#202331", "#E85D75", "#FFD166"],
  },
  {
    slug: "animation",
    title: "Animation",
    kind: "SERIE",
    icon: "sparkle-bold",
    colors: ["#18233B", "#FF7A59", "#94F2C3"],
  },
  {
    slug: "kids-family",
    title: "Barn & familj",
    kind: "SERIE",
    icon: "baby-bold",
    colors: ["#17304A", "#4ECDC4", "#FFE66D"],
  },
  {
    slug: "mystery",
    title: "Mysterier",
    kind: "SERIE",
    icon: "question-bold",
    colors: ["#151726", "#5F4BB6", "#D8F3DC"],
  },
  {
    slug: "action-adventure",
    title: "Action & äventyr",
    kind: "SERIE",
    icon: "compass-rose-bold",
    colors: ["#16251F", "#D1603D", "#F4D35E"],
  },
  {
    slug: "docu-curated-best",
    title: "Kurerat bäst",
    kind: "DOCU",
    icon: "seal-check-bold",
    colors: ["#102326", "#2A9D8F", "#F4E7B8"],
  },
  {
    slug: "docu-new-buzz",
    title: "Nytt & omtalat",
    kind: "DOCU",
    icon: "trend-up-bold",
    colors: ["#1A2030", "#F45B69", "#F7F5A7"],
  },
  {
    slug: "docu-true-crime",
    title: "True crime",
    kind: "DOCU",
    icon: "fingerprint-bold",
    colors: ["#14191F", "#A13D63", "#F7D08A"],
  },
  {
    slug: "docu-nature",
    title: "Natur",
    kind: "DOCU",
    icon: "leaf-bold",
    colors: ["#10251E", "#2FB344", "#D8F3DC"],
  },
  {
    slug: "docu-history-science",
    title: "Historia & vetenskap",
    kind: "DOCU",
    icon: "atom-bold",
    colors: ["#172033", "#3D8BFF", "#FFD166"],
  },
  {
    slug: "docu-music",
    title: "Musik & scen",
    kind: "DOCU",
    icon: "music-notes-bold",
    colors: ["#21182A", "#C65BCF", "#F6D365"],
  },
  {
    slug: "docu-sports",
    title: "Sport",
    kind: "DOCU",
    icon: "trophy-bold",
    colors: ["#192A23", "#43AA8B", "#F9C74F"],
  },
  {
    slug: "docu-series",
    title: "Docuserier",
    kind: "DOCU",
    icon: "film-reel-bold",
    colors: ["#182330", "#577590", "#F3C969"],
  },
  {
    slug: "docu-streaming-se",
    title: "Streamas i Sverige",
    kind: "DOCU",
    icon: "television-bold",
    colors: ["#10213D", "#2E86DE", "#F6E05E"],
  },
  {
    slug: "docu-nordic",
    title: "Svenskt & nordiskt",
    kind: "DOCU",
    icon: "snowflake-bold",
    colors: ["#102B3C", "#37A2C7", "#F4FAFF"],
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function iconSvg(name, x, y, size, color, opacity = 1, rotate = 0) {
  const data = getIconData(phIcons, name);
  if (!data) {
    throw new Error(`Missing Phosphor icon: ${name}`);
  }

  const rendered = iconToSVG(data, { width: size, height: size });
  const viewBox = rendered.attributes.viewBox ?? `0 0 ${data.width ?? 256} ${data.height ?? 256}`;
  const cx = x + size / 2;
  const cy = y + size / 2;
  const transform = rotate ? ` transform="rotate(${rotate} ${cx} ${cy})"` : "";

  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" color="${color}" opacity="${opacity}"${transform}>${rendered.body}</svg>`;
}

function wrapTitle(title, maxChars) {
  const words = title.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

function posterTitle(title) {
  const uppercase = title.toLocaleUpperCase("sv-SE");
  const lines = wrapTitle(uppercase, 16);
  const lineHeight = lines.length === 3 ? 64 : 78;
  const size = lines.some((line) => line.length > 14) ? 60 : 70;
  const startY = 1085 - (lines.length - 1) * (lineHeight / 2);

  return lines
    .map((line, index) => {
      const y = startY + index * lineHeight;
      return `<text x="96" y="${y}" fill="#F8FAF5" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="800" letter-spacing="0">${escapeXml(line)}</text>`;
    })
    .join("");
}

function posterSvg(item) {
  const [dark, mid, light] = item.colors;
  const icon = iconSvg(item.icon, 220, 345, 460, "#FFF7E8", 0.96);
  const iconGlow = iconSvg(item.icon, 198, 323, 504, light, 0.18);
  const bgIcon = iconSvg(item.icon, 325, 55, 680, "#FFFFFF", 0.06, -10);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${dark}"/>
      <stop offset="0.56" stop-color="${mid}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000000" stop-opacity="0.05"/>
      <stop offset="0.72" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.52"/>
    </linearGradient>
    <pattern id="lines" width="54" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <path d="M 0 54 L 54 0" stroke="#FFFFFF" stroke-width="2" opacity="0.13"/>
    </pattern>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="18" flood-color="#000000" flood-opacity="0.38"/>
    </filter>
  </defs>
  <rect width="900" height="1350" fill="url(#bg)"/>
  <path d="M-80 955 C150 820 290 885 490 760 C650 660 780 600 980 655 L980 1350 L-80 1350 Z" fill="#000000" opacity="0.18"/>
  <path d="M-120 245 C120 105 270 188 456 114 C625 46 765 18 980 96 L980 0 L-120 0 Z" fill="#FFFFFF" opacity="0.09"/>
  <rect width="900" height="1350" fill="url(#lines)" opacity="0.2"/>
  ${bgIcon}
  <g filter="url(#softShadow)">
    ${iconGlow}
    ${icon}
  </g>
  <text x="96" y="980" fill="#FFFFFF" opacity="0.7" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="0">${escapeXml(item.kind)}</text>
  ${posterTitle(item.title)}
  <rect width="900" height="1350" fill="url(#veil)"/>
</svg>`;
}

function backdropSvg(item) {
  const [dark, mid, light] = item.colors;
  const bigIcon = iconSvg(item.icon, 905, 100, 640, "#FFFFFF", 0.1, -8);
  const mainIcon = iconSvg(item.icon, 165, 255, 300, "#FFF7E8", 0.9);
  const glowIcon = iconSvg(item.icon, 132, 222, 366, light, 0.16);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${dark}"/>
      <stop offset="0.62" stop-color="${mid}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000000" stop-opacity="0.32"/>
      <stop offset="0.45" stop-color="#000000" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.42"/>
    </linearGradient>
    <pattern id="lines" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <path d="M 0 72 L 72 0" stroke="#FFFFFF" stroke-width="2" opacity="0.11"/>
    </pattern>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="30" stdDeviation="22" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <path d="M-80 720 C245 545 495 635 760 455 C1020 280 1265 260 1680 365 L1680 900 L-80 900 Z" fill="#000000" opacity="0.18"/>
  <path d="M-130 138 C240 -62 470 92 760 6 C1010 -70 1250 -48 1690 70 L1690 0 L-130 0 Z" fill="#FFFFFF" opacity="0.08"/>
  <rect width="1600" height="900" fill="url(#lines)" opacity="0.16"/>
  ${bigIcon}
  <g filter="url(#softShadow)">
    ${glowIcon}
    ${mainIcon}
  </g>
  <rect width="1600" height="900" fill="url(#shade)"/>
</svg>`;
}

async function writeJpeg(file, svg, width) {
  await sharp(Buffer.from(svg))
    .resize({ width })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(file);
}

async function buildContactSheet() {
  const thumbWidth = 180;
  const thumbHeight = 270;
  const gap = 18;
  const columns = 5;
  const rows = Math.ceil(items.length / columns);
  const width = columns * thumbWidth + (columns + 1) * gap;
  const height = rows * thumbHeight + (rows + 1) * gap;
  const background = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#12151D",
    },
  })
    .jpeg()
    .toBuffer();

  const composites = [];
  for (const [index, item] of items.entries()) {
    const poster = await sharp(path.join(outDir, `${item.slug}-poster.jpg`))
      .resize(thumbWidth, thumbHeight, { fit: "cover" })
      .toBuffer();
    composites.push({
      input: poster,
      left: gap + (index % columns) * (thumbWidth + gap),
      top: gap + Math.floor(index / columns) * (thumbHeight + gap),
    });
  }

  await sharp(background).composite(composites).jpeg({ quality: 92, mozjpeg: true }).toFile(contactSheetPath);
}

await fs.mkdir(outDir, { recursive: true });

for (const item of items) {
  await writeJpeg(path.join(outDir, `${item.slug}-poster.jpg`), posterSvg(item), 900);
  await writeJpeg(path.join(outDir, `${item.slug}-backdrop.jpg`), backdropSvg(item), 1600);
}

await buildContactSheet();

console.log(`Generated ${items.length * 2} images in ${path.relative(repoRoot, outDir)}`);
console.log(`Contact sheet: ${path.relative(repoRoot, contactSheetPath)}`);
