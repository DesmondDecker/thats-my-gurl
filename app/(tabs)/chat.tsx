import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";
import { people } from "../../src/data";
import { useApp } from "../../src/store";
import { T, Avatar, Card, Screen, Pill, Title } from "../../src/ui";

export default function Chats() {
  const a = useApp();
  const lastBotMsg = a.botMessages.slice(-1)[0];

  return (
    <Screen>
      <Title title="Messages & AI Mentorship" subtitle="Connect with That's My Girl Bot and sisters in the community" />

      {/* Featured AI Mentor Bot Card */}
      <Pressable onPress={() => router.push("/bot" as any)}>
        <Card style={{ backgroundColor: "#FFF7F9", borderColor: C.rose, borderWidth: 1.5 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: C.rose,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: C.soft,
              }}
            >
              <T size={24}>👑</T>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <T bold size={16} color={C.brown}>That's My Girl Bot</T>
                <View style={{ backgroundColor: "#2D8259", width: 8, height: 8, borderRadius: 4 }} />
                <Pill>AI Mentor</Pill>
              </View>
              <T size={13} color={C.darkRose} numberOfLines={1}>
                {lastBotMsg ? (lastBotMsg.mine ? "You: " : "Bot: ") + lastBotMsg.text.replace(/\n/g, " ") : "Ask about tech paths, pitch, or advice ✨"}
              </T>
            </View>
            <Feather name="chevron-right" size={20} color={C.rose} />
          </View>
        </Card>
      </Pressable>

      <Title title="Sisterhood Direct Chats" />

      {people.map((p) => {
        const last = (a.messages[p.id] || []).slice(-1)[0];
        return (
          <Pressable key={p.id} onPress={() => router.push(`/chat/${p.id}`)}>
            <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Avatar name={p.name} />
              <View style={{ flex: 1 }}>
                <T bold>{p.name}</T>
                <T size={13} color={C.muted} numberOfLines={1}>
                  {last ? (last.mine ? "You: " : "") + last.text : "Say hi 👋"}
                </T>
              </View>
              <Feather name="chevron-right" size={18} color={C.muted} />
            </Card>
          </Pressable>
        );
      })}
      <T size={11} color={C.muted}>
        Conversations are stored on this device.
      </T>
    </Screen>
  );
}
