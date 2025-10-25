import fs from "fs";
import app from "../src/app"; // adjust to your actual app file path

async function generateOpenAPI() {
  // simulate the /doc route to get the JSON
  const res = await app.request("/doc");
  const openapi = await res.json();

  fs.writeFileSync("openapi.json", JSON.stringify(openapi, null, 2));
  console.log("✅ OpenAPI schema generated: openapi.json");
}

generateOpenAPI();
