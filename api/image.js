import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, "public", "images");

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, "http://localhost");
    const relPath = url.searchParams.get("path");

    if (!relPath) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Missing image path." }));
      return;
    }

    const safeName = path.basename(relPath);
    const imgPath = path.join(imagesDir, safeName);

    const data = await fs.readFile(imgPath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Image not found." }));
  }
}

