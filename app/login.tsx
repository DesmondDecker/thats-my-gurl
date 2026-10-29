import React, { useState } from "react";
import { View, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Card, Btn, Field, Hero, Screen, notify } from "../src/ui";

export default function Login() {
  const a = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return notify("Please enter your email and password.");
    }
    setLoading(true);
    try {
      const user = await a.login(email.trim(), password);
      notify(`Welcome back, ${user.name}! 💖`);
      router.replace("/(tabs)");
    } catch (err: any) {
      notify(err.message || "Failed to sign in. Please check your credentials.");
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
              <T size={28}>👑</T>
            </View>
            <T size={22} bold color={C.brown}>Welcome Back, Sister</T>
            <T color={C.brown} style={{ textAlign: "center", marginTop: 4 }}>
              Sign in to That's My Gurl to access your opportunities, journal, and growth streaks.
            </T>
          </View>
        </Hero>

        <Card>
          <Field
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. aminata@example.com"
          />

          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
          />

          {loading ? (
            <ActivityIndicator size="small" color={C.rose} style={{ marginVertical: 12 }} />
          ) : (
            <Btn title="Sign In" icon="log-in" onPress={handleLogin} />
          )}

          <View style={{ marginTop: 14, flexDirection: "row", justifyContent: "center", gap: 6 }}>
            <T color={C.muted}>Don't have an account yet?</T>
            <Pressable onPress={() => router.push("/signup" as any)}>
              <T bold color={C.rose}>Join here</T>
            </Pressable>
          </View>
        </Card>

        <Card style={{ backgroundColor: C.blush, borderColor: C.soft, alignItems: "center" }}>
          <T size={13} color={C.brown} style={{ marginBottom: 8 }}>
            Just exploring the community?
          </T>
          <Btn small outline title="Continue as Guest" onPress={() => router.replace("/(tabs)")} />
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}

