import type { JSX } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { SettingsList } from "@/features/settings/components/settings-list";

export default function SettingsTab(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <SettingsList />
      </ScrollView>
    </SafeAreaView>
  );
}
