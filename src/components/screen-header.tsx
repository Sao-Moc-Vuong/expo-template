import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import type { JSX, ReactNode } from "react";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export function ScreenHeader({
  title,
  description,
  size = "3xl",
  showBackButton = true,
  onBack,
  children,
}: {
  title?: string;
  description?: string;
  size?: "2xl" | "3xl";
  showBackButton?: boolean;
  onBack?: () => void;
  children?: ReactNode;
}): JSX.Element {
  const foreground = useThemeColor("foreground");
  const router = useRouter();

  return (
    <View className="flex-row items-center gap-2 px-6 pt-4 pb-2">
      {showBackButton && (
        <Pressable onPress={onBack ?? (() => router.back())} hitSlop={8} className="-ml-2 p-2">
          <Ionicons name="chevron-back" size={22} color={foreground} />
        </Pressable>
      )}
      <View className="flex-1">
        <ThemedText
          type="title"
          className={size === "2xl" ? "text-2xl" : "text-3xl"}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </ThemedText>
        {!!description && (
          <ThemedText type="small" themeColor="muted" numberOfLines={1}>
            {description}
          </ThemedText>
        )}
      </View>
      {children}
    </View>
  );
}
