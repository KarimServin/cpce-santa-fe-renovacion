import sharp from 'sharp';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790685634419.jpg';
const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

let minX = info.width, maxX = 0, minY = info.height, maxY = 0;

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const idx = (y * info.width + x) * 3;
    const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
    if (lum < 200) { // non-background pixel
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Bounding box of logo:');
console.log(`minX: ${minX}, maxX: ${maxX}, width: ${maxX - minX + 1}`);
console.log(`minY: ${minY}, maxY: ${maxY}, height: ${maxY - minY + 1}`);
