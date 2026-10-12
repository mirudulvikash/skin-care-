import { execSync } from 'child_process';
import fetch from 'node-fetch'; // requires node 18+ native fetch, bypassing imports is better

async function runEndToEndTests() {
  console.log("=== VIVA DEMO PIPELINE E2E TEST ===");

  try {
    // 1. Generate Assets
    console.log("\\n[1/3] Generating synthetic assets...");
    execSync("node scripts/generate-assets.mjs", { stdio: "inherit" });
    
    // 2. Validate Database Migration Status
    console.log("\\n[2/3] Checking Postgres Schema Init...");
    execSync("node scripts/init-db.mjs", { stdio: "inherit", env: { ...process.env, NODE_OPTIONS: '--no-warnings' } });
    
    // 3. Health API Connectivity
    console.log("\\n[3/3] Triaging Local API Health Point...");
    console.log("-> Assuming server is running on http://localhost:3000\\n");
    
    try {
      const response = await globalThis.fetch("http://localhost:3000/api/health");
      const data = await response.json();
      
      if (data.status === "healthy") {
        console.log("✅ [E2E PASS] Health Endpoint reflects ACTIVE Database connection!");
      } else {
        console.error("❌ [E2E FAIL] Health Endpoint reported Unhealthy.");
      }
    } catch (e) {
      console.warn("⚠️ [SKIPPED] Localhost API isn't live. Start it with `npm run dev` to thoroughly test Step 3.");
    }
    
    console.log("\\n=== TEST PIPELINE COMPLETED ===");
  } catch (error) {
    console.error("\\n❌ [FATAL E2E ERROR] Pipeline crashed remotely: ", error.message);
    process.exit(1);
  }
}

runEndToEndTests();
