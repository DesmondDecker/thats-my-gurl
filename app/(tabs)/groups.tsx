import { useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "../../src/theme";
import { groups } from "../../src/data";
import { useApp } from "../../src/store";
import { T, Card, Btn, Field, Screen, IconName } from "../../src/ui";

export default function Groups() {
  const a = useApp();
  const [q, setQ] = useState("");
  const shown = groups.filter((g) => (g.name + g.kind + g.desc).toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <Field value={q} onChangeText={setQ} placeholder="Search communities..." />
      {shown.map((g) => {
        const joined = a.joined.includes(g.id);
        return (
          <Card key={g.id}>
            <View style={{ flexDirection: "row", gap: 13 }}>
              <View style={{ width: 48, height: 48, borderRadius: 15, backgroundColor: C.blush, alignItems: "center", justifyContent: "center" }}>
                <Feather name={g.icon as IconName} size={22} color={C.rose} />
              </View>
              <View style={{ flex: 1 }}>
                <T size={16} bold>{g.name}</T>
                <T size={12} color={C.muted}>{g.kind} · {g.members} members</T>
                <T style={{ marginTop: 6 }}>{g.desc}</T>
                <View style={{ alignSelf: "flex-start", marginTop: 12 }}>
                  <Btn small title={joined ? "Joined ✓" : "Join"} outline={joined} onPress={() => a.toggleJoin(g.id)} />
                </View>
              </View>
            </View>
          </Card>
        );
      })}
      {shown.length === 0 ? <T color={C.muted}>No communities match your search.</T> : null}
    </Screen>
  );
}
