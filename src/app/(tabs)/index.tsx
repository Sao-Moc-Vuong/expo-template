import type { JSX } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "@/hooks/use-translation";

export default function HomeTab(): JSX.Element {
  const { t } = useTranslation("tabs");

  return (
    <ThemedView className="flex-1 items-center justify-center px-6">
      <ThemedText type="title">{t("home")}</ThemedText>
    </ThemedView>
  );
}
