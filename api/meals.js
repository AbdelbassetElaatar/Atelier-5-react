import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mealsPath = path.join(__dirname, "data", "available-meals.json");

export default async function handler(req, res) {
  // Allow only GET
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  // CORS / headers (safe even though same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const meals = await fs.readFile(mealsPath, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(meals);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Failed to load meals." }));
  }
}

