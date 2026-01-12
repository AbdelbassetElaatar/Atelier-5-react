import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const ordersSourcePath = path.join(dataDir, "orders.json");
const ordersTargetPath = process.env.VERCEL
  ? path.join("/tmp", "orders.json")
  : ordersSourcePath;

const ensureOrdersFile = async () => {
  if (!process.env.VERCEL) return;

  try {
    await fs.access(ordersTargetPath);
  } catch {
    const seed = await fs.readFile(ordersSourcePath, "utf8");
    await fs.writeFile(ordersTargetPath, seed);
  }
};

export default async function handler(req, res) {
  // CORS / headers (safe even though same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST, OPTIONS");
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString("utf8") || "{}";
    const parsed = JSON.parse(body);
    const orderData = parsed.order;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Missing data." }));
      return;
    }

    if (
      !orderData.customer?.email ||
      !orderData.customer.email.includes("@") ||
      !orderData.customer?.name ||
      orderData.customer.name.trim() === "" ||
      !orderData.customer?.street ||
      orderData.customer.street.trim() === "" ||
      !orderData.customer?.["postal-code"] ||
      orderData.customer["postal-code"].trim() === "" ||
      !orderData.customer?.city ||
      orderData.customer.city.trim() === ""
    ) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message:
            "Missing data: Email, name, street, postal code or city is missing.",
        }),
      );
      return;
    }

    await ensureOrdersFile();

    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };

    const orders = await fs.readFile(ordersTargetPath, "utf8");
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile(ordersTargetPath, JSON.stringify(allOrders));

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Order created!" }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Failed to create order." }));
  }
}

