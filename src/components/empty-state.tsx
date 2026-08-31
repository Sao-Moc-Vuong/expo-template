import { Ionicons } from "@expo/vector-icons";
import { useThemeColor, type ThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

/**
 * Shared empty state for any empty list. `fill` (defaults to true) adds
 * `flex-1 justify-center` to center it in the remaining space — turn it off
 * only when used in a context without a defined height (e.g. inside
 * `Dialog.Content`).
 */
export function EmptyState({
  icon,
  iconColor,
  message,
  actionLabel,
  onActionPress,
  fill = true,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  /** Defaults to `muted` — switch to `success` for a positively-framed empty state. */
  iconColor?: ThemeColor;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
  fill?: boolean;
}): JSX.Element {
  const [resolvedIconColor, accent] = useThemeColor([iconColor ?? "muted", "accent"]);

  return (
    <View className={`items-center justify-center gap-2 px-6 ${fill ? "flex-1 py-10" : "py-6"}`}>
      <Ionicons name={icon} size={32} color={resolvedIconColor} />
      <ThemedText themeColor="muted" className="text-center">
        {message}
      </ThemedText>
      {actionLabel && onActionPress && (
        <Pressable onPress={onActionPress} className="mt-1 flex-row items-center gap-1">
          <Ionicons name="add-circle-outline" size={16} color={accent} />
          <ThemedText type="smallBold" themeColor="accent">
            {actionLabel}
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}
