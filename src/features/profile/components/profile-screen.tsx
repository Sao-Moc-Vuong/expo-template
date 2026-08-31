import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "heroui-native";
import type { JSX } from "react";
import { SafeAreaView, View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";

import { authQueryOptions } from "@/features/auth/hooks/auth.query-options";
import { useLogoutMutation } from "@/features/auth/hooks/use-auth";

export function ProfileScreen(): JSX.Element {
  const { t } = useTranslation("profile");
  const sessionQuery = useQuery(authQueryOptions.session);
  const logoutMutation = useLogoutMutation();

  const user = sessionQuery.data?.user;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 gap-6 px-6 py-8">
        <Typography.Heading>{t("title")}</Typography.Heading>

        <View className="gap-2">
          <Typography.Paragraph className="text-muted">{t("name")}</Typography.Paragraph>
          <Typography.Paragraph>{user?.name}</Typography.Paragraph>
        </View>

        <View className="gap-2">
          <Typography.Paragraph className="text-muted">{t("email")}</Typography.Paragraph>
          <Typography.Paragraph>{user?.email}</Typography.Paragraph>
        </View>

        <Button
          variant="outline"
          isDisabled={logoutMutation.isPending}
          onPress={() => logoutMutation.mutate()}
        >
          <Button.Label>{t("logout")}</Button.Label>
        </Button>
      </View>
    </SafeAreaView>
  );
}
