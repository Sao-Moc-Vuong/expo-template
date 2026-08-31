import type { JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, FieldError, Input, Label, TextField } from "heroui-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, View } from "react-native";

import { useTranslation } from "@/hooks/use-translation";
import { useZodErrorMap } from "@/hooks/use-zod-error-map";

import { useLoginMutation } from "@/features/auth/hooks/use-auth";
import { LoginInputSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
import { ApiError } from "@/lib/api-error";

export function LoginScreen(): JSX.Element {
  const { t } = useTranslation("auth");
  const errorMap = useZodErrorMap();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema, { error: errorMap }),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-1 justify-center px-6 gap-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-1">
          <Label className="text-2xl font-semibold">{t("login.title")}</Label>
          <Label className="text-muted">{t("login.subtitle")}</Label>
        </View>

        <View className="gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!errors.email}>
                <Label>{t("login.email")}</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={t("login.emailPlaceholder")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
                <FieldError>{errors.email?.message}</FieldError>
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField isInvalid={!!errors.password}>
                <Label>{t("login.password")}</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={t("login.passwordPlaceholder")}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <FieldError>{errors.password?.message}</FieldError>
              </TextField>
            )}
          />
        </View>

        {loginMutation.error instanceof ApiError && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{loginMutation.error.message}</Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        <Button onPress={onSubmit} isDisabled={loginMutation.isPending}>
          <Button.Label>{t("login.submit")}</Button.Label>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
