const { connectToDatabase } = require("./lib/db");
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Email and password are required." }),
      };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const { db } = await connectToDatabase();
    const users = db.collection("users");

    const user = await users.findOne({ email: normalizedEmail });
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Invalid email or password." }),
      };
    }

    const hash = hashPassword(password);
    if (user.passwordHash !== hash) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Invalid email or password." }),
      };
    }

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, user: userProfile }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Failed to authenticate." }),
    };
  }
};

