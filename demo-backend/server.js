"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { URL } = require("node:url");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const normalizedValue = rawValue.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");

    if (key && process.env[key] === undefined) {
      process.env[key] = normalizedValue;
    }
  }
}

loadEnvFile(path.resolve(__dirname, "../.env"));
loadEnvFile(path.resolve(__dirname, ".env"));

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "0.0.0.0";
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

function getLanUrls(port) {
  const interfaces = os.networkInterfaces();
  const urls = [];

  for (const entries of Object.values(interfaces)) {
    if (!entries) {
      continue;
    }

    for (const entry of entries) {
      const isIpv4 = typeof entry.family === "string" ? entry.family === "IPv4" : entry.family === 4;

      if (!isIpv4 || entry.internal) {
        continue;
      }

      urls.push(`http://${entry.address}:${port}`);
    }
  }

  return [...new Set(urls)];
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, body) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function assertConfig() {
  if (!razorpayKeyId || !razorpayKeySecret) {
    throw new Error(
      "Missing Razorpay backend credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    );
  }
}

async function readJsonBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

async function createRazorpayOrder(payload) {
  assertConfig();

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${razorpayKeyId}:${razorpayKeySecret}`,
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.description || "Razorpay order creation failed on the demo backend.",
    );
  }

  return data;
}

function verifySignature(orderId, paymentId, signature) {
  assertConfig();

  const generatedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, {
      ok: true,
      service: "payments-demo-backend",
      host: HOST,
      port: PORT,
      lanUrls: getLanUrls(PORT),
      razorpayConfigured: Boolean(razorpayKeyId && razorpayKeySecret),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    if (req.method === "POST" && url.pathname === "/payments/order") {
      const body = await readJsonBody(req);
      const order = await createRazorpayOrder({
        amount: body.amount,
        currency: body.currency || "INR",
        receipt: body.receipt,
        notes: body.notes || {},
      });

      sendJson(res, 200, {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/payments/verify") {
      const body = await readJsonBody(req);
      const verified = verifySignature(
        body.razorpay_order_id,
        body.razorpay_payment_id,
        body.razorpay_signature,
      );

      sendJson(res, 200, {
        verified,
      });
      return;
    }

    sendJson(res, 404, { message: "Route not found." });
  } catch (error) {
    sendJson(res, 500, {
      message: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
});

server.listen(PORT, HOST, () => {
  const lanUrls = getLanUrls(PORT);

  // eslint-disable-next-line no-console
  console.log("Payments demo backend is running.");
  // eslint-disable-next-line no-console
  console.log(`- Host binding: ${HOST}`);
  // eslint-disable-next-line no-console
  console.log(`- Local URL: http://localhost:${PORT}`);

  if (lanUrls.length > 0) {
    // eslint-disable-next-line no-console
    console.log("- LAN URLs:");
    for (const lanUrl of lanUrls) {
      // eslint-disable-next-line no-console
      console.log(`  ${lanUrl}`);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log("- No LAN IPv4 address detected. Check your network adapter.");
  }

  // eslint-disable-next-line no-console
  console.log(`- Health check: http://localhost:${PORT}/health`);
});
