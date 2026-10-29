import React, { useState } from "react";
import { View, Pressable, Linking } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { supportSpaces, SupportSpace } from "../src/data";
import { T, Card, Hero, Btn, Pill, Title, Screen, notify, IconName } from "../src/ui";

export default function SupportAndLearn() {
  const [selectedSpace, setSelectedSpace] = useState<SupportSpace | null>(null);

  const handleOpenSpace = (space: SupportSpace) => {
    if (space.url.startsWith("http")) {
      Linking.openURL(space.url).catch(() => {
        notify(`Visit ${space.name} at: ${space.url}`);
      });
    }
  };

  return (
    <Screen>
      <Hero>
        <T size={20} bold color={C.brown}>Support Corner & Learning Referral</T>
        <T color={C.brown} style={{ marginTop: 6 }}>
          Curated learning platforms, 100% sponsored scholarships, and mentorship circles to unlock opportunities in tech.
        </T>
        <View style={{ marginTop: 12, flexDirection: "row", gap: 10 }}>
          <Btn small title="Explore open jobs" icon="briefcase" onPress={() => router.push("/opportunities")} />
          <Btn small outline title="Ask My Gurl Bot" icon="message-circle" onPress={() => router.push("/bot" as any)} />
        </View>
      </Hero>

      <Title title="Support Referral Directory" subtitle="Verified partner platforms offering tuition waivers & mentorship" />

      {supportSpaces.map((s) => (
        <Card key={s.id} style={{ borderColor: C.border }}>
          <View style={{ flexDirection: "row", gap: 14, alignItems: "flex-start" }}>
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
              <Feather name={s.icon as IconName} size={22} color={C.rose} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Pill>{s.kind}</Pill>
                <T size={11} bold color={C.darkRose}>{s.highlight}</T>
              </View>
              <T bold size={16} color={C.brown}>{s.name}</T>
              <T size={13} color={C.text} style={{ marginTop: 4, lineHeight: 18 }}>
                {s.desc}
              </T>

              <View
                style={{
                  backgroundColor: "#FDF5F7",
                  padding: 8,
                  borderRadius: 10,
                  marginTop: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Feather name="gift" size={14} color={C.rose} />
                <T size={12} bold color={C.brown}>{s.perk}</T>
              </View>

              <View style={{ marginTop: 12, flexDirection: "row", gap: 10 }}>
                <Btn small title="Visit Space & Apply" icon="external-link" onPress={() => handleOpenSpace(s)} />
                <Btn
                  small
                  outline
                  title="Learn more"
                  onPress={() =>
                    notify(
                      `${s.name}:\n\n${s.desc}\n\nPerk: ${s.perk}\n\nVisit: ${s.url}\nTip: Mention That's My Gurl community in your registration.`
                    )
                  }
                />
              </View>
            </View>
          </View>
        </Card>
      ))}

      <Title title="Support Corner Mentorship" subtitle="Get 1-on-1 human guidance from sisters in industry" />

      <Card style={{ backgroundColor: C.blush, borderColor: C.soft }}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 8 }}>
          <Feather name="user-check" size={24} color={C.rose} />
          <View style={{ flex: 1 }}>
            <T bold size={15} color={C.brown}>Weekly Sisterhood Office Hours</T>
            <T size={12} color={C.muted}>Every Wednesday · 5:00 PM GMT · Free via Google Meet</T>
          </View>
        </View>
        <T size={13} color={C.text} style={{ marginBottom: 12, lineHeight: 18 }}>
          Need someone to look over your GitHub portfolio, give resume feedback, or talk through choosing between Software Engineering, UI/UX, or Data? Join our weekly sisterhood office hour.
        </T>
        <Btn
          small
          title="Reserve your 1-on-1 spot"
          icon="calendar"
          onPress={() =>
            notify("Sisterhood Office Hours reservation confirmed! A link will be sent prior to Wednesday 5:00 PM GMT.")
          }
        />
      </Card>

      <Card>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 8 }}>
          <Feather name="shield" size={24} color={C.rose} />
          <View style={{ flex: 1 }}>
            <T bold size={15} color={C.brown}>Equipment & Internet Support Referrals</T>
            <T size={12} color={C.muted}>Bridging the digital divide for female innovators</T>
          </View>
        </View>
        <T size={13} color={C.text} style={{ marginBottom: 12, lineHeight: 18 }}>
          Lack of reliable power, data, or hardware shouldn't stop your ambition. We partner with local hubs (Orange Digital Center, Sensi Tech Hub) for free co-working desks, electricity, and high-speed Wi-Fi.
        </T>
        <Btn
          small
          outline
          title="Inquire about Hub Co-working & Data"
          icon="wifi"
          onPress={() =>
            notify("Hub Access Referral: You can present your That's My Gurl membership at partner hubs in Freetown for student co-working access!")
          }
        />
      </Card>
    </Screen>
  );
}
