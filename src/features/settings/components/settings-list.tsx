import { useRouter } from "expo-router";
import { ListGroup, Separator, Tabs } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";
import type { Language } from "@/lib/i18n";

import { ListRow } from "@/components/list-row";
import { type ThemePreference, useUiStore } from "@/stores/ui.store";

export function SettingsList(): JSX.Element {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const themePreference = useUiStore((state) => state.themePreference);
  const language = useUiStore((state) => state.language);
  const actions = useUiStore((state) => state.actions);

  return (
    <View className="gap-6 px-6 pb-8 pt-2">
      <View className="gap-2">
        <ListRow.GroupLabel>{t("groupAccount")}</ListRow.GroupLabel>
        <ListGroup>
          <ListRow.Link
            icon="person-outline"
            title={t("editProfile.settingsRowTitle")}
            onPress={() => router.push("/profile/edit-profile")}
          />
          <Separator className="mx-4" />
          <ListRow.Link
            icon="lock-closed-outline"
            title={t("changePassword.settingsRowTitle")}
            onPress={() => router.push("/profile/change-password")}
          />
        </ListGroup>
      </View>

      <View className="gap-2">
        <ListRow.GroupLabel>{t("groupGeneral")}</ListRow.GroupLabel>
        <ListGroup>
          <ListRow icon="color-palette-outline" title={t("theme")}>
            <Tabs
              value={themePreference}
              onValueChange={(value) => actions.setThemePreference(value as ThemePreference)}
            >
              <Tabs.List>
                <Tabs.Indicator />
                <Tabs.Trigger value="system">
                  <Tabs.Label>{t("themeSystem")}</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger value="light">
                  <Tabs.Label>{t("themeLight")}</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger value="dark">
                  <Tabs.Label>{t("themeDark")}</Tabs.Label>
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </ListRow>

          <Separator className="mx-4" />

          <ListRow icon="language-outline" title={t("language")}>
            <Tabs
              value={language}
              onValueChange={(value) => actions.setLanguage(value as Language)}
            >
              <Tabs.List>
                <Tabs.Indicator />
                <Tabs.Trigger value="vi">
                  <Tabs.Label>{t("languageVi")}</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger value="en">
                  <Tabs.Label>{t("languageEn")}</Tabs.Label>
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </ListRow>
        </ListGroup>
      </View>
    </View>
  );
}
