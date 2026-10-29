import React, { useState } from "react";
import { View, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Card, Btn, Chip, Field, Hero, Screen, notify } from "../src/ui";

const roleChoices = [
  "Learner / Student",
  "Frontend / Mobile Dev",
  "UI/UX Designer",
  "Data Analyst",
  "Female Founder",
  "Tech Mentor",
];

export default function Signup() {
  const a = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleChoices[0]);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim()) return notify("Please enter your name.");
    if (!email.trim() || !email.includes("@")) return notify("Please enter a valid email address.");
    if (password.length < 4) return notify("Password should be at least 4 characters long.");

    setLoading(true);
    try {
      const user = await a.signup(name.trim(), email.trim(), password, role);
      notify(`Welcome to the sisterhood, ${user.name}! 🌟`);
      router.replace("/(tabs)");
    } catch (err: any) {
      notify(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Hero>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: C.white,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: C.rose,
                marginBottom: 10,
              }}
            >
              <T size={28}>✨</T>
            </View>
            <T size={22} bold color={C.brown}>Join That's My Gurl</T>
            <T color={C.brown} style={{ textAlign: "center", marginTop: 4 }}>
              Learn it. Build it. Lead it. Find your people.
            </T>
          </View>
        </Hero>

        <Card>
          <Field
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Aminata Kamara"
          />

          <Field
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. aminata@example.com"
          />

          <T bold size={13} style={{ marginBottom: 6 }}>Your Primary Tech Focus / Role</T>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {roleChoices.map((r) => (
              <Chip
                key={r}
                label={r}
                active={role === r}
                onPress={() => setRole(r)}
              />
            ))}
          </View>

          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
          />

          {loading ? (
            <ActivityIndicator size="small" color={C.rose} style={{ marginVertical: 12 }} />
          ) : (
            <Btn title="Create My Account" icon="user-plus" onPress={handleSignup} />
          )}

          <View style={{ marginTop: 14, flexDirection: "row", justifyContent: "center", gap: 6 }}>
            <T color={C.muted}>Already have an account?</T>
            <Pressable onPress={() => router.push("/login" as any)}>
              <T bold color={C.rose}>Sign in</T>
            </Pressable>
          </View>
        </Card>

        <Card style={{ backgroundColor: C.blush, borderColor: C.soft }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="shield" size={18} color={C.rose} />
            <T size={12} color={C.text} style={{ flex: 1 }}>
              By joining, you pledge to respect, support, and lift up fellow women in tech in a safe, constructive environment.
            </T>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}

