import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility to generate a tiny base64 mock image representation (e.g. 1x1 green pixel)
const MOCK_BASE64_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function generateAssets() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Generate synthetic payload file
  const payloadPath = path.join(assetsDir, 'synthetic_payload.json');
  const payload = {
    imageCount: 5,
    samples: [
      { id: "mock_001", dataUri: MOCK_BASE64_IMAGE, tag: "Healthy" },
      { id: "mock_002", dataUri: MOCK_BASE64_IMAGE, tag: "Questionable" },
    ]
  };

  fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2));
  console.log(`[SUCCESS] Synthetic dermatoscopic assets generated at ${payloadPath}`);
}

generateAssets();
