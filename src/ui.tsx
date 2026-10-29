import React from "react";
import { View, Text, Pressable, TextInput, ScrollView, Alert, Platform, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { C } from "./theme";

export type IconName = React.ComponentProps<typeof Feather>["name"];

// Alert.alert does nothing on web, so use window.alert there.
export const notify = (msg: string) => {
  if (Platform.OS === "web") window.alert(msg);
  else Alert.alert("That's My Gurl", msg);
};

type TProps = { children?: React.ReactNode; size?: number; color?: string; bold?: boolean; numberOfLines?: number; style?: StyleProp<TextStyle> };
export const T = ({ children, size = 14, color = C.text, bold = false, numberOfLines, style }: TProps) => (
  <Text numberOfLines={numberOfLines} style={[{ fontSize: size, color, fontWeight: bold ? "700" : "400", lineHeight: size * 1.45 }, style]}>{children}</Text>
);

export const Card = ({ children, style }: { children?: React.ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[{ backgroundColor: C.white, borderRadius: 18, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 12 }, style]}>{children}</View>
);

type BtnProps = { title: string; onPress: () => void; outline?: boolean; small?: boolean; icon?: IconName };
export const Btn = ({ title, onPress, outline = false, small = false, icon }: BtnProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    style={({ pressed }) => ({
      backgroundColor: outline ? C.white : C.rose,
      borderColor: C.pink,
      borderWidth: outline ? 1 : 0,
      paddingHorizontal: small ? 14 : 18,
      paddingVertical: small ? 8 : 13,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      opacity: pressed ? 0.8 : 1,
    })}
  >
    {icon ? <Feather name={icon} size={15} color={outline ? C.darkRose : C.white} /> : null}
    <T size={small ? 12 : 14} color={outline ? C.darkRose : C.white} bold>{title}</T>
  </Pressable>
);

export const Chip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    style={{ paddingHorizontal: 14, paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: active ? C.rose : C.border, backgroundColor: active ? C.rose : C.blush }}
  >
    <T size={12} bold color={active ? C.white : C.darkRose}>{label}</T>
  </Pressable>
);

type FieldProps = { label?: string; value: string; onChangeText: (s: string) => void; placeholder?: string; multiline?: boolean };
export const Field = ({ label, value, onChangeText, placeholder, multiline = false }: FieldProps) => (
  <View style={{ marginBottom: 14, gap: 6 }}>
    {label ? <T bold size={13}>{label}</T> : null}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={C.muted}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
      style={[
        { borderWidth: 1, borderColor: C.border, backgroundColor: C.white, borderRadius: 12, padding: 13, minHeight: multiline ? 110 : 46, color: C.text, fontSize: 15 },
        Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null,
      ]}
    />
  </View>
);

export const Title = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 8, marginBottom: 14, marginTop: 6 }}>
    <View style={{ flex: 1 }}>
      <T size={20} bold color={C.brown}>{title}</T>
      {subtitle ? <T size={13} color={C.muted}>{subtitle}</T> : null}
    </View>
    {action}
  </View>
);

export const Pill = ({ children }: { children?: React.ReactNode }) => (
  <View style={{ alignSelf: "flex-start", backgroundColor: C.blush, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 40 }}>
    <T size={11} color={C.darkRose} bold>{children}</T>
  </View>
);

export const Avatar = ({ name = "You", size = 42 }: { name?: string; size?: number }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: C.pink, alignItems: "center", justifyContent: "center" }}>
    <T size={size * 0.34} color={C.brown} bold>
      {(name.trim().split(/\s+/).map((x) => x[0] || "").join("").slice(0, 2) || "?").toUpperCase()}
    </T>
  </View>
);

export const Hero = ({ children }: { children?: React.ReactNode }) => (
  <View style={{ backgroundColor: C.blush, borderRadius: 22, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: C.border }}>{children}</View>
);

export const Screen = ({ children }: { children?: React.ReactNode }) => (
  <ScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ padding: 18, paddingBottom: 40, width: "100%", maxWidth: 720, alignSelf: "center" }}
  >
    {children}
  </ScrollView>
);
