import { Ionicons } from "@expo/vector-icons";
import { ListGroup, Separator, Tabs, Typography, useThemeColor } from "heroui-native";
import type { JSX, ReactNode } from "react";
import { View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";
import type { Language } from "@/lib/i18n";

import { type ThemePreference, useUiStore } from "@/stores/ui.store";

function SettingsGroupLabel({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Typography.Paragraph type="body-sm" color="muted" className="ml-2 uppercase">
      {children}
    </Typography.Paragraph>
  );
}

function SettingsRow({
  icon,
  title,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: ReactNode;
}): JSX.Element {
  const foreground = useThemeColor("foreground");

  return (
    <ListGroup.Item disabled className="items-start py-4">
      <ListGroup.ItemPrefix className="mt-0.5">
        <Ionicons name={icon} size={20} color={foreground} />
      </ListGroup.ItemPrefix>
      <ListGroup.ItemContent className="gap-3">
        <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
        {children}
      </ListGroup.ItemContent>
    </ListGroup.Item>
  );
}

export function SettingsList(): JSX.Element {
  const { t } = useTranslation("settings");
  const themePreference = useUiStore((state) => state.themePreference);
  const language = useUiStore((state) => state.language);
  const actions = useUiStore((state) => state.actions);

  return (
    <View className="gap-6 px-6 pb-8 pt-2">
      <View className="gap-2">
        <SettingsGroupLabel>{t("groupGeneral")}</SettingsGroupLabel>
        <ListGroup>
          <SettingsRow icon="color-palette-outline" title={t("theme")}>
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
          </SettingsRow>

          <Separator className="mx-4" />

          <SettingsRow icon="language-outline" title={t("language")}>
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
          </SettingsRow>
        </ListGroup>
      </View>
    </View>
  );
}
