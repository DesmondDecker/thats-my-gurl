import React from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";
import { events, basePosts, opportunities, realTalkReels } from "../../src/data";
import { useApp } from "../../src/store";
import { Post } from "../../src/Post";
import { T, Card, Hero, Pill, Title, Screen, IconName, Btn } from "../../src/ui";

const quickActions: { label: string; icon: IconName; to: string; badge?: string }[] = [
  { label: "Opportunities", icon: "briefcase", to: "/opportunities", badge: "NEW" },
  { label: "Growth Tracker", icon: "trending-up", to: "/growth", badge: "PRO" },
  { label: "My Gurl Bot", icon: "message-circle", to: "/bot" },
  { label: "Support Corner", icon: "award", to: "/learn" },
  { label: "Tech Journal", icon: "book-open", to: "/journal" },
  { label: "Real Talk Reels", icon: "play-circle", to: "/reels" },
];

export default function Home() {
  const a = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const ev = events[0];
  const featuredOp = opportunities[0];
  const featuredReel = realTalkReels[0];

  return (
    <Screen>
      <Hero>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <T color={C.muted}>{greeting},</T>
            <T size={24} bold color={C.brown}>{a.user ? a.user.name : a.profile.name}</T>
            {!a.user ? (
              <Pressable onPress={() => router.push("/login" as any)} style={{ marginTop: 4 }}>
                <T size={12} color={C.rose} bold>✨ Sign in / Join to sync with MongoDB →</T>
              </Pressable>
            ) : (
              <T size={12} color={C.muted} style={{ marginTop: 2 }}>
                Logged in ({a.user.email})
              </T>
            )}
            <T color={C.brown} style={{ marginTop: 6, fontStyle: "italic" }}>
              "Learn it. Build it. Lead it. Find your people."
            </T>
          </View>
          <Pressable
            onPress={() => router.push("/growth")}
            style={{
              backgroundColor: C.white,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: C.rose,
              alignItems: "center",
            }}
          >
            <T size={16}>🔥</T>
            <T size={11} bold color={C.rose}>{a.individualGrowth.streak} Days</T>
            <T size={9} color={C.muted}>Streak</T>
          </Pressable>
        </View>
      </Hero>

      {/* Quick Action Hub */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {quickActions.map((q) => (
          <Pressable
            key={q.label}
            onPress={() => router.push(q.to as any)}
            style={{
              flexBasis: "30%",
              flexGrow: 1,
              alignItems: "center",
              gap: 6,
              backgroundColor: C.white,
              paddingVertical: 14,
              paddingHorizontal: 6,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: C.border,
            }}
          >
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: C.blush,
                borderWidth: 1,
                borderColor: C.soft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name={q.icon} size={22} color={C.rose} />
            </View>
            <T size={12} bold color={C.brown} style={{ textAlign: "center" }}>
              {q.label}
            </T>
            {q.badge && (
              <View style={{ backgroundColor: C.rose, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 }}>
                <T size={9} bold color={C.white}>{q.badge}</T>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Featured Opportunity Banner */}
      <Card style={{ backgroundColor: "#FFF7F9", borderColor: C.rose, borderWidth: 1.5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Pill>{featuredOp.kind}</Pill>
            <T size={11} bold color={C.rose}>★ VETTED OPPORTUNITY</T>
          </View>
          <T size={11} color={C.muted}>Deadline: {featuredOp.deadline}</T>
        </View>
        <T bold size={16} color={C.brown}>{featuredOp.role}</T>
        <T size={13} color={C.rose} bold style={{ marginTop: 2 }}>{featuredOp.org}</T>
        <T size={12} color={C.text} style={{ marginVertical: 6 }} numberOfLines={2}>
          {featuredOp.desc}
        </T>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <T size={12} bold color={C.brown}>{featuredOp.stipend}</T>
          <Btn small title="View & Apply" icon="external-link" onPress={() => router.push("/opportunities")} />
        </View>
      </Card>

      {/* Featured Real Talk Reel Teaser */}
      <Pressable onPress={() => router.push("/reels")}>
        <Card style={{ backgroundColor: featuredReel.color, borderColor: featuredReel.accent + "40" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Pill>{featuredReel.category}</Pill>
              <T size={11} bold color={C.brown}>REAL TALK REEL</T>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Feather name="play-circle" size={16} color={C.brown} />
              <T size={11} bold color={C.brown}>{featuredReel.duration}</T>
            </View>
          </View>
          <T bold size={16} color={C.brown} style={{ marginVertical: 6 }}>
            {featuredReel.title}
          </T>
          <T size={12} color={C.text} numberOfLines={2}>
            {featuredReel.lesson}
          </T>
        </Card>
      </Pressable>

      {/* Upcoming Event */}
      <Title title="Upcoming Community Session" />
      <Pressable onPress={() => router.push("/events")}>
        <Card>
          <Pill>{ev.type}</Pill>
          <T bold size={16} style={{ marginTop: 6 }}>{ev.title}</T>
          <T size={12} color={C.muted}>{ev.day} {ev.month} · {ev.when}</T>
        </Card>
      </Pressable>

      {/* Community Feed */}
      <Title title="Community & Growth Feed" subtitle="Encouragement, tech milestones, and everyday wins" />
      {[...a.posts, ...basePosts].map((p) => <Post key={p.id} p={p} />)}
    </Screen>
  );
}
