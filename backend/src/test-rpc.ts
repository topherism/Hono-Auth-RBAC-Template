// src/test-rpc.ts
import { hc } from "hono/client";
import type { AppType } from "./app";

const client = hc<AppType>("http://localhost:3000/api/");

async function testRolePermissions() {
  console.log("🧪 Testing Role Permissions RPC...\n");

  // ✅ Test 1: Get all role permissions (without auth - should fail)
  console.log("📝 Test 1: Get Role Permissions (No Auth)");
  try {
    const response = await client.role.permissions.$get();
    console.log("Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Data:", JSON.stringify(data, null, 2));
    } else {
      const error = await response.json();
      console.log("❌ Expected Failure (No Auth):", error);
    }
  } catch (error: any) {
    console.log("❌ Error:", error?.message || error);
  }

  console.log("\n" + "=".repeat(60) + "\n");

  // ✅ Test 2: Get role permissions with auth token
  console.log("📝 Test 2: Get Role Permissions (With Auth Token)");
  console.log("First, login to get token...\n");

  try {
    // Login first to get token
    const loginResponse = await client.auth.login.$post({
      json: {
        emailOrUsername: "test@test.com",
        password: "password123", // Adjust based on your seed
      },
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      const accessToken = loginData.accessToken;

      console.log("✅ Login successful! Token received.");
      console.log("Token preview:", accessToken?.substring(0, 30) + "...\n");

      // Now test role-permissions with auth
      console.log("Fetching role-permissions with auth...");
      const response = await client.role.permissions.$get(
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Success! Data:", JSON.stringify(data, null, 2));
      } else {
        const error = await response.json();
        console.log("❌ Failed:", error);
      }
    } else {
      const error = await loginResponse.json();
      console.log("❌ Login failed:", error);
    }
  } catch (error: any) {
    console.log("❌ Error:", error?.message || error);
  }

  console.log("\n" + "=".repeat(60) + "\n");

  // ✅ Test 3: Test rate limiter on role-permissions
  console.log("🔥 Test 3: User Rate Limiter (100 rapid requests)");

  // Login once to get token
  const loginResponse = await client.auth.login.$post({
    json: {
      emailOrUsername: "superadmin",
      password: "changeme123"
    }
  });

  if (loginResponse.ok) {
    const loginData = await loginResponse.json();
    const accessToken = loginData.accessToken;

    for (let i = 0; i < 101; i++) {
      try {
        const res = await client.role.permissions.$get(
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const rateLimitRemaining = res.headers.get("x-ratelimit-remaining");
        const rateLimitLimit = res.headers.get("x-ratelimit-limit");

        console.log(
          `Request ${i + 1}: Status ${res.status}` +
          (rateLimitRemaining ? ` | Rate Limit: ${rateLimitRemaining}/${rateLimitLimit}` : "")
        );
      const status = res.status as number;

        if (status === 429) {
          console.log("  ⚠️ Rate limit hit!");
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error: any) {
        console.log(`Request ${i + 1}: ❌ Error:`, error?.message || error);
      }
    }
  }

  // 🔥 Test 4: Invalid login attempts (simulate brute-force)
  console.log("💥 Test 4: Invalid Login Attempts (20 times)");

  for (let i = 0; i < 20; i++) {
    try {
      const res = await client.auth.login.$post({
        json: {
          emailOrUsername: "invalid@test.com",
          password: "wrongpassword",
        },
      });

      const data = await res.json();
      console.log(`Attempt ${i + 1}: Status ${res.status} | Response:`, data);
      console.log(res);
      const status = res.status as number;
      if (status === 429) {
        console.log("⚠️ Login rate limit hit!");
        break;
      }
    } catch (error: any) {
      console.log(`Attempt ${i + 1}: ❌ Error`, error?.message || error);
    }
  }

  console.log("\n✅ Role Permissions RPC tests completed!");
}

// Run the tests
testRolePermissions().catch(console.error);
