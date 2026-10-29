import { Tabs, router } from "expo-router";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";

const icon = (name: React.ComponentProps<typeof Feather>["name"]) => ({ color, size }: { color: any; size: number }) => (
  <Feather name={name} color={color} size={size} />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: C.rose,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { backgroundColor: C.white, borderTopColor: C.border },
        headerStyle: { backgroundColor: C.cream },
        headerShadowVisible: false,
        headerTitleStyle: { color: C.brown, fontWeight: "700" },
        sceneStyle: { backgroundColor: C.cream },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: icon("home"),
          headerRight: () => (
            <Pressable onPress={() => router.push("/create")} style={{ marginRight: 16 }} accessibilityLabel="Create a post">
              <Feather name="plus-circle" size={24} color={C.rose} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen name="reels" options={{ title: "Reels", tabBarIcon: icon("play-circle") }} />
      <Tabs.Screen name="chat" options={{ title: "Chat", tabBarIcon: icon("message-circle") }} />
      <Tabs.Screen name="groups" options={{ title: "Groups", tabBarIcon: icon("users") }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: icon("user") }} />
    </Tabs>
  );
}
