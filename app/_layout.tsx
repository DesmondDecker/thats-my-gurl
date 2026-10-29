import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../src/store";
import { C } from "../src/theme";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: C.cream },
          headerShadowVisible: false,
          headerTintColor: C.brown,
          headerTitleStyle: { color: C.brown, fontWeight: "700" },
          contentStyle: { backgroundColor: C.cream },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ title: "Share your story", presentation: "modal" }} />
        <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
        <Stack.Screen name="events" options={{ title: "Events & workshops" }} />
        <Stack.Screen name="learn" options={{ title: "Learn & grow" }} />
        <Stack.Screen name="mood" options={{ title: "Mind check" }} />
        <Stack.Screen name="journal" options={{ title: "My journal" }} />
        <Stack.Screen name="safety" options={{ title: "Safety & privacy" }} />
      </Stack>
    </AppProvider>
  );
}
