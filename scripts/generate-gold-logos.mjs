import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790685634419.jpg';
const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;

// Gradient stops for Metallic Royal Gold (designed for excellent contrast on light & dark backgrounds)
// Color stops: [t, r, g, b]
const goldGradient = [
  { t: 0.00, r: 185, g: 125, b: 24 },  // Deep warm bronze-gold
  { t: 0.20, r: 218, g: 160, b: 40 },  // Amber gold
  { t: 0.40, r: 248, g: 206, b: 92 },  // Radiant bright gold sheen
  { t: 0.60, r: 224, g: 168, b: 46 },  // Rich gold
  { t: 0.80, r: 196, g: 136, b: 26 },  // Burnished gold
  { t: 1.00, r: 164, g: 104, b: 16 },  // Deep shadow gold
];

function sampleGradient(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < goldGradient.length - 1; i++) {
    const s1 = goldGradient[i];
    const s2 = goldGradient[i + 1];
    if (t >= s1.t && t <= s2.t) {
      const f = (t - s1.t) / (s2.t - s1.t);
      return {
        r: Math.round(s1.r + f * (s2.r - s1.r)),
        g: Math.round(s1.g + f * (s2.g - s1.g)),
        b: Math.round(s1.b + f * (s2.b - s1.b))
      };
    }
  }
  return goldGradient[goldGradient.length - 1];
}

// Solid Royal Gold (#C99728)
const solidGold = { r: 206, g: 153, b: 38 };

// Bright Vibrant Gold (#DDA82A to #F5C542)
const brightGoldGradient = [
  { t: 0.00, r: 212, g: 152, b: 32 },
  { t: 0.35, r: 250, g: 214, b: 95 },
  { t: 0.65, r: 232, g: 178, b: 48 },
  { t: 1.00, r: 188, g: 128, b: 22 }
];
function sampleBrightGradient(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < brightGoldGradient.length - 1; i++) {
    const s1 = brightGoldGradient[i];
    const s2 = brightGoldGradient[i + 1];
    if (t >= s1.t && t <= s2.t) {
      const f = (t - s1.t) / (s2.t - s1.t);
      return {
        r: Math.round(s1.r + f * (s2.r - s1.r)),
        g: Math.round(s1.g + f * (s2.g - s1.g)),
        b: Math.round(s1.b + f * (s2.b - s1.b))
      };
    }
  }
  return brightGoldGradient[brightGoldGradient.length - 1];
}

// Create RGBA buffers
const outGradient = Buffer.alloc(W * H * 4);
const outSolid = Buffer.alloc(W * H * 4);
const outBright = Buffer.alloc(W * H * 4);

const L_BG = 246; // threshold above which it is 100% transparent
const L_FG = 45;  // threshold below which it is 100% opaque

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const inIdx = (y * W + x) * 3;
    const outIdx = (y * W + x) * 4;

    const r = data[inIdx];
    const g = data[inIdx + 1];
    const b = data[inIdx + 2];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    let alpha = 0;
    if (lum <= L_FG) {
      alpha = 255;
    } else if (lum >= L_BG) {
      alpha = 0;
    } else {
      // Smooth cubic hermite / smoothstep curve for clean antialiasing
      const norm = (L_BG - lum) / (L_BG - L_FG);
      const smoothNorm = norm * norm * (3 - 2 * norm);
      alpha = Math.round(smoothNorm * 255);
    }

    if (alpha > 0) {
      // Calculate gradient angle: diagonal from top-left to bottom-right (angle ~ 35 deg)
      // normalized coordinate t:
      const t = (0.6 * (x / W) + 0.4 * (y / H));

      const colG = sampleGradient(t);
      outGradient[outIdx] = colG.r;
      outGradient[outIdx + 1] = colG.g;
      outGradient[outIdx + 2] = colG.b;
      outGradient[outIdx + 3] = alpha;

      outSolid[outIdx] = solidGold.r;
      outSolid[outIdx + 1] = solidGold.g;
      outSolid[outIdx + 2] = solidGold.b;
      outSolid[outIdx + 3] = alpha;

      const colB = sampleBrightGradient(t);
      outBright[outIdx] = colB.r;
      outBright[outIdx + 1] = colB.g;
      outBright[outIdx + 2] = colB.b;
      outBright[outIdx + 3] = alpha;
    } else {
      outGradient[outIdx + 3] = 0;
      outSolid[outIdx + 3] = 0;
      outBright[outIdx + 3] = 0;
    }
  }
}

// Save all three
await sharp(outGradient, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/images/logo-60-anos-gold.png');

await sharp(outSolid, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/images/logo-60-anos-solid.png');

await sharp(outBright, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/images/logo-60-anos-bright.png');

// Also save default as logo-60-anos.png
await sharp(outGradient, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/images/logo-60-anos.png');

console.log('Successfully generated gold logos!');
