import { View } from "react-native";
import { C } from "../src/theme";
import { events } from "../src/data";
import { useApp } from "../src/store";
import { T, Card, Btn, Pill, Screen } from "../src/ui";

export default function Events() {
  const a = useApp();
  return (
    <Screen>
      {events.map((e) => {
        const saved = a.saved.includes(e.id);
        return (
          <Card key={e.id}>
            <View style={{ flexDirection: "row", gap: 13 }}>
              <View style={{ backgroundColor: C.blush, borderRadius: 13, paddingHorizontal: 12, height: 70, alignItems: "center", justifyContent: "center" }}>
                <T size={22} bold color={C.darkRose}>{e.day}</T>
                <T size={11} bold color={C.darkRose}>{e.month}</T>
              </View>
              <View style={{ flex: 1 }}>
                <Pill>{e.type}</Pill>
                <T size={16} bold style={{ marginTop: 6 }}>{e.title}</T>
                <T size={12} color={C.muted}>{e.when}</T>
                <T style={{ marginTop: 6 }}>{e.desc}</T>
                <View style={{ alignSelf: "flex-start", marginTop: 12 }}>
                  <Btn small title={saved ? "Saved ✓" : "Save my place"} outline={saved} onPress={() => a.toggleSave(e.id)} />
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}
