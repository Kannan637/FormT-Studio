const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("--> Starting FormT-Studio build process...");
const rootDir = __dirname;
const frontendDir = path.join(rootDir, "Frontend");

if (!fs.existsSync(frontendDir)) {
  console.error("Error: Frontend directory not found at " + frontendDir);
  process.exit(1);
}

// 1. Install dependencies in Frontend if node_modules does not exist
const nodeModulesDir = path.join(frontendDir, "node_modules");
if (!fs.existsSync(nodeModulesDir)) {
  console.log("--> Installing Frontend dependencies...");
  execSync("npm install", { cwd: frontendDir, stdio: "inherit" });
}

// 2. Run Next.js build inside Frontend
console.log("--> Running next build in Frontend...");
execSync("npm run build", { cwd: frontendDir, stdio: "inherit" });

// 3. Ensure static export directory exists
const srcOut = path.join(frontendDir, "out");
const destOut = path.join(rootDir, "out");

if (!fs.existsSync(srcOut)) {
  console.error("Error: Static export directory not found at " + srcOut);
  process.exit(1);
}

// 4. Mirror static output to root ./out for Cloudflare Pages root deployers
console.log("--> Mirroring static assets to root ./out directory...");
if (fs.existsSync(destOut)) {
  fs.rmSync(destOut, { recursive: true, force: true });
}
fs.cpSync(srcOut, destOut, { recursive: true });

console.log("--> Success: FormT-Studio build completed!");
console.log("--> Static files ready in: ./out and ./Frontend/out");
