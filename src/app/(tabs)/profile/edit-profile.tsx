import { useRouter } from "expo-router";
import type { JSX } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { EditProfileForm } from "@/features/auth/components/edit-profile-form";
import { useTranslation } from "@/hooks/use-translation";

export default function EditProfileScreen(): JSX.Element {
  const router = useRouter();
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScreenHeader title={t("editProfile.title")} />
      <ScrollView contentContainerClassName="px-6 pb-8 pt-2">
        <EditProfileForm onSaved={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}
