import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Card, Btn, Chip, Field, Title, Screen, notify } from "../src/ui";

const moods = ["😊 Great", "🙂 Okay", "😟 Anxious", "😔 Low", "🥺 Overwhelmed"];

export default function Mood() {
  const a = useApp();
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const save = () => {
    if (!mood) return notify("Choose a mood first.");
    a.addMood(mood, note.trim());
    setMood("");
    setNote("");
  };
  return (
    <Screen>
      <Card>
        <T size={17} bold color={C.brown}>How are you, really?</T>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 16 }}>
          {moods.map((m) => <Chip key={m} label={m} active={mood === m} onPress={() => setMood(m)} />)}
        </View>
        <Field label="A note for yourself (optional)" value={note} onChangeText={setNote} placeholder="A few words..." multiline />
        <Btn title="Save check-in" onPress={save} />
      </Card>
      <T size={12} color={C.muted} style={{ marginBottom: 6 }}>
        This is a reflection tool, not diagnosis or treatment. If you're struggling or feel unsafe, please contact a local health service or emergency number, or reach out to someone you trust.
      </T>
      <Btn small outline title="Safety & support info" onPress={() => router.push("/safety")} />
      {a.moods.length ? <Title title="Recent check-ins" /> : null}
      {a.moods.map((m) => (
        <Card key={m.id}>
          <T bold>{m.mood}</T>
          <T size={12} color={C.muted}>{m.date}</T>
          {m.note ? <T style={{ marginTop: 4 }}>{m.note}</T> : null}
        </Card>
      ))}
    </Screen>
  );
}
