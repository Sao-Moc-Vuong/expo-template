import { useRouter } from "expo-router";
import type { JSX } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { useTranslation } from "@/hooks/use-translation";

export default function ChangePasswordScreen(): JSX.Element {
  const router = useRouter();
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScreenHeader title={t("changePassword.title")} />
      <ScrollView contentContainerClassName="px-6 pb-8 pt-2">
        <ChangePasswordForm onSaved={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}
