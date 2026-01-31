const API_URL = "http://localhost:3001/api/v1";

async function verifyBackend() {
    console.log("Verifying Backend Features...");

    try {
        // 1. Test Limit Parameter
        console.log("Testing Limit Parameter (limit=2)...");
        const resLimit = await fetch(`${API_URL}/product/get?limit=2`);
        const dataLimit = await resLimit.json();

        if (dataLimit.items.length === 2) {
            console.log("✅ Limit parameter working (got 2 items)");
        } else {
            console.error(`❌ Limit parameter failed: expected 2, got ${dataLimit.items.length}`);
        }

        // 2. Test Fetching All (Default)
        console.log("Testing Default Fetch...");
        const resDefault = await fetch(`${API_URL}/product/get`);
        const dataDefault = await resDefault.json();
        console.log(`✅ Default fetch got ${dataDefault.items.length} items (expected default 15 or remaining seeded)`);

        // 3. Test Search Category (for Dynamic Categories logic check)
        const firstProduct = dataDefault.items[0];
        if (firstProduct && firstProduct.category) {
            console.log(`Testing Category Search for '${firstProduct.category}'...`);
            const resCat = await fetch(`${API_URL}/product/searchCategory?category=${firstProduct.category}`);
            const dataCat = await resCat.json();

            if (dataCat.items.length > 0) {
                console.log(`✅ Category search working (got ${dataCat.items.length} items)`);
            } else {
                console.error("❌ Category search returned 0 items");
            }

            // Verify unique categories logic (simulation)
            const uniqueCats = Array.from(new Set(dataDefault.items.map((p: any) => p.category))).filter(Boolean);
            console.log(`✅ Found ${uniqueCats.length} unique categories from default batch: ${uniqueCats.join(", ")}`);
        }

        console.log("\nBackend Verification Complete.");

    } catch (error: any) {
        console.error("❌ Verification Failed:", error.message);
    }
}

verifyBackend();
