import React, { useState } from "react";
import { View, Pressable, Modal } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";
import { realTalkReels, RealTalkReel } from "../../src/data";
import { useApp } from "../../src/store";
import { T, Card, Btn, Chip, Pill, Title, Screen, notify, IconName } from "../../src/ui";

const categories = ["All", "Code Hacks", "Career Bag", "Mindset", "Design & AI"] as const;

export default function Reels() {
  const a = useApp();
  const [activeCat, setActiveCat] = useState<typeof categories[number]>("All");
  const [activeReel, setActiveReel] = useState<RealTalkReel | null>(null);

  const filteredReels = realTalkReels.filter(
    (r) => activeCat === "All" || r.category === activeCat
  );

  return (
    <Screen>
      <Title
        title="Real Talk Reels 🎬"
        subtitle="Fun, bite-sized & educative ideas to teach tech in a relatable way"
      />

      <Card style={{ paddingVertical: 10 }}>
        <T size={12} bold color={C.brown} style={{ marginBottom: 8 }}>Filter Topics</T>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              active={activeCat === c}
              onPress={() => setActiveCat(c)}
            />
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
        {filteredReels.map((r) => {
          const isLiked = a.likedReels.includes(r.id);
          const likesCount = r.likesCount + (isLiked ? 1 : 0);
          return (
            <Pressable
              key={r.id}
              onPress={() => setActiveReel(r)}
              style={({ pressed }) => ({
                flexGrow: 1,
                flexBasis: "46%",
                minHeight: 250,
                borderRadius: 22,
                padding: 16,
                backgroundColor: r.color,
                justifyContent: "space-between",
                opacity: pressed ? 0.9 : 1,
                borderWidth: 1.5,
                borderColor: r.accent + "50",
                shadowColor: C.brown,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
              })}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name={r.icon as IconName} size={22} color={r.accent} />
                </View>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.65)",
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Feather name="play" size={10} color={C.white} />
                  <T size={10} bold color={C.white}>{r.duration}</T>
                </View>
              </View>

              <View style={{ gap: 6, marginVertical: 10 }}>
                <Pill>{r.category}</Pill>
                <T bold size={15} color={C.brown} style={{ lineHeight: 20 }}>
                  {r.title}
                </T>
                <T size={12} color={C.brown} bold>
                  by {r.creator} <T size={11} color={C.muted} bold={false}>@{r.handle}</T>
                </T>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderTopColor: "rgba(0,0,0,0.06)",
                  paddingTop: 8,
                }}
              >
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    a.toggleLikeReel(r.id);
                  }}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Feather
                    name={isLiked ? "heart" : "heart"}
                    size={16}
                    color={isLiked ? C.rose : C.brown}
                  />
                  <T size={11} bold color={C.brown}>{likesCount}</T>
                </Pressable>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <T size={11} bold color={r.accent}>Tap to learn</T>
                  <Feather name="chevron-right" size={14} color={r.accent} />
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Modal / Sheet for Real Talk Reel interactive lesson */}
      <Modal
        visible={!!activeReel}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveReel(null)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: C.white,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: 22,
              maxHeight: "85%",
            }}
          >
            {activeReel && (
              <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Pill>{activeReel.category}</Pill>
                    <T size={12} color={C.muted}>{activeReel.duration} Lesson</T>
                  </View>
                  <Pressable
                    onPress={() => setActiveReel(null)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: C.blush,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="x" size={18} color={C.brown} />
                  </Pressable>
                </View>

                <T bold size={20} color={C.brown}>{activeReel.title}</T>
                <T size={13} color={C.muted} style={{ marginBottom: 16 }}>
                  Shared by {activeReel.creator} (@{activeReel.handle})
                </T>

                <Card style={{ backgroundColor: activeReel.color, borderColor: activeReel.accent + "40" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Feather name="book-open" size={16} color={C.brown} />
                    <T bold size={14} color={C.brown}>The Real Talk Analogy</T>
                  </View>
                  <T size={14} color={C.text} style={{ lineHeight: 21 }}>
                    {activeReel.lesson}
                  </T>
                </Card>

                <Card style={{ backgroundColor: "#F7F3FF", borderColor: "#D5C6F0" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Feather name="smile" size={16} color="#7E52A0" />
                    <T bold size={14} color="#7E52A0">Did You Know?</T>
                  </View>
                  <T size={13} color={C.text} style={{ lineHeight: 19 }}>
                    {activeReel.funFact}
                  </T>
                </Card>

                <Card style={{ backgroundColor: "#EBF8F2", borderColor: "#A8D8C0" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Feather name="zap" size={16} color="#2D8259" />
                    <T bold size={14} color="#2D8259">Action Step to Take Today</T>
                  </View>
                  <T size={13} color={C.text} style={{ lineHeight: 19 }}>
                    {activeReel.actionTip}
                  </T>
                </Card>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Btn
                      title={a.likedReels.includes(activeReel.id) ? "Liked 💖" : "Like Reel"}
                      icon="heart"
                      onPress={() => a.toggleLikeReel(activeReel.id)}
                    />
                  </View>
                  <Btn
                    outline
                    title="Ask My Gurl Bot about this"
                    icon="message-circle"
                    onPress={() => {
                      const topic = activeReel.title;
                      setActiveReel(null);
                      router.push("/bot" as any);
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Card style={{ backgroundColor: C.blush, borderColor: C.soft }}>
        <T bold size={16} color={C.brown}>Got a fun tech lesson or career hack to teach?</T>
        <T color={C.muted} style={{ marginTop: 4, marginBottom: 12 }}>
          Teach other women how to code, design, or pitch in 60 seconds or less! Share your thoughts in our community feed.
        </T>
        <Btn title="Share a tech tip in Community" icon="plus" onPress={() => router.push("/create")} />
      </Card>
    </Screen>
  );
}
