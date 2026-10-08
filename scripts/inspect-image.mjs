import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790685634419.jpg';

const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
console.log('Image dimensions:', info.width, 'x', info.height);

const corners = [
  0,
  (info.width - 1) * 3,
  ((info.height - 1) * info.width) * 3,
  ((info.height - 1) * info.width + info.width - 1) * 3
];
corners.forEach((idx, i) => {
  console.log('Corner ' + i + ':', data[idx], data[idx+1], data[idx+2]);
});

let darkest = { lum: 999, r: 0, g: 0, b: 0 };
let brightest = { lum: -1, r: 0, g: 0, b: 0 };

for (let i = 0; i < data.length; i += 3) {
  const r = data[i], g = data[i+1], b = data[i+2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < darkest.lum) darkest = { lum, r, g, b };
  if (lum > brightest.lum) brightest = { lum, r, g, b };
}

console.log('Darkest pixel:', darkest);
console.log('Brightest pixel:', brightest);
