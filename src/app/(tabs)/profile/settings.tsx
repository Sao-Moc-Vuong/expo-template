import type { JSX } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { SettingsList } from "@/features/settings/components/settings-list";
import { useTranslation } from "@/hooks/use-translation";

export default function SettingsScreen(): JSX.Element {
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScreenHeader title={t("title")} />
      <ScrollView>
        <SettingsList />
      </ScrollView>
    </SafeAreaView>
  );
}
