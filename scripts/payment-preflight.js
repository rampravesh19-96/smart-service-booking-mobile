"use strict";

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const defaultPublicBackend = "https://smart-service-booking-mobile.onrender.com";

function loadEnvFile(filePath) {
  const values = {};

  if (!fs.existsSync(filePath)) {
    return values;
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

    values[key] = normalizedValue;
  }

  return values;
}

function maskPublicKey(value) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 8) {
    return `${value.slice(0, 2)}***`;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function isPublicHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

const envValues = {
  ...loadEnvFile(envPath),
  ...process.env,
};

const razorpayKeyId = envValues.EXPO_PUBLIC_RAZORPAY_KEY_ID || "";
const paymentsApiBaseUrl =
  (envValues.EXPO_PUBLIC_PAYMENTS_API_BASE_URL || defaultPublicBackend).replace(/\/$/, "");

const checks = [
  {
    label: "Razorpay public key present",
    pass: Boolean(razorpayKeyId),
    detail: maskPublicKey(razorpayKeyId),
  },
  {
    label: "Payments API base URL present",
    pass: Boolean(paymentsApiBaseUrl),
    detail: paymentsApiBaseUrl || "missing",
  },
  {
    label: "Payments API base URL is not localhost",
    pass:
      !paymentsApiBaseUrl.includes("localhost") && !paymentsApiBaseUrl.includes("127.0.0.1"),
    detail: paymentsApiBaseUrl,
  },
  {
    label: "Payments API base URL looks public/valid",
    pass: isPublicHttpUrl(paymentsApiBaseUrl),
    detail: paymentsApiBaseUrl,
  },
  {
    label: "Payments API base URL matches public demo backend",
    pass: paymentsApiBaseUrl === defaultPublicBackend,
    detail: paymentsApiBaseUrl,
  },
];

// eslint-disable-next-line no-console
console.log("Payment preflight");
// eslint-disable-next-line no-console
console.log(`- .env path: ${envPath}`);

for (const check of checks) {
  // eslint-disable-next-line no-console
  console.log(`- ${check.pass ? "PASS" : "FAIL"}: ${check.label} -> ${check.detail}`);
}

const failedChecks = checks.filter((check) => !check.pass);

if (failedChecks.length > 0) {
  // eslint-disable-next-line no-console
  console.log("");
  // eslint-disable-next-line no-console
  console.log("Preflight failed. Fix the above payment env issues before triggering an EAS build.");
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log("");
// eslint-disable-next-line no-console
console.log("Preflight passed. Payment env looks build-ready.");
