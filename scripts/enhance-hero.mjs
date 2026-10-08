import sharp from 'sharp';

const inputPath = 'C:/Users/SUPERVISOR.DESKTOP-DFQNMIK/.gemini/antigravity/brain/3094d9da-ddbd-4bc2-ab82-91cd8be44b1d/.user_uploaded/media_1790682227242.jpg';

// Generate enhanced versions
// Version A: Natural sunny enhancement (boost greens, brighten shadows)
await sharp(inputPath)
  .modulate({
    brightness: 1.07,
    saturation: 1.25,
    hue: 0
  })
  .sharpen({ sigma: 1, m1: 0.5, m2: 0.5 })
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toFile('public/images/hero-cpce-sede-enhanced.jpg');

// Version B: Extra vibrant & luminous foliage
await sharp(inputPath)
  .modulate({
    brightness: 1.12,
    saturation: 1.35,
  })
  .sharpen({ sigma: 1.2, m1: 0.6, m2: 0.6 })
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toFile('public/images/hero-cpce-sede-vibrant.jpg');

console.log('Generated enhanced hero images successfully!');
