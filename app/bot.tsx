import React, { useRef, useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Btn, Card } from "../src/ui";

const promptSuggestions = [
  "✨ What tech path fits me?",
  "💼 Review my 30s elevator pitch",
  "🎯 How do I land my first internship?",
  "💖 Hype me up! Feeling imposter syndrome",
  "💡 Explain APIs in plain English",
  "🚀 How to get funding as a female founder",
];

export default function ThatMyGirlBot() {
  const a = useApp();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<FlatList>(null);

  const getBotResponse = (prompt: string): string => {
    const q = prompt.toLowerCase();

    if (q.includes("tech path") || q.includes("start") || q.includes("where do i begin") || q.includes("career")) {
      return (
        "Here's my golden rule for choosing your path, sis:\n\n" +
        "1. Love visuals & user flow? 🎨 Start with **UI/UX Design** (Figma) or **Frontend Development** (HTML/CSS & React).\n" +
        "2. Love problem-solving, numbers, or finding insights? 📊 Start with **Data Analytics** (SQL, Excel & Python basics).\n" +
        "3. Love organizing, talking to users & building products? 💡 Explore **Tech Product Management** or **No-Code Building**.\n\n" +
        "Check our **Support Corner** in the app for free certified tracks with ALX Africa & SheCodes!"
      );
    }

    if (q.includes("pitch") || q.includes("elevator") || q.includes("founder") || q.includes("startup")) {
      return (
        "Here is a winning 30-Second Elevator Pitch formula for female founders and innovators:\n\n" +
        "1. **The Hook & Problem**: 'Did you know that over 70% of female artisans in West Africa lack direct market access?'\n" +
        "2. **Your Solution**: 'We built That's My Gurl — a mobile platform that connects them directly to buyers and digital payment rails.'\n" +
        "3. **Your Traction & Ask**: 'In 6 months, we onboarded 500 users with 20% month-over-month growth. We are seeking $10,000 grant funding to scale our pilot.'\n\n" +
        "Keep it concise, confident, and focus on the impact! Want to practice your version?"
      );
    }

    if (q.includes("internship") || q.includes("job") || q.includes("hire") || q.includes("resume") || q.includes("cv")) {
      return (
        "Landing your first tech role comes down to proof over perfection:\n\n" +
        "• **Build 2 solid showcase projects** instead of 10 half-done tutorials. Host them live with a clean GitHub README.\n" +
        "• **Tailor your CV**: Highlight results (e.g., 'Engineered responsive dashboard reducing load time by 30%') rather than just listing course names.\n" +
        "• **Network in public**: Share what you build on LinkedIn and in our community feed. Over 60% of tech hires happen via referrals!\n\n" +
        "Head over to our **Opportunities** tab right now — Orange Digital Center and AWIT have open applications!"
      );
    }

    if (q.includes("imposter") || q.includes("hype") || q.includes("confidence") || q.includes("belong") || q.includes("afraid")) {
      return (
        "Listen to me closely: THAT'S MY GIRL! 👑\n\n" +
        "Imposter syndrome is just proof that you are stretching beyond your comfort zone into greatness. No senior engineer has all the answers — they just learned to get comfortable with debugging and asking questions.\n\n" +
        "You belong in tech. Your perspective, your resilience, and your ambition are needed here. Take a breath, write down 3 things you know today that you didn't know 6 months ago, and keep building. I've got your back!"
      );
    }

    if (q.includes("api") || q.includes("explain")) {
      return (
        "Think of an API (Application Programming Interface) like a restaurant waiter! 🍽️\n\n" +
        "1. You are the customer (the App or Website).\n" +
        "2. The kitchen is the database (where the recipes and food data are kept).\n" +
        "3. The waiter is the API! You give the waiter your order ('GET /user/profile'), the waiter goes to the kitchen, gets your data, and brings it back to your table in a neat plate (JSON format)!\n\n" +
        "Check out our Real Talk Reel on APIs for more fun analogies!"
      );
    }

    if (q.includes("salary") || q.includes("money") || q.includes("negotiate") || q.includes("pay")) {
      return (
        "Negotiating tips from your sister in tech: 💼\n\n" +
        "• Never apologize for asking for fair compensation.\n" +
        "• Benchmark local and remote market rates on Levels.fyi or Glassdoor.\n" +
        "• Give a range: 'Based on market benchmarks for this tech stack, I am aiming for between $800 and $1,200/month.'\n" +
        "• If salary is fixed, negotiate benefits: equipment stipends, internet data allowances, or flexible working hours!"
      );
    }

    // Default friendly response
    return (
      `I love that you're asking about that! ✨\n\n` +
      `As women in tech, every small question helps us demystify the industry and take control of our careers.\n\n` +
      `Here is my advice: Break down this challenge into one actionable step today. Whether it's practicing a code concept, polishing a project README, or reaching out to a mentor, consistency always beats intensity.\n\n` +
      `Feel free to ask me to review a resume sentence, explain a tech term, or brainstorm startup ideas!`
    );
  };

  const send = (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    a.addBotMessage(textToSend.trim(), true);
    if (!customText) setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(textToSend.trim());
      a.addBotMessage(response, false);
      setTyping(false);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.cream }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Bot Header Card */}
      <View
        style={{
          backgroundColor: C.white,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: C.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: C.rose,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <T size={20}>👑</T>
          </View>
          <View>
            <T bold size={16} color={C.brown}>That's My Girl Bot</T>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#2D8259" }} />
              <T size={12} color={C.muted}>24/7 AI Mentor & Cheerleader</T>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => a.resetBot()}
          style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: C.blush }}
        >
          <T size={11} bold color={C.darkRose}>Clear Chat</T>
        </Pressable>
      </View>

      {/* Suggested prompts carousel */}
      <View style={{ backgroundColor: C.white, paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: C.border }}>
        <T size={11} bold color={C.muted} style={{ marginBottom: 6 }}>Suggested Questions for My Gurl Bot:</T>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={promptSuggestions}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => send(item)}
              style={{
                backgroundColor: C.blush,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: C.soft,
              }}
            >
              <T size={12} color={C.darkRose} bold>{item}</T>
            </Pressable>
          )}
        />
      </View>

      {/* Messages List */}
      <FlatList
        ref={listRef}
        data={a.botMessages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.mine ? "flex-end" : "flex-start",
              backgroundColor: item.mine ? C.rose : C.white,
              borderRadius: 18,
              borderBottomRightRadius: item.mine ? 4 : 18,
              borderBottomLeftRadius: item.mine ? 18 : 4,
              padding: 14,
              maxWidth: "88%",
              borderWidth: item.mine ? 0 : 1,
              borderColor: C.border,
              shadowColor: C.brown,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
            }}
          >
            {!item.mine && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <T size={12} bold color={C.rose}>That's My Girl Bot 👑</T>
              </View>
            )}
            <T color={item.mine ? C.white : C.text} size={14} style={{ lineHeight: 21 }}>
              {item.text}
            </T>
          </View>
        )}
        ListFooterComponent={
          typing ? (
            <View style={{ alignSelf: "flex-start", backgroundColor: C.white, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: C.border }}>
              <T size={12} color={C.rose} bold>That's My Girl Bot is typing... 💭</T>
            </View>
          ) : null
        }
      />

      {/* Input Bar */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          padding: 12,
          backgroundColor: C.white,
          borderTopWidth: 1,
          borderColor: C.border,
          alignItems: "center",
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send()}
          placeholder="Ask about careers, code, pitch, or hype..."
          placeholderTextColor={C.muted}
          style={[
            {
              flex: 1,
              borderWidth: 1,
              borderColor: C.border,
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 10,
              color: C.text,
              backgroundColor: C.cream,
            },
            Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null,
          ]}
        />
        <Btn title="Ask" small icon="send" onPress={() => send()} />
      </View>
    </KeyboardAvoidingView>
  );
}

