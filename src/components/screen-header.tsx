import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Typography, useThemeColor } from "heroui-native";
import type { JSX, ReactNode } from "react";
import { Pressable, View } from "react-native";

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
        <Typography.Heading
          type={size === "2xl" ? "h3" : "h2"}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Typography.Heading>
        {!!description && (
          <Typography.Paragraph type="body-sm" color="muted" numberOfLines={1}>
            {description}
          </Typography.Paragraph>
        )}
      </View>
      {children}
    </View>
  );
}
