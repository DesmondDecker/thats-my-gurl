import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "./theme";
import { Post as PostType } from "./data";
import { useApp } from "./store";
import { T, Card, Pill, Avatar } from "./ui";

export function Post({ p }: { p: PostType }) {
  const a = useApp();
  const liked = a.likes.includes(p.id);
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Avatar name={p.author} />
        <View style={{ flex: 1 }}>
          <T bold>{p.author}</T>
          <T size={12} color={C.muted}>{p.role} · {p.time}</T>
        </View>
        <Pill>{p.tag}</Pill>
      </View>
      <T>{p.text}</T>
      <View style={{ flexDirection: "row", gap: 22, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderColor: C.border }}>
        <Pressable onPress={() => a.toggleLike(p.id)} style={{ flexDirection: "row", gap: 6, alignItems: "center" }} accessibilityLabel="Like">
          <Feather name="heart" color={liked ? C.rose : C.muted} size={17} />
          <T color={C.muted}>{p.likes + (liked ? 1 : 0)}</T>
        </Pressable>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Feather name="message-circle" color={C.muted} size={17} />
          <T color={C.muted}>{p.comments}</T>
        </View>
      </View>
    </Card>
  );
}
