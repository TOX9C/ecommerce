
const API_URL = "http://localhost:3001/api/v1";

async function verifyErrorMessage() {
    console.log("Testing Error Message Specificity...");

    // Missing street, city, town
    const payload = {
        username: `user_${Math.floor(Math.random() * 10000)}`,
        password: "Password123",
        phoneNumber: "0501234567",
        // street: missing
        // city: missing
        // town: missing
    };

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("❌ Request Failed (Expected):", res.status);
            console.log("Message:", data.message);
            if (data.message.includes("Street address is required")) {
                console.log("✅ verified: 'Street address is required' is present.");
            } else {
                console.error("❌ verification failed: Specific street error missing.");
            }
        } else {
            console.error("❌ Unexpected Success");
        }
    } catch (e: any) {
        console.error("Request Error:", e);
    }
}

verifyErrorMessage();
