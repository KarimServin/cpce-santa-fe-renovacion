import sharp from 'sharp';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790685634419.jpg';
const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

// Histogram of luminance
const hist = new Array(26).fill(0);
for (let i = 0; i < data.length; i += 3) {
  const lum = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
  const bucket = Math.min(25, Math.floor(lum / 10));
  hist[bucket]++;
}
console.log('Luminance histogram (10-value buckets):');
hist.forEach((count, b) => {
  const pct = ((count / (info.width * info.height)) * 100).toFixed(1);
  console.log(`${(b * 10).toString().padStart(3)} - ${((b + 1) * 10 - 1).toString().padStart(3)}: ${count} (${pct}%)`);
});
