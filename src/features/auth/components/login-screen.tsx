import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FieldError,
  InputGroup,
  Label,
  TextField,
  useThemeColor,
} from "heroui-native";
import type { JSX } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "@/hooks/use-translation";
import { useZodErrorMap } from "@/hooks/use-zod-error-map";

import { useLoginMutation } from "@/features/auth/hooks/use-auth";
import { LoginInputSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
import { ApiError } from "@/lib/api-error";

export function LoginScreen(): JSX.Element {
  const { t } = useTranslation("auth");
  const errorMap = useZodErrorMap();
  const loginMutation = useLoginMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [accent, accentForeground, muted] = useThemeColor(["accent", "accent-foreground", "muted"]);

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

  const submitError =
    loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.error
        ? t("login.genericError")
        : undefined;

  return (
    <ThemedView className="flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", default: "height" })}
          className="flex-1 justify-center gap-8 px-6"
        >
          <View className="items-center gap-4">
            <View
              className="h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: accent }}
            >
              <Ionicons name="finger-print" size={32} color={accentForeground} />
            </View>
            <View className="items-center gap-2">
              <ThemedText type="title" className="text-4xl">
                {t("login.appName")}
              </ThemedText>
              <ThemedText themeColor="muted">{t("login.subtitle")}</ThemedText>
            </View>
          </View>

          <View className="gap-4">
            {submitError && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{submitError}</Alert.Title>
                </Alert.Content>
              </Alert>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField isRequired isInvalid={!!errors.email}>
                  <Label>{t("login.email")}</Label>
                  <InputGroup className="rounded-field shadow-field">
                    <InputGroup.Prefix isDecorative>
                      <Ionicons name="mail-outline" size={16} color={muted} />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={t("login.emailPlaceholder")}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </InputGroup>
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </TextField>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField isRequired isInvalid={!!errors.password}>
                  <Label>{t("login.password")}</Label>
                  <InputGroup className="rounded-field shadow-field">
                    <InputGroup.Prefix isDecorative>
                      <Ionicons name="lock-closed-outline" size={16} color={muted} />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={t("login.passwordPlaceholder")}
                      secureTextEntry={!isPasswordVisible}
                      autoCapitalize="none"
                      autoComplete="password"
                    />
                    <InputGroup.Suffix>
                      <Pressable
                        onPress={() => setIsPasswordVisible((visible) => !visible)}
                        hitSlop={12}
                      >
                        <Ionicons
                          name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                          size={16}
                          color={muted}
                        />
                      </Pressable>
                    </InputGroup.Suffix>
                  </InputGroup>
                  {errors.password && <FieldError>{errors.password.message}</FieldError>}
                </TextField>
              )}
            />

            <Button onPress={onSubmit} isDisabled={loginMutation.isPending} className="mt-2">
              {!loginMutation.isPending && (
                <Ionicons name="log-in-outline" size={18} color={accentForeground} />
              )}
              <Button.Label>
                {loginMutation.isPending ? t("login.submitting") : t("login.submit")}
              </Button.Label>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
