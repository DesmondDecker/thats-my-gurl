import { useRef, useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { C } from "../../src/theme";
import { people } from "../../src/data";
import { useApp } from "../../src/store";
import { T, Btn } from "../../src/ui";

export default function Conversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = useApp();
  const person = people.find((p) => p.id === id);
  const [text, setText] = useState("");
  const list = useRef<FlatList>(null);
  const msgs = a.messages[id] || [];

  const send = () => {
    if (!text.trim()) return;
    a.addMessage(id, text.trim());
    setText("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={90}>
      <Stack.Screen options={{ title: person?.name || "Chat" }} />
      <FlatList
        ref={list}
        data={msgs}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.mine ? "flex-end" : "flex-start", backgroundColor: item.mine ? C.rose : C.blush, borderRadius: 16, padding: 12, maxWidth: "85%" }}>
            <T color={item.mine ? C.white : C.brown}>{item.text}</T>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", gap: 8, padding: 12, backgroundColor: C.white, borderTopWidth: 1, borderColor: C.border }}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={send}
          placeholder="Type a message..."
          placeholderTextColor={C.muted}
          style={[{ flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, color: C.text }, Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null]}
        />
        <Btn title="Send" small onPress={send} />
      </View>
    </KeyboardAvoidingView>
  );
}
