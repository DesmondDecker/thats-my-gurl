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
    const { name, email, password, role } = JSON.parse(event.body || "{}");

    if (!name || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name, email, and password are required." }),
      };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const { db } = await connectToDatabase();
    const users = db.collection("users");

    // Check if user already exists
    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: "An account with this email already exists." }),
      };
    }

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      role: role || "Women in tech",
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    const userProfile = {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ success: true, user: userProfile }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Failed to create user account." }),
    };
  }
};

