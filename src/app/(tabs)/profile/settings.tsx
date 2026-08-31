import type { JSX } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { ThemedView } from "@/components/themed-view";
import { SettingsList } from "@/features/settings/components/settings-list";
import { useTranslation } from "@/hooks/use-translation";

export default function SettingsScreen(): JSX.Element {
  const { t } = useTranslation("settings");

  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <ScreenHeader title={t("title")} />
        <ScrollView>
          <SettingsList />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
