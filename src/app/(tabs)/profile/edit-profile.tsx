import { useRouter } from "expo-router";
import type { JSX } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { ThemedView } from "@/components/themed-view";
import { EditProfileForm } from "@/features/auth/components/edit-profile-form";
import { useTranslation } from "@/hooks/use-translation";

export default function EditProfileScreen(): JSX.Element {
  const router = useRouter();
  const { t } = useTranslation("settings");

  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <ScreenHeader title={t("editProfile.title")} />
        <ScrollView contentContainerClassName="px-6 pb-8 pt-2">
          <EditProfileForm onSaved={() => router.back()} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
