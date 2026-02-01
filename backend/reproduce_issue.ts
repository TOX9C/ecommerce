
const API_URL = "http://localhost:3001/api/v1";

async function testRegistration() {
    console.log("Testing Registration...");

    const suffix = Math.floor(Math.random() * 10000);
    const payload = {
        username: `user_${suffix}`, // Valid
        password: "Password123", // Valid
        phoneNumber: `050${String(suffix).padStart(7, '0')}`, // Valid 10 digit
        street: "123 Main St",
        city: "Test City",
        town: "Test Town"
    };

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            console.log("✅ Registration Success");
        } else {
            console.log("❌ Registration Failed:", res.status, data);
            if (data.errors) {
                console.log("Validation Errors:", JSON.stringify(data.errors, null, 2));
            }
        }
    } catch (e: any) {
        console.error("Request Error:", e);
    }
}

testRegistration();
