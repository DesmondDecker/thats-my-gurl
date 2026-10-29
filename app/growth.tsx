import React, { useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "../src/theme";
import { useApp } from "../src/store";
import { T, Card, Hero, Btn, Pill, Title, Screen, notify, Field } from "../src/ui";

const allAvailableSkills = [
  "HTML/CSS",
  "JavaScript",
  "TypeScript",
  "React / React Native",
  "Python",
  "SQL & Databases",
  "UI/UX (Figma)",
  "Git & GitHub",
  "Cloud & AWS",
  "API Design",
  "Pitching & Speaking",
  "Product Management",
];

const ventureStages = [
  "Idea Stage",
  "Prototype / MVP",
  "Pilot / Beta",
  "Generating Revenue",
  "Seed Funded",
];

export default function GrowthTracker() {
  const a = useApp();
  const [mode, setMode] = useState<"individual" | "company">("individual");
  const [newSkill, setNewSkill] = useState("");
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [editCompany, setEditCompany] = useState(false);
  const [companyName, setCompanyName] = useState(a.companyGrowth.companyName);
  const [targetMetric, setTargetMetric] = useState(a.companyGrowth.targetMetric);

  const ind = a.individualGrowth;
  const comp = a.companyGrowth;

  const indDoneCount = ind.milestones.filter((m) => m.done).length;
  const indProgress = ind.milestones.length ? Math.round((indDoneCount / ind.milestones.length) * 100) : 0;

  const compDoneCount = comp.milestones.filter((m) => m.done).length;
  const compProgress = comp.milestones.length ? Math.round((compDoneCount / comp.milestones.length) * 100) : 0;

  const handleAddMilestone = () => {
    if (!newMilestoneTitle.trim()) return notify("Please type a milestone title first.");
    a.addMilestone(mode, newMilestoneTitle.trim(), mode === "individual" ? "Personal Goal" : "Venture Goal");
    setNewMilestoneTitle("");
    notify("🎯 Goal added to your roadmap!");
  };

  const handleSaveCompany = () => {
    a.updateCompanyGrowth({ companyName: companyName.trim() || comp.companyName, targetMetric: targetMetric.trim() || comp.targetMetric });
    setEditCompany(false);
    notify("Company growth profile updated!");
  };

  return (
    <Screen>
      <Hero>
        <T size={20} bold color={C.brown}>Growth Tracker 📈</T>
        <T color={C.brown} style={{ marginTop: 4 }}>
          Track your continuous evolution: skills mastered, daily check-in streaks, and startup traction.
        </T>
      </Hero>

      {/* Mode Switcher */}
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 12 }}>
        <Pressable
          onPress={() => setMode("individual")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            backgroundColor: mode === "individual" ? C.rose : C.white,
            borderWidth: 1,
            borderColor: mode === "individual" ? C.rose : C.border,
          }}
        >
          <T bold color={mode === "individual" ? C.white : C.brown}>Individual Tech Track</T>
        </Pressable>
        <Pressable
          onPress={() => setMode("company")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            backgroundColor: mode === "company" ? C.rose : C.white,
            borderWidth: 1,
            borderColor: mode === "company" ? C.rose : C.border,
          }}
        >
          <T bold color={mode === "company" ? C.white : C.brown}>Company / Founder Track</T>
        </Pressable>
      </View>

      {mode === "individual" ? (
        <>
          {/* Stats Bar */}
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 14 }}>
            <Card style={{ flex: 1, alignItems: "center", paddingVertical: 14, marginBottom: 0 }}>
              <T size={26}>🔥</T>
              <T size={22} bold color={C.rose} style={{ marginTop: 2 }}>{ind.streak}</T>
              <T size={11} color={C.muted}>Day Streak</T>
              <Pressable
                onPress={() => {
                  a.checkInToday();
                  notify("🔥 Daily check-in logged! Streak updated.");
                }}
                style={{ marginTop: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: C.blush }}
              >
                <T size={10} bold color={C.darkRose}>Check in today</T>
              </Pressable>
            </Card>

            <Card style={{ flex: 1, alignItems: "center", paddingVertical: 14, marginBottom: 0 }}>
              <T size={26}>⏳</T>
              <T size={22} bold color={C.brown} style={{ marginTop: 2 }}>{ind.hoursLearned} hrs</T>
              <T size={11} color={C.muted}>Hours Learned</T>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => a.updateIndividualGrowth({ hoursLearned: ind.hoursLearned + 1 })}
                  style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: C.blush, alignItems: "center", justifyContent: "center" }}
                >
                  <T bold color={C.rose}>+1</T>
                </Pressable>
                <Pressable
                  onPress={() => a.updateIndividualGrowth({ hoursLearned: ind.hoursLearned + 2 })}
                  style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: C.blush, alignItems: "center", justifyContent: "center" }}
                >
                  <T bold color={C.rose}>+2</T>
                </Pressable>
              </View>
            </Card>
          </View>

          {/* Progress Overview Card */}
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <T bold size={15} color={C.brown}>Milestone Roadmap Progress</T>
              <T bold color={C.rose} size={15}>{indProgress}%</T>
            </View>
            {/* Progress Bar */}
            <View style={{ height: 10, borderRadius: 5, backgroundColor: C.border, overflow: "hidden", marginVertical: 6 }}>
              <View style={{ width: `${indProgress}%`, height: "100%", backgroundColor: C.rose, borderRadius: 5 }} />
            </View>
            <T size={12} color={C.muted}>
              {indDoneCount} of {ind.milestones.length} personal milestones achieved
            </T>
          </Card>

          {/* Skills Mastery Card */}
          <Card>
            <T bold size={15} color={C.brown}>Skills Mastery Inventory ({ind.skills.length})</T>
            <T size={12} color={C.muted} style={{ marginTop: 2, marginBottom: 10 }}>
              Tap any skill badge to toggle between in-progress and mastered.
            </T>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {allAvailableSkills.map((skill) => {
                const isMastered = ind.skills.includes(skill);
                return (
                  <Pressable
                    key={skill}
                    onPress={() => a.toggleSkill(skill)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: isMastered ? C.rose : C.border,
                      backgroundColor: isMastered ? C.rose : C.white,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {isMastered && <Feather name="check" size={13} color={C.white} />}
                    <T size={12} bold color={isMastered ? C.white : C.brown}>{skill}</T>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          {/* Milestones Checklist */}
          <Title title="Individual Roadmap Milestones" subtitle="Check off achievements as you grow" />

          {ind.milestones.map((m) => (
            <Card key={m.id} style={{ paddingVertical: 12 }}>
              <Pressable
                onPress={() => a.toggleMilestone("individual", m.id)}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: m.done ? C.rose : C.muted,
                    backgroundColor: m.done ? C.rose : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {m.done && <Feather name="check" size={14} color={C.white} />}
                </View>
                <View style={{ flex: 1 }}>
                  <T
                    bold
                    size={14}
                    color={m.done ? C.muted : C.brown}
                    style={m.done ? { textDecorationLine: "line-through" } : undefined}
                  >
                    {m.title}
                  </T>
                  <T size={11} color={C.muted}>{m.category}</T>
                </View>
              </Pressable>
            </Card>
          ))}

          {/* Add Milestone Form */}
          <Card style={{ backgroundColor: C.blush, borderColor: C.soft }}>
            <T bold size={13} color={C.brown} style={{ marginBottom: 6 }}>Add Custom Goal</T>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TextInput
                value={newMilestoneTitle}
                onChangeText={setNewMilestoneTitle}
                placeholder="e.g., Read 1 chapter of Eloquent JS..."
                placeholderTextColor={C.muted}
                style={{
                  flex: 1,
                  backgroundColor: C.white,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: C.border,
                  color: C.text,
                }}
              />
              <Btn small title="Add" icon="plus" onPress={handleAddMilestone} />
            </View>
          </Card>
        </>
      ) : (
        <>
          {/* Company / Founder Track */}
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View>
                <Pill>Female-Led Venture</Pill>
                <T bold size={19} color={C.brown} style={{ marginTop: 4 }}>{comp.companyName}</T>
                <T size={13} color={C.rose} bold>{comp.stage}</T>
              </View>
              <Btn small outline title={editCompany ? "Cancel" : "Edit Profile"} onPress={() => setEditCompany(!editCompany)} />
            </View>

            {editCompany && (
              <View style={{ marginTop: 14, borderTopWidth: 1, borderColor: C.border, paddingTop: 12 }}>
                <Field label="Company / Initiative Name" value={companyName} onChangeText={setCompanyName} />
                <Field label="Current Target Metric (e.g., 50 Beta Users)" value={targetMetric} onChangeText={setTargetMetric} />
                <Btn small title="Save Changes" onPress={handleSaveCompany} />
              </View>
            )}

            <View style={{ flexDirection: "row", gap: 12, marginTop: 14, borderTopWidth: 1, borderColor: C.border, paddingTop: 10 }}>
              <View style={{ flex: 1 }}>
                <T size={11} color={C.muted}>Team Members</T>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <T bold size={16} color={C.brown}>{comp.teamSize}</T>
                  <Pressable
                    onPress={() => a.updateCompanyGrowth({ teamSize: comp.teamSize + 1 })}
                    style={{ paddingHorizontal: 6, backgroundColor: C.blush, borderRadius: 6 }}
                  >
                    <T bold color={C.rose} size={11}>+1</T>
                  </Pressable>
                </View>
              </View>

              <View style={{ flex: 1.5 }}>
                <T size={11} color={C.muted}>Target Milestone Metric</T>
                <T bold size={14} color={C.brown} style={{ marginTop: 2 }}>{comp.targetMetric}</T>
              </View>
            </View>
          </Card>

          {/* Venture Stage Selector */}
          <Card>
            <T bold size={14} color={C.brown} style={{ marginBottom: 8 }}>Venture Lifecycle Stage</T>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {ventureStages.map((stage) => (
                <Pressable
                  key={stage}
                  onPress={() => a.updateCompanyGrowth({ stage })}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: comp.stage === stage ? C.rose : C.border,
                    backgroundColor: comp.stage === stage ? C.rose : C.blush,
                  }}
                >
                  <T size={12} bold color={comp.stage === stage ? C.white : C.brown}>{stage}</T>
                </Pressable>
              ))}
            </View>
          </Card>

          {/* Company Progress Bar */}
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <T bold size={15} color={C.brown}>Startup Launch Readiness</T>
              <T bold color={C.rose} size={15}>{compProgress}%</T>
            </View>
            <View style={{ height: 10, borderRadius: 5, backgroundColor: C.border, overflow: "hidden", marginVertical: 6 }}>
              <View style={{ width: `${compProgress}%`, height: "100%", backgroundColor: C.rose, borderRadius: 5 }} />
            </View>
            <T size={12} color={C.muted}>
              {compDoneCount} of {comp.milestones.length} venture milestones validated
            </T>
          </Card>

          {/* Company Milestones */}
          <Title title="Venture Roadmap & Grant Checklist" subtitle="Track traction, pitch readiness, and launch deliverables" />

          {comp.milestones.map((m) => (
            <Card key={m.id} style={{ paddingVertical: 12 }}>
              <Pressable
                onPress={() => a.toggleMilestone("company", m.id)}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: m.done ? C.rose : C.muted,
                    backgroundColor: m.done ? C.rose : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {m.done && <Feather name="check" size={14} color={C.white} />}
                </View>
                <View style={{ flex: 1 }}>
                  <T
                    bold
                    size={14}
                    color={m.done ? C.muted : C.brown}
                    style={m.done ? { textDecorationLine: "line-through" } : undefined}
                  >
                    {m.title}
                  </T>
                  <T size={11} color={C.muted}>{m.category}</T>
                </View>
              </Pressable>
            </Card>
          ))}

          {/* Add Company Milestone Form */}
          <Card style={{ backgroundColor: C.blush, borderColor: C.soft }}>
            <T bold size={13} color={C.brown} style={{ marginBottom: 6 }}>Add Venture Milestone</T>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TextInput
                value={newMilestoneTitle}
                onChangeText={setNewMilestoneTitle}
                placeholder="e.g., Secure pilot agreement with 1 merchant..."
                placeholderTextColor={C.muted}
                style={{
                  flex: 1,
                  backgroundColor: C.white,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: C.border,
                  color: C.text,
                }}
              />
              <Btn small title="Add" icon="plus" onPress={handleAddMilestone} />
            </View>
          </Card>
        </>
      )}
    </Screen>
  );
}

