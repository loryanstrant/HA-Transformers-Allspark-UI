import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const brandDir = path.resolve('custom_components/transformers_allspark_ui/brand');
fs.mkdirSync(brandDir, { recursive: true });

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  return c >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(filePath, width, height, pixels) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }

  const signature = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = zlib.deflateSync(raw, { level: 9 });
  const png = Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  fs.writeFileSync(filePath, png);
}

function createSurface(width, height) {
  return Buffer.alloc(width * height * 4);
}

function setPixel(pixels, width, x, y, rgba) {
  if (x < 0 || y < 0) return;
  if (x >= width) return;
  const idx = (y * width + x) * 4;
  const alpha = rgba[3] / 255;
  const inv = 1 - alpha;
  pixels[idx] = Math.round(rgba[0] * alpha + pixels[idx] * inv);
  pixels[idx + 1] = Math.round(rgba[1] * alpha + pixels[idx + 1] * inv);
  pixels[idx + 2] = Math.round(rgba[2] * alpha + pixels[idx + 2] * inv);
  pixels[idx + 3] = Math.round((alpha + (pixels[idx + 3] / 255) * inv) * 255);
}

function hex(color, alpha = 255) {
  const value = color.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
    alpha,
  ];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function gradientStops(stops, t) {
  if (t <= stops[0][0]) return stops[0][1];
  if (t >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 1; i < stops.length; i += 1) {
    if (t <= stops[i][0]) {
      const [p0, c0] = stops[i - 1];
      const [p1, c1] = stops[i];
      const local = (t - p0) / (p1 - p0);
      return [
        Math.round(lerp(c0[0], c1[0], local)),
        Math.round(lerp(c0[1], c1[1], local)),
        Math.round(lerp(c0[2], c1[2], local)),
        Math.round(lerp(c0[3], c1[3], local)),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

function pointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > y) !== (yj > y))
      && (x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function drawPolygon(pixels, width, height, points, shadeFn) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.max(0, Math.floor(Math.min(...xs)));
  const maxX = Math.min(width - 1, Math.ceil(Math.max(...xs)));
  const minY = Math.max(0, Math.floor(Math.min(...ys)));
  const maxY = Math.min(height - 1, Math.ceil(Math.max(...ys)));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (pointInPolygon(x + 0.5, y + 0.5, points)) {
        setPixel(pixels, width, x, y, shadeFn(x, y));
      }
    }
  }
}

function drawRect(pixels, width, x0, y0, x1, y1, color) {
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      setPixel(pixels, width, x, y, color);
    }
  }
}

function drawSoftShadow(pixels, width, height, points, radius, color) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.max(0, Math.floor(Math.min(...xs) - radius));
  const maxX = Math.min(width - 1, Math.ceil(Math.max(...xs) + radius));
  const minY = Math.max(0, Math.floor(Math.min(...ys) - radius));
  const maxY = Math.min(height - 1, Math.ceil(Math.max(...ys) + radius));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      let minDist = Infinity;
      for (let i = 0; i < points.length; i += 1) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lenSq = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lenSq));
        const px = x1 + t * dx;
        const py = y1 + t * dy;
        const dist = Math.hypot(x - px, y - py);
        if (dist < minDist) minDist = dist;
      }
      if (pointInPolygon(x + 0.5, y + 0.5, points)) minDist = 0;
      if (minDist <= radius) {
        const alpha = Math.round((1 - minDist / radius) * color[3]);
        setPixel(pixels, width, x, y, [color[0], color[1], color[2], alpha]);
      }
    }
  }
}

function scaled(points, sx, sy) {
  return points.map(([x, y]) => [Math.round(x * sx), Math.round(y * sy)]);
}

const g1Stops = [
  [0.0, hex('#f5fbff')],
  [0.18, hex('#d6e7f5')],
  [0.40, hex('#94b0c2')],
  [0.56, hex('#eef7ff')],
  [0.78, hex('#607482')],
  [1.0, hex('#dce8f2')],
];
const movieStops = [
  [0.0, hex('#e4dccf')],
  [0.18, hex('#8e8478')],
  [0.38, hex('#4e4942')],
  [0.58, hex('#b19573')],
  [0.78, hex('#453a32')],
  [1.0, hex('#cab596')],
];

function metallicShade(stops, minX, maxX, minY, maxY) {
  const dx = maxX - minX || 1;
  const dy = maxY - minY || 1;
  return (x, y) => {
    const tx = (x - minX) / dx;
    const ty = (y - minY) / dy;
    const t = Math.max(0, Math.min(1, tx * 0.7 + ty * 0.3));
    return gradientStops(stops, t);
  };
}

function makeIcon(width, height) {
  const pixels = createSurface(width, height);
  const sx = width / 1024;
  const sy = height / 1024;

  const tMain = scaled([[96,120],[468,120],[540,192],[398,192],[398,872],[252,872],[252,192],[168,192]], sx, sy);
  const tHighlight = scaled([[118,132],[438,132],[404,166],[154,166]], sx, sy);
  const tRib = scaled([[252,192],[326,192],[326,872],[252,872]], sx, sy);
  const fMain = scaled([[574,126],[910,126],[846,190],[704,190],[704,442],[842,442],[782,504],[704,504],[704,872],[574,872]], sx, sy);
  const fHighlight = scaled([[594,138],[872,138],[836,172],[630,172]], sx, sy);
  const fCut = scaled([[728,214],[838,214],[804,246],[728,246]], sx, sy);

  drawSoftShadow(pixels, width, height, tMain, Math.max(12, Math.round(width * 0.03)), [0,0,0,86]);
  drawSoftShadow(pixels, width, height, fMain, Math.max(12, Math.round(width * 0.03)), [0,0,0,86]);

  drawPolygon(pixels, width, height, tMain, metallicShade(g1Stops, 96*sx, 540*sx, 120*sy, 872*sy));
  drawPolygon(pixels, width, height, tRib, () => [145, 169, 188, 70]);
  drawPolygon(pixels, width, height, tHighlight, () => [255, 255, 255, 44]);

  drawPolygon(pixels, width, height, fMain, metallicShade(movieStops, 574*sx, 910*sx, 126*sy, 872*sy));
  drawPolygon(pixels, width, height, fHighlight, () => [255, 255, 255, 30]);
  drawPolygon(pixels, width, height, fCut, () => [126, 88, 64, 72]);
  drawRect(pixels, width, Math.round(704*sx), Math.round(190*sy), Math.round(744*sx), Math.round(872*sy), [42, 38, 34, 88]);

  return pixels;
}

function makeLogo(width, height) {
  const pixels = makeIcon(width, height);
  return pixels;
}

writePng(path.join(brandDir, 'icon.png'), 512, 512, makeIcon(512, 512));
writePng(path.join(brandDir, 'logo.png'), 1024, 1024, makeLogo(1024, 1024));
console.log('Generated brand/icon.png and brand/logo.png');
