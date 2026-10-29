import React, { useState } from "react";
import { View, Pressable, Switch } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { basePosts } from "../src/data";
import { T, Card, Btn, Chip, Field, Title, Screen, notify } from "../src/ui";

const growthTags = ["Code Breakthrough", "First Job / Internship", "Product Shipped", "Imposter Win", "Daily Practice"];

export default function Journal() {
  const a = useApp();
  const [tab, setTab] = useState<"my" | "community">("my");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTag, setSelectedTag] = useState("Code Breakthrough");
  const [shareWithCommunity, setShareWithCommunity] = useState(true);

  const save = () => {
    if (!body.trim()) return notify("Please write a reflection or win before saving.");
    const entryTitle = title.trim() || `Tech Win: ${selectedTag}`;
    a.addJournal(entryTitle, body.trim(), selectedTag, shareWithCommunity);
    setTitle("");
    setBody("");
    if (shareWithCommunity) {
      notify("🎉 Your growth story has been saved and shared with the community!");
      setTab("community");
    } else {
      notify("🔒 Your private growth entry has been saved safely on your device.");
    }
  };

  // Shared stories from user + base posts that are growth-oriented
  const sharedCommunityStories = [
    ...a.journal.filter((j) => j.shared).map((j) => ({
      id: j.id,
      author: a.profile.name,
      role: a.profile.role,
      date: j.date,
      title: j.title,
      body: j.body,
      tag: j.tag,
      mine: true,
    })),
    {
      id: "cs1",
      author: "Zainab T.",
      role: "Junior Data Analyst",
      date: "Yesterday",
      title: "Passed my SQL Assessment after failing twice!",
      body: "I was so intimidated by nested JOINs and subqueries. After practicing for 2 weeks on LeetCode and asking for help in our Tech Sisters group, I just got the email that I passed the technical round! Never give up sisters. 💫",
      tag: "Code Breakthrough",
      mine: false,
    },
    {
      id: "cs2",
      author: "Fatima B.",
      role: "Aspiring UI Designer",
      date: "3 days ago",
      title: "Completed my first Figma mobile wireframe",
      body: "From knowing zero design concepts to building a full 5-screen prototype for a Sierra Leone farmer marketplace. The mentorship office hours gave me the exact push I needed.",
      tag: "Product Shipped",
      mine: false,
    },
    {
      id: "cs3",
      author: "Mariam J.",
      role: "Founder, AgroFemme",
      date: "Last week",
      title: "Pitched to our first angel investor without trembling",
      body: "Public speaking used to terrify me. Today I delivered our 3-minute pitch deck cleanly. Big shoutout to That's My Girl Bot for the pitch clinic questions!",
      tag: "First Job / Internship",
      mine: false,
    },
  ];

  return (
    <Screen>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 14 }}>
        <Pressable
          onPress={() => setTab("my")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            backgroundColor: tab === "my" ? C.rose : C.white,
            borderWidth: 1,
            borderColor: tab === "my" ? C.rose : C.border,
          }}
        >
          <T bold color={tab === "my" ? C.white : C.brown}>My Journal ({a.journal.length})</T>
        </Pressable>
        <Pressable
          onPress={() => setTab("community")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            backgroundColor: tab === "community" ? C.rose : C.white,
            borderWidth: 1,
            borderColor: tab === "community" ? C.rose : C.border,
          }}
        >
          <T bold color={tab === "community" ? C.white : C.brown}>Community Wins ✨</T>
        </Pressable>
      </View>

      {tab === "my" ? (
        <>
          <Card>
            <T size={18} bold color={C.brown}>Log a Growth Breakthrough ✍️</T>
            <T size={13} color={C.muted} style={{ marginTop: 2, marginBottom: 12 }}>
              Track what you learned, challenges you conquered, and milestones reached.
            </T>

            <Field
              label="Milestone Title"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Solved that stubborn bug, Landed interview..."
            />

            <T bold size={13} style={{ marginBottom: 6 }}>Category Tag</T>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {growthTags.map((gt) => (
                <Chip
                  key={gt}
                  label={gt}
                  active={selectedTag === gt}
                  onPress={() => setSelectedTag(gt)}
                />
              ))}
            </View>

            <Field
              label="Your Reflection or Story"
              value={body}
              onChangeText={setBody}
              placeholder="What did you learn? How did it feel? What is your next goal?"
              multiline
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: C.blush,
                padding: 12,
                borderRadius: 12,
                marginBottom: 16,
              }}
            >
              <View style={{ flex: 1, paddingRight: 8 }}>
                <T bold size={13} color={C.brown}>Share with Community Feed</T>
                <T size={11} color={C.muted}>
                  Inspire and empower other women by sharing this win publicly in the community feed.
                </T>
              </View>
              <Switch
                value={shareWithCommunity}
                onValueChange={setShareWithCommunity}
                trackColor={{ false: C.border, true: C.rose }}
              />
            </View>

            <Btn title="Save Growth Entry" icon="check" onPress={save} />
          </Card>

          <T size={11} color={C.muted} style={{ marginBottom: 12 }}>
            🔒 Private entries remain stored safely on your device only.
          </T>

          <Title title="Your Journal Entries" />

          {a.journal.length === 0 ? (
            <Card style={{ alignItems: "center", paddingVertical: 24 }}>
              <Feather name="book-open" size={32} color={C.muted} />
              <T bold size={15} color={C.brown} style={{ marginTop: 8 }}>Your journal is waiting</T>
              <T size={12} color={C.muted} style={{ textAlign: "center", marginTop: 4 }}>
                Write your first tech reflection or celebration above!
              </T>
            </Card>
          ) : null}

          {a.journal.map((j) => (
            <Card key={j.id}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <View style={{ backgroundColor: C.blush, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                      <T size={10} bold color={C.rose}>{j.tag || "Growth Win"}</T>
                    </View>
                    {j.shared && (
                      <View style={{ backgroundColor: "#E2F0D9", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
                        <T size={10} bold color="#5C996B">Shared in Community</T>
                      </View>
                    )}
                  </View>
                  <T bold size={16} color={C.brown}>{j.title}</T>
                  <T size={12} color={C.muted}>{j.date}</T>
                </View>
                <Btn small outline title="Delete" onPress={() => a.deleteJournal(j.id)} />
              </View>
              <T style={{ marginTop: 10, lineHeight: 20 }}>{j.body}</T>
            </Card>
          ))}
        </>
      ) : (
        <>
          <Title
            title="Women Rising in Tech 💫"
            subtitle="Real growth stories and milestones shared by our sisters"
          />

          {sharedCommunityStories.map((story) => (
            <Card key={story.id}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: C.rose,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <T bold color={C.white} size={14}>
                      {story.author[0]}
                    </T>
                  </View>
                  <View>
                    <T bold size={14} color={C.brown}>{story.author}</T>
                    <T size={11} color={C.muted}>{story.role} · {story.date}</T>
                  </View>
                </View>
                <View style={{ backgroundColor: C.blush, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                  <T size={10} bold color={C.rose}>{story.tag}</T>
                </View>
              </View>

              <T bold size={15} color={C.brown} style={{ marginVertical: 4 }}>
                {story.title}
              </T>
              <T size={13} color={C.text} style={{ lineHeight: 19 }}>
                {story.body}
              </T>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12,
                  borderTopWidth: 1,
                  borderTopColor: C.border,
                  paddingTop: 8,
                }}
              >
                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                  <Feather name="heart" size={16} color={C.rose} />
                  <T size={12} color={C.muted}>Cheered on by sisters</T>
                </View>
                <Btn
                  small
                  outline
                  title="Cheer Sister 👏"
                  onPress={() => notify(`You cheered on ${story.author}'s tech growth! 💖`)}
                />
              </View>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}
