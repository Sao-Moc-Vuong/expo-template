import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTranslation } from "@/hooks/use-translation";

/**
 * Shared error state for data-loading failures (query `isError`). `fill`
 * (defaults to true) centers it vertically in the remaining space, same as
 * `EmptyState`.
 */
export function ErrorState({
  message,
  onRetry,
  actionLabel,
  onActionPress,
  fill = true,
}: {
  message: string;
  onRetry?: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
  fill?: boolean;
}): JSX.Element {
  const { t } = useTranslation("common");
  const [danger, accent] = useThemeColor(["danger", "accent"]);

  return (
    <View className={`items-center justify-center gap-2 px-6 ${fill ? "flex-1 py-10" : "py-6"}`}>
      <Ionicons name="alert-circle-outline" size={32} color={danger} />
      <ThemedText themeColor="danger" className="text-center">
        {message}
      </ThemedText>
      {(onRetry || (actionLabel && onActionPress)) && (
        <View className="mt-1 flex-row items-center gap-4">
          {onRetry && (
            <Pressable onPress={onRetry} className="flex-row items-center gap-1">
              <Ionicons name="refresh-outline" size={16} color={accent} />
              <ThemedText type="smallBold" themeColor="accent">
                {t("button.retry")}
              </ThemedText>
            </Pressable>
          )}
          {actionLabel && onActionPress && (
            <Pressable onPress={onActionPress} className="flex-row items-center gap-1">
              <Ionicons name="add-circle-outline" size={16} color={accent} />
              <ThemedText type="smallBold" themeColor="accent">
                {actionLabel}
              </ThemedText>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
