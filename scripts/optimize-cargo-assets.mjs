import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "content/assets-manifest.json");
const displayDir = resolve(root, "public/media/display");
const concurrency = Number(process.env.IMAGE_CONCURRENCY ?? 4);
const maxWidth = Number(process.env.IMAGE_WIDTH ?? 2400);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const images = manifest.assets.filter((asset) => asset.type === "image");
await mkdir(displayDir, { recursive: true });

async function isExistingFile(path) {
  try {
    return (await stat(path)).size > 100;
  } catch {
    return false;
  }
}

let completed = 0;
let cursor = 0;

async function worker() {
  while (cursor < images.length) {
    const index = cursor++;
    const asset = images[index];
    const source = resolve(root, asset.originalFile);
    const displayFile = `/media/display/${asset.hash}.avif`;
    const destination = resolve(root, `public${displayFile}`);

    try {
      if (!(await isExistingFile(destination))) {
        await sharp(source, { failOn: "none" })
          .rotate()
          .resize({ width: maxWidth, height: maxWidth, fit: "inside", withoutEnlargement: true })
          .avif({ quality: 72, effort: 4 })
          .toFile(destination);
      }
      asset.displayFile = displayFile;
      asset.displayBytes = (await stat(destination)).size;
      asset.displayStatus = "ready";
    } catch (error) {
      asset.displayStatus = "failed";
      asset.displayError = String(error);
    }

    completed += 1;
    if (completed % 25 === 0 || completed === images.length) {
      console.log(`Optimized ${completed}/${images.length}`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
manifest.optimizedAt = new Date().toISOString();
manifest.displayFormat = "avif";
manifest.displayMaxWidth = maxWidth;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const failed = images.filter((asset) => asset.displayStatus === "failed");
console.log(`Display images: ${images.length - failed.length}/${images.length} ready; ${failed.length} failed.`);
if (failed.length) process.exitCode = 1;
