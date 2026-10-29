import { ScrollView, View, Pressable, Linking, Image } from "react-native";
import { C, T, Card } from "../src/ui";
import { Feather } from "@expo/vector-icons";

const APK_URL =
  "https://expo.dev/artifacts/eas/CspfIifQmKJaAU2bQwENX9hWs1jkq4UAHBsLtBEPn1s.apk";

const FEATURES = [
  { icon: "users", label: "Community Feed" },
  { icon: "book-open", label: "Growth Journal" },
  { icon: "trending-up", label: "Growth Tracker" },
  { icon: "message-circle", label: "AI Chatbot" },
  { icon: "briefcase", label: "Opportunities Hub" },
  { icon: "film", label: "Real Talk Reels" },
];

const STEPS = [
  'Tap "Download APK" below',
  'On your phone, open the downloaded file',
  'Allow "Install unknown apps" if prompted',
  "Tap Install — you're in! 💗",
];

export default function DownloadPage() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Hero */}
      <View
        style={{
          backgroundColor: C.primary,
          alignItems: "center",
          paddingTop: 64,
          paddingBottom: 48,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <T style={{ fontSize: 48 }}>💗</T>
        </View>
        <T
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: "#fff",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          That's My Gurl
        </T>
        <T
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: 320,
          }}
        >
          The community app for women who are growing, building, and finding
          their people.
        </T>
      </View>

      <View style={{ padding: 24, gap: 24 }}>
        {/* Download Button */}
        <Pressable
          onPress={() => Linking.openURL(APK_URL)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#b5446e" : C.primary,
            borderRadius: 16,
            paddingVertical: 18,
            paddingHorizontal: 32,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
            shadowColor: C.primary,
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 6,
          })}
        >
          <Feather name="download" size={22} color="#fff" />
          <T style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            Download APK (Android)
          </T>
        </Pressable>

        <T
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 12,
            marginTop: -12,
          }}
        >
          Version 1.0.0 · Built with Expo SDK 57
        </T>

        {/* Install Steps */}
        <Card>
          <T
            style={{ fontWeight: "700", fontSize: 16, marginBottom: 16, color: C.text }}
          >
            How to Install
          </T>
          {STEPS.map((step, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: C.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <T style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
                  {i + 1}
                </T>
              </View>
              <T style={{ flex: 1, color: C.text, lineHeight: 22 }}>{step}</T>
            </View>
          ))}
        </Card>

        {/* Features Grid */}
        <Card>
          <T
            style={{ fontWeight: "700", fontSize: 16, marginBottom: 16, color: C.text }}
          >
            What's Inside
          </T>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {FEATURES.map((f) => (
              <View
                key={f.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: C.soft ?? "#fce4ec",
                  borderRadius: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Feather name={f.icon as any} size={14} color={C.primary} />
                <T style={{ fontSize: 13, color: C.primary, fontWeight: "600" }}>
                  {f.label}
                </T>
              </View>
            ))}
          </View>
        </Card>

        {/* Note */}
        <Card>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
            <Feather name="info" size={18} color={C.muted} style={{ marginTop: 2 }} />
            <T style={{ flex: 1, color: C.muted, fontSize: 13, lineHeight: 20 }}>
              This is an Android APK (sideload build). iOS support coming soon. The
              app works offline — your data is saved on your device.
            </T>
          </View>
        </Card>

        {/* Footer */}
        <T
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 12,
            paddingBottom: 32,
          }}
        >
          Made with 💗 for women who hustle
        </T>
      </View>
    </ScrollView>
  );
}

