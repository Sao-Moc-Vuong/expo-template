import { Typography } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";

export default function HomeTab(): JSX.Element {
  const { t } = useTranslation("tabs");

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Typography.Heading>{t("home")}</Typography.Heading>
    </View>
  );
}
