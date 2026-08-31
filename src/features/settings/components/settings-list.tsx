import { ListGroup, Tabs } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";
import type { Language } from "@/lib/i18n";

import { SettingsGroupLabel } from "@/components/settings/settings-group-label";
import { SettingsRow } from "@/components/settings/settings-row";
import { type ThemePreference, useUiStore } from "@/stores/ui.store";

export function SettingsList(): JSX.Element {
  const { t } = useTranslation("settings");
  const themePreference = useUiStore((state) => state.themePreference);
  const language = useUiStore((state) => state.language);
  const actions = useUiStore((state) => state.actions);

  return (
    <View className="gap-2 px-4 py-6">
      <SettingsGroupLabel>{t("group.appearance")}</SettingsGroupLabel>

      <ListGroup>
        <SettingsRow title={t("theme.label")}>
          <Tabs
            value={themePreference}
            onValueChange={(value) => actions.setThemePreference(value as ThemePreference)}
          >
            <Tabs.List>
              <Tabs.Trigger value="system">
                <Tabs.Label>{t("theme.system")}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="light">
                <Tabs.Label>{t("theme.light")}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="dark">
                <Tabs.Label>{t("theme.dark")}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
          </Tabs>
        </SettingsRow>

        <SettingsRow title={t("language.label")}>
          <Tabs
            value={language}
            onValueChange={(value) => actions.setLanguage(value as Language)}
          >
            <Tabs.List>
              <Tabs.Trigger value="vi">
                <Tabs.Label>{t("language.vi")}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="en">
                <Tabs.Label>{t("language.en")}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
          </Tabs>
        </SettingsRow>
      </ListGroup>
    </View>
  );
}
