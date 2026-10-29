import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Card, Btn, Chip, Field, Avatar, Screen, notify } from "../src/ui";

const tags = ["Community", "Career", "Wellbeing", "Learning"];

export default function Create() {
  const a = useApp();
  const [text, setText] = useState("");
  const [tag, setTag] = useState(tags[0]);
  const publish = () => {
    if (!text.trim()) return notify("Add a few words first.");
    a.addPost(text.trim(), tag);
    router.back();
  };
  return (
    <Screen>
      <Card>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <Avatar name={a.profile.name} />
          <T bold>{a.profile.name}</T>
        </View>
        <Field value={text} onChangeText={setText} placeholder="A win, a question, something you learned..." multiline />
        <T bold style={{ marginBottom: 8 }}>Topic</T>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {tags.map((t) => <Chip key={t} label={t} active={tag === t} onPress={() => setTag(t)} />)}
        </View>
        <Btn title="Publish post" icon="send" onPress={publish} />
      </Card>
      <T size={12} color={C.muted}>Be kind, protect other people's privacy, and share only what you're comfortable making public.</T>
    </Screen>
  );
}
