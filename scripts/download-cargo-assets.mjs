import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const exportPath = resolve(root, "content/cargo-export.json");
const manifestPath = resolve(root, "content/assets-manifest.json");
const originalDir = resolve(root, "archive/cargo-originals");
const videoDir = resolve(root, "public/media/video");
const concurrency = Number(process.env.ASSET_CONCURRENCY ?? 8);

const cargo = JSON.parse(await readFile(exportPath, "utf8"));
const occurrences = [
  ...Object.values(cargo.projects).flatMap((project) => project.media),
  ...Object.values(cargo.categories).flatMap((category) => category.media),
].filter((asset) => /^https?:/.test(asset.src ?? ""));

const assetsByHash = new Map();
for (const asset of occurrences) {
  if (!assetsByHash.has(asset.hash)) assetsByHash.set(asset.hash, asset);
}

const normalizeExtension = (source, type) => {
  if (type === "video") return ".mp4";
  const extension = extname(new URL(source).pathname).toLowerCase();
  if (extension === ".jpeg") return ".jpg";
  return extension || ".jpg";
};

const originalUrl = (asset) => {
  if (asset.type !== "image") return asset.src;
  return asset.src.replace(/\/w\/\d+\/i\//, "/w/8192/i/");
};

await Promise.all([
  mkdir(originalDir, { recursive: true }),
  mkdir(videoDir, { recursive: true }),
]);

const manifest = [...assetsByHash.values()].map((asset) => {
  const extension = normalizeExtension(asset.src, asset.type);
  const fileName = `${asset.hash}${extension}`;
  return {
    hash: asset.hash,
    type: asset.type,
    sourceUrl: asset.src,
    downloadUrl: originalUrl(asset),
    width: asset.width ?? null,
    height: asset.height ?? null,
    originalFile: `archive/cargo-originals/${fileName}`,
    displayFile: asset.type === "video" ? `/media/video/${fileName}` : null,
    status: "pending",
  };
});

async function isExistingFile(path) {
  try {
    return (await stat(path)).size > 100;
  } catch {
    return false;
  }
}

async function download(url, destination) {
  const response = await fetch(url, {
    headers: {
      referer: "https://sharlian.cargo.site/",
      "user-agent": "Mozilla/5.0",
    },
    redirect: "follow",
  });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || contentType.includes("text/html")) {
    throw new Error(`${response.status} ${response.statusText} (${contentType || "unknown type"})`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length <= 100) throw new Error(`Downloaded only ${bytes.length} bytes`);
  await writeFile(destination, bytes);
  return bytes.length;
}

let completed = 0;
let cursor = 0;

async function worker() {
  while (cursor < manifest.length) {
    const index = cursor++;
    const asset = manifest[index];
    const destination = resolve(root, asset.originalFile);
    if (await isExistingFile(destination)) {
      asset.status = "existing";
      asset.bytes = (await stat(destination)).size;
    } else {
      try {
        asset.bytes = await download(asset.downloadUrl, destination);
        asset.status = "downloaded-original";
      } catch (originalError) {
        try {
          asset.bytes = await download(asset.sourceUrl, destination);
          asset.status = "downloaded-display-fallback";
          asset.error = String(originalError);
        } catch (fallbackError) {
          asset.status = "failed";
          asset.error = `${String(originalError)}; ${String(fallbackError)}`;
        }
      }
    }

    completed += 1;
    if (completed % 25 === 0 || completed === manifest.length) {
      console.log(`Downloaded ${completed}/${manifest.length}`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
await writeFile(manifestPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), assets: manifest }, null, 2)}\n`);

const failed = manifest.filter((asset) => asset.status === "failed");
const fallbacks = manifest.filter((asset) => asset.status === "downloaded-display-fallback");
console.log(`Cargo assets: ${manifest.length - failed.length}/${manifest.length} downloaded; ${fallbacks.length} display fallbacks; ${failed.length} failed.`);
if (failed.length) process.exitCode = 1;
