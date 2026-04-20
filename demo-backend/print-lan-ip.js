"use strict";

const os = require("node:os");

const interfaces = os.networkInterfaces();
const lanAddresses = [];

for (const [name, entries] of Object.entries(interfaces)) {
  if (!entries) {
    continue;
  }

  for (const entry of entries) {
    const isIpv4 = typeof entry.family === "string" ? entry.family === "IPv4" : entry.family === 4;

    if (!isIpv4 || entry.internal) {
      continue;
    }

    lanAddresses.push({ name, address: entry.address });
  }
}

if (lanAddresses.length === 0) {
  // eslint-disable-next-line no-console
  console.log("No LAN IPv4 addresses found.");
  process.exit(0);
}

// eslint-disable-next-line no-console
console.log("Available LAN IPv4 addresses:");
for (const entry of lanAddresses) {
  // eslint-disable-next-line no-console
  console.log(`- ${entry.name}: ${entry.address}`);
}
