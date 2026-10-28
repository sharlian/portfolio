import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { basename, resolve } from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "content/assets-manifest.json");
const archiveDir = resolve(root, "archive/cargo-originals");
const displayDir = resolve(root, "public/media/video");
const concurrency = Number(process.env.VIDEO_CONCURRENCY ?? 2);
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const videos = manifest.assets.filter((asset) => asset.type === "video");

await Promise.all([
  mkdir(archiveDir, { recursive: true }),
  mkdir(displayDir, { recursive: true }),
]);

async function fileSize(path) {
  try {
    return (await stat(path)).size;
  } catch {
    return 0;
  }
}

function transcode(source, destination) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(ffmpegPath, [
      "-hide_banner",
      "-loglevel", "error",
      "-i", source,
      "-map", "0:v:0",
      "-map", "0:a?",
      "-vf", "scale='trunc(min(1920,iw)/2)*2':'trunc(ih*min(1920,iw)/iw/2)*2'",
      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", "27",
      "-pix_fmt", "yuv420p",
      "-c:a", "aac",
      "-b:a", "128k",
      "-movflags", "+faststart",
      "-y",
      destination,
    ]);
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(stderr || `ffmpeg exited with ${code}`));
    });
  });
}

let completed = 0;
let cursor = 0;

async function worker() {
  while (cursor < videos.length) {
    const index = cursor++;
    const asset = videos[index];
    const fileName = `${asset.hash}.mp4`;
    const legacyOriginal = resolve(root, asset.originalFile);
    const archivedOriginal = resolve(archiveDir, fileName);
    const displayFile = `/media/video/${fileName}`;
    const displayPath = resolve(root, `public${displayFile}`);
    const temporaryPath = `${displayPath}.tmp.mp4`;

    asset.originalFile = `archive/cargo-originals/${fileName}`;
    asset.displayFile = displayFile;

    try {
      if (!(await fileSize(archivedOriginal))) {
        await rename(legacyOriginal, archivedOriginal);
      }
      if (!(await fileSize(displayPath))) {
        await transcode(archivedOriginal, temporaryPath);
        await rename(temporaryPath, displayPath);
      }
      asset.displayBytes = await fileSize(displayPath);
      asset.displayStatus = "ready";
    } catch (error) {
      asset.displayStatus = "failed";
      asset.displayError = String(error);
    }

    completed += 1;
    console.log(`Optimized video ${completed}/${videos.length}`);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
manifest.videoOptimizedAt = new Date().toISOString();
manifest.videoCodec = "H.264";
manifest.videoMaxWidth = 1920;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const failed = videos.filter((asset) => asset.displayStatus === "failed");
const originalBytes = videos.reduce((sum, asset) => sum + (asset.bytes ?? 0), 0);
const displayBytes = videos.reduce((sum, asset) => sum + (asset.displayBytes ?? 0), 0);
console.log(`Display videos: ${videos.length - failed.length}/${videos.length} ready; ${failed.length} failed.`);
console.log(`Video bytes: ${originalBytes} original -> ${displayBytes} display.`);
if (failed.length) process.exitCode = 1;
