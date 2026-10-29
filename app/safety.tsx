import { router } from "expo-router";
import { T, Card, Btn, Screen, notify } from "../src/ui";
import { C } from "../src/theme";
import { useApp } from "../src/store";

const rules = [
  ["Be kind", "Offer encouragement without shaming, comparing, or dismissing someone's experience."],
  ["Protect privacy", "Ask before sharing another person's story, photo, or details outside the community."],
  ["Mental health", "Check-ins and journaling are reflection tools, not medical advice. If you need support, contact a qualified professional, a local health service, or someone you trust. In an emergency, call your local emergency number."],
  ["About this version", "This is an early version. Everything you add is saved only on this device, unencrypted. There are no real accounts, blocking, reporting, or moderation yet, so please don't share sensitive information."],
];

export default function Safety() {
  const a = useApp();
  return (
    <Screen>
      {rules.map(([h, b]) => (
        <Card key={h}>
          <T bold size={15}>{h}</T>
          <T style={{ marginTop: 4 }}>{b}</T>
        </Card>
      ))}
      <Card>
        <T bold>Reset this device</T>
        <T color={C.muted} style={{ marginBottom: 12 }}>Deletes your posts, check-ins, journal, messages and profile from this device.</T>
        <Btn title="Delete my data" icon="trash-2" outline onPress={() => { a.reset(); notify("Your data was deleted from this device."); router.replace("/"); }} />
      </Card>
    </Screen>
  );
}
