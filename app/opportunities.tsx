import React, { useState } from "react";
import { View, Pressable, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { opportunities, Opportunity } from "../src/data";
import { useApp } from "../src/store";
import { T, Card, Btn, Chip, Hero, Pill, Title, Screen, notify } from "../src/ui";

const kinds = ["All", "Jobs", "Internships", "Fellowships", "Grants & Pitches", "Saved"] as const;

export default function Opportunities() {
  const a = useApp();
  const [activeKind, setActiveKind] = useState<typeof kinds[number]>("All");
  const [search, setSearch] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    a.checkInToday();
    setCheckedIn(true);
    notify(`🔥 Checked in! Your current growth streak is ${a.individualGrowth.streak + (checkedIn ? 0 : 1)} days! Keep shining sis!`);
  };

  const filtered = opportunities.filter((op) => {
    // Kind filter
    if (activeKind === "Jobs" && op.kind !== "Job") return false;
    if (activeKind === "Internships" && op.kind !== "Internship") return false;
    if (activeKind === "Fellowships" && op.kind !== "Fellowship") return false;
    if (activeKind === "Grants & Pitches" && op.kind !== "Grant") return false;
    if (activeKind === "Saved" && !a.savedOpportunities.includes(op.id)) return false;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRole = op.role.toLowerCase().includes(q);
      const matchOrg = op.org.toLowerCase().includes(q);
      const matchSkill = op.skills.some((s) => s.toLowerCase().includes(q));
      const matchLoc = op.location.toLowerCase().includes(q);
      return matchRole || matchOrg || matchSkill || matchLoc;
    }
    return true;
  });

  const handleApply = (op: Opportunity) => {
    if (op.applyUrl.startsWith("http")) {
      Linking.openURL(op.applyUrl).catch(() => {
        notify(`Application portal: ${op.applyUrl}\nMake sure to mention That's My Gurl community in your application!`);
      });
    } else {
      notify(`To apply for ${op.role} at ${op.org}, visit their official careers portal or email partners@thatsmygurl.org.`);
    }
  };

  return (
    <Screen>
      <Hero>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <T size={20} bold color={C.brown}>Opportunities & Check-In</T>
            <T color={C.brown} style={{ marginTop: 4 }}>
              Vetted roles, internships, fellowships & grants from partner organisations.
            </T>
          </View>
          <Pressable
            onPress={handleCheckIn}
            style={{
              backgroundColor: C.white,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 16,
              alignItems: "center",
              borderWidth: 1.5,
              borderColor: C.rose,
            }}
          >
            <T size={18}>🔥</T>
            <T size={11} bold color={C.rose}>
              {a.individualGrowth.streak} Days
            </T>
            <T size={10} color={C.muted}>Check in</T>
          </Pressable>
        </View>
      </Hero>

      <Card style={{ paddingVertical: 12 }}>
        <T size={13} bold color={C.brown} style={{ marginBottom: 10 }}>Filter by Opportunity Type</T>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {kinds.map((k) => (
            <Chip
              key={k}
              label={k === "Saved" ? `Saved (${a.savedOpportunities.length})` : k}
              active={activeKind === k}
              onPress={() => setActiveKind(k)}
            />
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, marginTop: 4 }}>
        <Title title={`${filtered.length} Opportunities Found`} />
      </View>

      {filtered.length === 0 ? (
        <Card style={{ alignItems: "center", paddingVertical: 32 }}>
          <Feather name="briefcase" size={36} color={C.muted} />
          <T bold size={16} color={C.brown} style={{ marginTop: 12 }}>No opportunities found</T>
          <T color={C.muted} style={{ textAlign: "center", marginTop: 4 }}>
            {activeKind === "Saved"
              ? "You haven't saved any opportunities yet. Tap the bookmark icon to save roles."
              : "Try choosing another filter above to see more openings."}
          </T>
          {activeKind !== "All" && (
            <View style={{ marginTop: 14 }}>
              <Btn small outline title="Show all opportunities" onPress={() => setActiveKind("All")} />
            </View>
          )}
        </Card>
      ) : null}

      {filtered.map((op) => {
        const isSaved = a.savedOpportunities.includes(op.id);
        return (
          <Card key={op.id} style={{ borderColor: op.featured ? C.rose : C.border, borderWidth: op.featured ? 1.5 : 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Pill>{op.kind}</Pill>
                  {op.featured && (
                    <View style={{ backgroundColor: "#FCE4D6", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                      <T size={10} bold color="#E07A5F">★ FEATURED</T>
                    </View>
                  )}
                </View>
                <T bold size={17} color={C.brown}>{op.role}</T>
                <T size={13} color={C.rose} bold style={{ marginTop: 2 }}>{op.org}</T>
              </View>
              <Pressable
                onPress={() => a.toggleSaveOpportunity(op.id)}
                style={{ padding: 6 }}
                accessibilityLabel="Save opportunity"
              >
                <Feather name={isSaved ? "bookmark" : "bookmark"} size={22} color={isSaved ? C.rose : C.muted} />
              </Pressable>
            </View>

            <T size={13} color={C.text} style={{ marginVertical: 8, lineHeight: 19 }}>
              {op.desc}
            </T>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginVertical: 6 }}>
              {op.skills.map((s) => (
                <View key={s} style={{ backgroundColor: C.blush, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                  <T size={11} color={C.brown}>{s}</T>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 14, marginVertical: 8, borderTopWidth: 1, borderTopColor: C.border, paddingTop: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Feather name="map-pin" size={13} color={C.muted} />
                <T size={12} color={C.muted}>{op.location}</T>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Feather name="dollar-sign" size={13} color={C.muted} />
                <T size={12} bold color={C.brown}>{op.stipend}</T>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Feather name="clock" size={13} color={C.muted} />
                <T size={12} color={C.muted}>Deadline: {op.deadline}</T>
              </View>
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Btn title="Apply for Role" icon="external-link" onPress={() => handleApply(op)} />
              </View>
              <Btn
                small
                outline
                title={isSaved ? "Saved" : "Save"}
                icon="bookmark"
                onPress={() => a.toggleSaveOpportunity(op.id)}
              />
            </View>
          </Card>
        );
      })}

      <Card style={{ backgroundColor: C.blush, borderColor: C.soft, marginTop: 10 }}>
        <T bold size={15} color={C.brown}>Are you an organisation hiring in tech?</T>
        <T size={13} color={C.muted} style={{ marginTop: 4, marginBottom: 12 }}>
          Post internships, tech fellowships, jobs, or female founder grants to our community of 1,200+ women developers, designers, and innovators.
        </T>
        <Btn
          small
          outline
          title="Partner with us: partners@thatsmygurl.org"
          icon="mail"
          onPress={() => Linking.openURL("mailto:partners@thatsmygurl.org?subject=Opportunity%20Listing%20Inquiry")}
        />
      </Card>
    </Screen>
  );
}

