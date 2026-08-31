import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export function DetailRow({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}): JSX.Element {
  const muted = useThemeColor("muted");

  return (
    <View className="flex-row items-center gap-1">
      <Ionicons name={icon} size={14} color={muted} />
      <ThemedText type="small" themeColor="muted">
        {label}
      </ThemedText>
    </View>
  );
}
