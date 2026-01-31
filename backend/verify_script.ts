
// Removed axios import, using native fetch

const API_URL = 'http://localhost:3001/api/v1';

async function verify() {
    console.log("Starting Verification...");

    const testUser = {
        username: "testuser_" + Date.now(),
        password: "Password123!",
        phoneNumber: "050" + Math.floor(1000000 + Math.random() * 9000000), // Random 10 digit
        street: "123 Main St",
        city: "Tech City",
        town: "Dev Town"
    };

    try {
        // 1. Register
        console.log("\n1. Testing Registration...");
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        console.log(`Registration Success: ${regRes.ok}`);
        if (!regRes.ok) console.log("Error:", regData);

        // 2. Login with Username
        console.log("\n2. Testing Login (Username)...");
        const loginUserRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: testUser.username,
                password: testUser.password
            })
        });
        const loginUserData = await loginUserRes.json();
        console.log(`Login (Username) Success: ${!!loginUserData.token}`);

        // 3. Login with Phone
        console.log("\n3. Testing Login (Phone)...");
        const loginPhoneRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: testUser.phoneNumber, // The field is 'username' in the body but contains phone
                password: testUser.password
            })
        });
        const loginPhoneData = await loginPhoneRes.json();
        console.log(`Login (Phone) Success: ${!!loginPhoneData.token}`);

    } catch (error: any) {
        console.error("Verification Failed:", error.message);
    }
}

verify();
