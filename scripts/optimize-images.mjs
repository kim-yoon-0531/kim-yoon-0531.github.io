import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const galleryDir = 'public/images/gallery';
const mockupDir = 'public/images/mockup';

async function optimizeFile(inputPath, outputPath, maxWidth, quality = 75) {
  const meta = await sharp(inputPath).metadata();
  let pipeline = sharp(inputPath);

  if (meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth);
  }

  await pipeline.webp({ quality }).toFile(outputPath);

  const origSize = fs.statSync(inputPath).size;
  const newSize = fs.statSync(outputPath).size;
  const saved = ((1 - newSize / origSize) * 100).toFixed(1);
  console.log(`${path.basename(inputPath)} → ${path.basename(outputPath)}  ${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB  (-${saved}%)`);
}

async function run() {
  // Gallery: 원본 → 1200px webp, 썸네일 → 300px webp
  const galleryFiles = fs.readdirSync(galleryDir).filter(f => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));

  const thumbDir = path.join(galleryDir, 'thumb');
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

  console.log('=== Gallery Images ===');
  for (const file of galleryFiles) {
    const input = path.join(galleryDir, file);
    const name = path.parse(file).name;
    const output = path.join(galleryDir, `${name}.webp`);
    const thumbOutput = path.join(thumbDir, `${name}.webp`);

    await optimizeFile(input, output, 1200, 75);
    await optimizeFile(input, thumbOutput, 300, 70);
  }

  // Mockup images
  console.log('\n=== Mockup Images ===');
  const mainDir = path.join(mockupDir, 'main');
  const footerDir = path.join(mockupDir, 'footer');

  // background.png → webp
  if (fs.existsSync(path.join(mainDir, 'background.png'))) {
    await optimizeFile(path.join(mainDir, 'background.png'), path.join(mainDir, 'background.webp'), 800, 75);
  }
  // img.png → webp
  if (fs.existsSync(path.join(mainDir, 'img.png'))) {
    await optimizeFile(path.join(mainDir, 'img.png'), path.join(mainDir, 'img.webp'), 800, 80);
  }
  // footer.png → webp
  if (fs.existsSync(path.join(footerDir, 'footer.png'))) {
    await optimizeFile(path.join(footerDir, 'footer.png'), path.join(footerDir, 'footer.webp'), 800, 75);
  }

  console.log('\nDone! You can now delete the original JPG/PNG files if you want.');
}

run().catch(console.error);
