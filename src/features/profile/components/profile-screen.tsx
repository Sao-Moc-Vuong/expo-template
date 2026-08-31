import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "heroui-native";
import type { JSX } from "react";
import { ScrollView, View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";

import { authQueryOptions } from "@/features/auth/hooks/auth.query-options";
import { useLogoutMutation } from "@/features/auth/hooks/use-auth";

export function ProfileScreen(): JSX.Element {
  const { t } = useTranslation("profile");
  const sessionQuery = useQuery(authQueryOptions.session);
  const logoutMutation = useLogoutMutation();

  const user = sessionQuery.data?.user;

  return (
    <ScrollView className="flex-1" contentContainerClassName="flex-grow justify-between px-6 py-2 gap-6">
      <View className="gap-6">
        <View className="flex-row items-center gap-3">
          <View className="size-12 items-center justify-center rounded-full bg-accent">
            <Typography.Heading type="h4" className="text-accent-foreground">
              {user?.name?.charAt(0).toUpperCase() ?? ""}
            </Typography.Heading>
          </View>
          <View className="flex-1 gap-1">
            <Typography.Heading type="h5">{user?.name}</Typography.Heading>
            <Typography.Paragraph type="body-sm" color="muted">
              {user?.email}
            </Typography.Paragraph>
          </View>
        </View>
      </View>

      <Button
        variant="outline"
        isDisabled={logoutMutation.isPending}
        onPress={() => logoutMutation.mutate()}
      >
        <Button.Label>{t("logout")}</Button.Label>
      </Button>
    </ScrollView>
  );
}
