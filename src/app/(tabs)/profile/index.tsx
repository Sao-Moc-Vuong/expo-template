import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/screen-header";
import { ProfileScreen } from "@/features/profile/components/profile-screen";
import { useTranslation } from "@/hooks/use-translation";

export default function ProfileTab(): JSX.Element {
  const { t } = useTranslation("profile");
  const router = useRouter();
  const foreground = useThemeColor("foreground");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScreenHeader title={t("title")} showBackButton={false}>
        <Pressable onPress={() => router.push("/profile/settings")} hitSlop={8} className="p-2">
          <Ionicons name="settings-outline" size={22} color={foreground} />
        </Pressable>
      </ScreenHeader>
      <ProfileScreen />
    </SafeAreaView>
  );
}
