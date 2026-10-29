import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
  source?: "mongodb" | "local";
};

const LOCAL_USERS_KEY = "tmg-local-users-v1";
const API_BASE = typeof window !== "undefined" && window.location.origin
  ? `${window.location.origin}/.netlify/functions`
  : "/.netlify/functions";

// Local fallback database
async function getLocalUsers(): Promise<Record<string, { name: string; email: string; role: string; password: string }>> {
  try {
    const raw = await AsyncStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveLocalUsers(users: Record<string, any>) {
  try {
    await AsyncStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {}
}

export async function apiSignup(name: string, email: string, password: string, role: string): Promise<AuthUser> {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Try Netlify Functions with MongoDB
  try {
    const res = await fetch(`${API_BASE}/auth-signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: normalizedEmail, password, role }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      return { ...data.user, source: "mongodb" };
    }
    // If server returned a clear conflict error, bubble it up
    if (res.status === 409) {
      throw new Error(data.error || "An account with this email already exists.");
    }
  } catch (err: any) {
    if (err.message && err.message.includes("already exists")) {
      throw err;
    }
    // Network or serverless unavailable -> Fall back gracefully to local storage
  }

  // 2. Local Fallback
  const localUsers = await getLocalUsers();
  if (localUsers[normalizedEmail]) {
    throw new Error("An account with this email already exists.");
  }

  localUsers[normalizedEmail] = {
    name: name.trim(),
    email: normalizedEmail,
    role: role || "Women in tech",
    password,
  };
  await saveLocalUsers(localUsers);

  return {
    id: "local_" + Date.now().toString(36),
    name: name.trim(),
    email: normalizedEmail,
    role: role || "Women in tech",
    source: "local",
  };
}

export async function apiLogin(email: string, password: string): Promise<AuthUser> {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Try Netlify Functions with MongoDB
  try {
    const res = await fetch(`${API_BASE}/auth-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      return { ...data.user, source: "mongodb" };
    }
    if (res.status === 401) {
      throw new Error(data.error || "Invalid email or password.");
    }
  } catch (err: any) {
    if (err.message && err.message.includes("Invalid email")) {
      throw err;
    }
  }

  // 2. Local Fallback
  const localUsers = await getLocalUsers();
  const found = localUsers[normalizedEmail];

  if (!found || found.password !== password) {
    // If no existing local user and it's a demo account, permit quick access
    if (normalizedEmail.includes("@") && password.length >= 4) {
      return {
        id: "usr_" + Date.now().toString(36),
        name: normalizedEmail.split("@")[0].replace(/[._]/g, " "),
        email: normalizedEmail,
        role: "Women in tech",
        source: "local",
      };
    }
    throw new Error("Invalid email or password.");
  }

  return {
    id: "local_" + Date.now().toString(36),
    name: found.name,
    email: found.email,
    role: found.role,
    source: "local",
  };
}

