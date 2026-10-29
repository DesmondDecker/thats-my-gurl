import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";
import { useApp } from "../../src/store";
import { T, Card, Btn, Field, Hero, Avatar, Screen, IconName, Pill, notify } from "../../src/ui";

const menu: { label: string; icon: IconName; to: string }[] = [
  { label: "Growth Tracker (Individual & Startup)", icon: "trending-up", to: "/growth" },
  { label: "Check-in & Opportunities", icon: "briefcase", to: "/opportunities" },
  { label: "That's My Girl Bot", icon: "message-circle", to: "/bot" },
  { label: "Tech Growth Journal", icon: "book-open", to: "/journal" },
  { label: "Support Corner & Referrals", icon: "award", to: "/learn" },
  { label: "Mind check", icon: "heart", to: "/mood" },
  { label: "Events & workshops", icon: "calendar", to: "/events" },
  { label: "Safety & privacy", icon: "shield", to: "/safety" },
];

export default function Profile() {
  const a = useApp();
  const [edit, setEdit] = useState(false);
  const { name, role, bio } = a.profile;
  const user = a.user;

  const handleLogout = () => {
    a.logout();
    notify("You have been signed out.");
  };

  return (
    <Screen>
      <Hero>
        <View style={{ alignItems: "center" }}>
          <Avatar name={name} size={84} />
          <T size={22} bold color={C.brown} style={{ marginTop: 10 }}>{name}</T>
          <T color={C.brown}>{role}</T>
          <T color={C.brown} style={{ textAlign: "center", marginVertical: 8 }}>{bio}</T>
          <View style={{ flexDirection: "row", gap: 20, marginVertical: 10 }}>
            {[
              [a.individualGrowth.streak + " 🔥", "Streak"],
              [a.individualGrowth.skills.length, "Skills"],
              [a.posts.length, "Posts"],
              [a.savedOpportunities.length, "Saved Ops"],
            ].map(([n, l]) => (
              <View key={l as string} style={{ alignItems: "center" }}>
                <T bold>{n}</T>
                <T size={11} color={C.muted}>{l}</T>
              </View>
            ))}
          </View>
          <Btn title={edit ? "Done" : "Edit profile"} icon="edit-2" onPress={() => setEdit(!edit)} />
        </View>
      </Hero>

      {/* Account & MongoDB Auth Card */}
      <Card style={{ backgroundColor: user ? "#FDF8FA" : C.blush, borderColor: user ? C.rose : C.border }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Feather name={user ? "user-check" : "user"} size={16} color={C.rose} />
            <T bold size={14} color={C.brown}>
              {user ? "Verified Account" : "Guest Mode"}
            </T>
          </View>
          {user && (
            <View style={{ backgroundColor: user.source === "mongodb" ? "#E2F0D9" : C.soft, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
              <T size={10} bold color={user.source === "mongodb" ? "#2D8259" : C.darkRose}>
                {user.source === "mongodb" ? "● MongoDB Synced" : "● Local Session"}
              </T>
            </View>
          )}
        </View>

        <T size={13} color={C.muted} style={{ marginBottom: 10 }}>
          {user
            ? `Signed in as ${user.email}. Your progress and profile are active.`
            : "You are currently in guest mode. Sign in to link your account with MongoDB and sync your progress across devices."}
        </T>

        {user ? (
          <Btn small outline title="Sign Out" icon="log-out" onPress={handleLogout} />
        ) : (
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Btn small title="Sign In" icon="log-in" onPress={() => router.push("/login" as any)} />
            <Btn small outline title="Create Account" icon="user-plus" onPress={() => router.push("/signup" as any)} />
          </View>
        )}
      </Card>

      {edit ? (
        <Card>
          <Field label="Display name" value={name} onChangeText={(v) => a.setProfile({ name: v })} />
          <Field label="Role or interest" value={role} onChangeText={(v) => a.setProfile({ role: v })} />
          <Field label="About you" value={bio} onChangeText={(v) => a.setProfile({ bio: v })} multiline />
        </Card>
      ) : null}

      <Card style={{ paddingVertical: 4 }}>
        {menu.map((m, i) => (
          <Pressable key={m.label} onPress={() => router.push(m.to as any)} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderColor: C.border }}>
            <Feather name={m.icon} size={19} color={C.rose} />
            <View style={{ flex: 1 }}><T>{m.label}</T></View>
            <Feather name="chevron-right" size={18} color={C.muted} />
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}
