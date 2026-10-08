import sharp from 'sharp';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790685634419.jpg';
const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

// Check 4 edges
console.log('Top edge (y=0):');
let topDark = [];
for (let x = 0; x < info.width; x++) {
  const idx = x * 3;
  const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
  if (lum < 200) topDark.push({ x, lum: Math.round(lum), r: data[idx], g: data[idx+1], b: data[idx+2] });
}
console.log(`Top edge dark count: ${topDark.length}`);
if (topDark.length > 0) console.log('Sample top dark:', topDark.slice(0, 5), '...', topDark.slice(-5));

console.log('Left edge (x=0):');
let leftDark = [];
for (let y = 0; y < info.height; y++) {
  const idx = y * info.width * 3;
  const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
  if (lum < 200) leftDark.push({ y, lum: Math.round(lum), r: data[idx], g: data[idx+1], b: data[idx+2] });
}
console.log(`Left edge dark count: ${leftDark.length}`);
if (leftDark.length > 0) console.log('Sample left dark:', leftDark.slice(0, 5), '...', leftDark.slice(-5));

console.log('Right edge (x=1023):');
let rightDark = [];
for (let y = 0; y < info.height; y++) {
  const idx = (y * info.width + 1023) * 3;
  const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
  if (lum < 200) rightDark.push({ y, lum: Math.round(lum), r: data[idx], g: data[idx+1], b: data[idx+2] });
}
console.log(`Right edge dark count: ${rightDark.length}`);
if (rightDark.length > 0) console.log('Sample right dark:', rightDark.slice(0, 5), '...', rightDark.slice(-5));

console.log('Bottom edge (y=895):');
let bottomDark = [];
for (let x = 0; x < info.width; x++) {
  const idx = (895 * info.width + x) * 3;
  const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
  if (lum < 200) bottomDark.push({ x, lum: Math.round(lum), r: data[idx], g: data[idx+1], b: data[idx+2] });
}
console.log(`Bottom edge dark count: ${bottomDark.length}`);
if (bottomDark.length > 0) console.log('Sample bottom dark:', bottomDark.slice(0, 5), '...', bottomDark.slice(-5));
