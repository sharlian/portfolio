import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const cargo = JSON.parse(await readFile(resolve(root, "content/cargo-export.json"), "utf8"));
const manifest = JSON.parse(await readFile(resolve(root, "content/assets-manifest.json"), "utf8"));
const assets = new Map(manifest.assets.map((asset) => [asset.hash, asset]));

const slugByTitle = new Map(Object.entries({
  "LOUNGE CHAIR | Axiom.N": "axiom-n",
  "LOUNGE CHAIR | Wasteland Crawler": "wasteland-crawler",
  "PET URN | Sailing Leaf": "sailing-leaf",
  "SIDE TABLE | Sombrero": "sombrero",
  "TEA CEREMONY DESIGN | Zzzing": "zzzing",
  "PET_HUMAN | Together.Ⅱ": "together-ii",
  "LIGHTING | Backbone": "backbone",
  "SOFA | Ivory Boat": "ivory-boat",
  "SOFA | Autumn Breeze": "autumn-breeze",
  "TABLE | Pillar": "pillar",
  "COFFEE TABLE | Ma": "ma",
  "SOFA | Strata": "strata",
  "LOUNGE CHAIR | Lithosphere": "lithosphere",
  "COFFEE TABLE | Lithos Trio": "lithos-trio",
  "SOFA | The Marshal's Crest": "the-marshals-crest",
  "VASE | Swirl": "swirl",
  "STOOL | Drama": "drama",
  "BED | Muaji": "muaji",
  "SOFA | M.Gustave": "m-gustave",
  "COFFEE TABLE | Back to Basics": "back-to-basics",
  "SOFA | Tube": "tube",
  "PET URN | Pharos": "pharos",
  "SOFA | Sandbag": "sandbag",
  "PET URN | Relive": "relive",
  "PET URN | Company": "company",
  "MATERIAL APPLICATION | Acrylic": "acrylic",
  "PET URN | Tie": "tie",
  "PET URN | Plant Pot Concepts": "plant-pot-concepts",
  "COASTAL CLEANUP | c.c.Lab": "cc-lab",
  "PET_HUMAN | Eat together !": "eat-together",
  "ANAESTHETIC FOR SOUL | Recharge": "recharge",
  "FISHING_unhooking tool | Finish": "finish",
  "Learning aids for kids with ADHD | Minder": "minder",
  "EXHIBITION INSTALLATION DESIGN | Puppetry Art Center": "puppetry-art-center",
  "SKETCH PRACTICE": "sketch-practice",
  "CANSTRUCTION | Dei 茶": "dei-tea",
  "ERGONOMICS | Drip Stand": "drip-stand",
  "PHOTOGRAPHY": "photography",
  "FLORAL DESIGN PRACTICE": "floral-design-practice",
}));

const categoryDefinitions = [
  { slug: "emotion", title: "Emotion & Meaning" },
  { slug: "form", title: "Form & Culture" },
  { slug: "function", title: "Function & Reality" },
];

const projectOrder = cargo.categories.all.media.map((item) => item.caption);
const categoryTitles = Object.fromEntries(
  categoryDefinitions.map(({ slug }) => [slug, cargo.categories[slug].media.map((item) => item.caption)]),
);
const coverByTitle = new Map(cargo.categories.all.media.map((item) => [item.caption, item]));
const missingAssets = [];

function toLocalMedia(block, projectTitle, position) {
  const asset = assets.get(block.hash);
  if (!asset) {
    const missing = {
      projectTitle,
      projectSlug: slugByTitle.get(projectTitle),
      assetId: block.hash,
      sourcePosition: position,
      reason: "Cargo returned a transparent placeholder instead of the original asset.",
    };
    missingAssets.push(missing);
    return {
      type: "missing",
      assetId: block.hash,
      label: "Original asset unavailable",
    };
  }

  return {
    type: block.type,
    src: asset.displayFile,
    width: block.width ?? null,
    height: block.height ?? null,
    alt: block.caption || `${projectTitle} — ${block.type} ${position + 1}`,
  };
}

function projectCategories(title) {
  return categoryDefinitions
    .filter(({ slug }) => categoryTitles[slug].includes(title))
    .map(({ slug }) => slug);
}

const projects = projectOrder.map((title) => {
  const source = cargo.projects[title];
  const coverSource = coverByTitle.get(title);
  const coverAsset = assets.get(coverSource.hash);
  const body = [...source.content];

  // Cargo pages repeat their title as the first content block. The Eat together
  // page contains a known copied title error here; use the verified page title.
  if (body[0]?.type === "text") body.shift();
  if (body[0]?.type === "divider") body.shift();

  const content = body.map((block, index) => {
    if (block.type === "image" || block.type === "video") {
      return toLocalMedia(block, title, index + 2);
    }
    if (block.type === "text") return { type: "text", text: block.text };
    return { type: "divider" };
  });

  const text = content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");
  const yearMatch = text.match(/\byear\s+(19|20)\d{2}\b/i);

  return {
    slug: slugByTitle.get(title),
    title,
    sourceUrl: `https://sharlian.cargo.site/${source.slug}`,
    categories: projectCategories(title),
    ...(yearMatch ? { year: yearMatch[0].match(/\d{4}/)[0] } : {}),
    cover: {
      src: coverAsset.displayFile,
      width: coverSource.width,
      height: coverSource.height,
      alt: `${title} — cover image`,
    },
    content,
  };
});

const categories = categoryDefinitions.map(({ slug, title }) => ({
  slug,
  title,
  description: "Design with sense and sensibility — balancing emotion and logic in form.",
  projectSlugs: categoryTitles[slug].map((projectTitle) => slugByTitle.get(projectTitle)),
}));

const portfolio = {
  generatedAt: new Date().toISOString(),
  site: {
    name: "SHARLIAN TSENG",
    role: "Product & Furniture Designer",
    introduction: "industrial design | product design | furniture design",
    contacts: [
      { label: "Email", href: "mailto:juby9988@gmail.com" },
      { label: "Behance", href: "https://www.behance.net/Sharlian" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sharlian/" },
    ],
  },
  categories,
  projects: projects.map(({ sourceUrl: _sourceUrl, ...project }) => project),
  missingAssets,
  sourceDefects: [
    {
      projectTitle: "PET_HUMAN | Eat together !",
      detail: "The Cargo page body starts with the copied title ‘MATERIAL APPLICATION | Acrylic’; the verified Cargo page title is used instead.",
    },
  ],
};

if (projects.some((project) => !project.slug || !project.cover.src)) {
  throw new Error("A project is missing its local slug or cover image.");
}
if (missingAssets.length !== 0) {
  throw new Error(`Expected all supplied assets to be recovered, found ${missingAssets.length} missing.`);
}

const escapeTable = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const inventoryRows = projects.map((project) => {
  const imageCount = project.content.filter((block) => block.type === "image").length;
  const videoCount = project.content.filter((block) => block.type === "video").length;
  const textCount = project.content.filter((block) => block.type === "text").length;
  const missingCount = project.content.filter((block) => block.type === "missing").length;
  const categoryLabel = project.categories.length
    ? project.categories.map((slug) => categories.find((category) => category.slug === slug).title).join(", ")
    : "All Works only";
  const mediaStatus = missingCount
    ? `${imageCount} images, ${videoCount} videos saved; ${missingCount} missing`
    : `${imageCount} images, ${videoCount} videos saved`;
  return `| ${escapeTable(project.title)} | ${escapeTable(categoryLabel)} | ${escapeTable(project.sourceUrl)} | ${textCount} blocks saved | ${mediaStatus} |`;
});

const inventory = `# Cargo content inventory\n\n` +
  `Captured from the authenticated Cargo editor on ${cargo.capturedAt}. The public Cargo site may be private or expired.\n\n` +
  `- Projects: ${projects.length}\n` +
  `- Saved unique assets: ${manifest.assets.length} (${manifest.assets.filter((asset) => asset.type === "image").length} images, ${manifest.assets.filter((asset) => asset.type === "video").length} videos)\n` +
  `- Unavailable source assets: ${missingAssets.length}\n\n` +
  `| Work | Category | Original URL | Text | Media |\n` +
  `| --- | --- | --- | --- | --- |\n` +
  `${inventoryRows.join("\n")}\n\n` +
  `## Missing source assets\n\n` +
  (missingAssets.length
    ? missingAssets.map((asset) => `- ${asset.projectTitle}: ${asset.assetId} (original content position ${asset.sourcePosition + 1})`).join("\n")
    : `None.`) +
  `\n\n## Confirmed source defect\n\n` +
  `- PET_HUMAN | Eat together !: Cargo's first body heading incorrectly says “MATERIAL APPLICATION | Acrylic”. The new site uses the verified project title and preserves the remaining body content.\n`;

await mkdir(resolve(root, "src/data"), { recursive: true });
await writeFile(resolve(root, "src/data/portfolio-content.json"), `${JSON.stringify(portfolio, null, 2)}\n`);
await writeFile(resolve(root, "content/inventory.md"), inventory);
await writeFile(resolve(root, "content/missing-assets.json"), `${JSON.stringify(missingAssets, null, 2)}\n`);

console.log(`Generated ${projects.length} projects and ${missingAssets.length} missing-asset records.`);
