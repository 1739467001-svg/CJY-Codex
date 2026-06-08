import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/script.js",
  "public/assets/hero-lab.png",
  "public/data/portfolio.json",
  "server.js",
  "package.json"
];

for (const file of requiredFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const dataPath = resolve(root, "public/data/portfolio.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

if (!Array.isArray(data.works) || data.works.length === 0) {
  throw new Error("portfolio.json must include a non-empty works array.");
}

if (!Array.isArray(data.events) || data.events.length === 0) {
  throw new Error("portfolio.json must include a non-empty events array.");
}

console.log(`Check passed: ${data.works.length} works, ${data.events.length} timeline events.`);
