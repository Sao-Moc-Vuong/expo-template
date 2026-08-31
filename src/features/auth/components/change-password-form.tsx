import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { Pressable, View } from "react-native";

import { useAppToast } from "@/hooks/use-app-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useZodErrorMap } from "@/hooks/use-zod-error-map";

import { authApi } from "@/features/auth/api/auth.api";
import {
  ChangePasswordInputSchema,
  type ChangePasswordInput,
} from "@/features/auth/schemas/auth.schema";
import { ApiError } from "@/lib/api-error";

export function ChangePasswordForm({ onSaved }: { onSaved: () => void }): JSX.Element {
  const { toast } = useAppToast();
  const { t } = useTranslation("settings");
  const errorMap = useZodErrorMap();
  const [accentForeground, muted] = useThemeColor(["accent-foreground", "muted"]);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const changePasswordMutation = useMutation({ mutationFn: authApi.changePassword });

  const submitError =
    changePasswordMutation.error instanceof ApiError
      ? changePasswordMutation.error.message
      : changePasswordMutation.error
        ? t("changePassword.submitError")
        : undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordInputSchema, { error: errorMap }),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((values) => {
    changePasswordMutation.mutate(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      {
        onSuccess: () => {
          onSaved();
          toast.show({ variant: "success", label: t("changePassword.toastSaved") });
        },
      }
    );
  });

  return (
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
        name="currentPassword"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={!!errors.currentPassword}>
            <Label>{t("changePassword.currentPasswordLabel")}</Label>
            <InputGroup>
              <InputGroup.Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("changePassword.currentPasswordPlaceholder")}
                secureTextEntry={!isCurrentPasswordVisible}
                autoCapitalize="none"
              />
              <InputGroup.Suffix>
                <Pressable
                  onPress={() => setIsCurrentPasswordVisible((visible) => !visible)}
                  hitSlop={12}
                >
                  <Ionicons
                    name={isCurrentPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={16}
                    color={muted}
                  />
                </Pressable>
              </InputGroup.Suffix>
            </InputGroup>
            {errors.currentPassword && <FieldError>{errors.currentPassword.message}</FieldError>}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={!!errors.newPassword}>
            <Label>{t("changePassword.newPasswordLabel")}</Label>
            <InputGroup>
              <InputGroup.Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("changePassword.newPasswordPlaceholder")}
                secureTextEntry={!isNewPasswordVisible}
                autoCapitalize="none"
              />
              <InputGroup.Suffix>
                <Pressable onPress={() => setIsNewPasswordVisible((visible) => !visible)} hitSlop={12}>
                  <Ionicons
                    name={isNewPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={16}
                    color={muted}
                  />
                </Pressable>
              </InputGroup.Suffix>
            </InputGroup>
            {errors.newPassword && <FieldError>{errors.newPassword.message}</FieldError>}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={!!errors.confirmPassword}>
            <Label>{t("changePassword.confirmPasswordLabel")}</Label>
            <InputGroup>
              <InputGroup.Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("changePassword.confirmPasswordPlaceholder")}
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize="none"
              />
              <InputGroup.Suffix>
                <Pressable
                  onPress={() => setIsConfirmPasswordVisible((visible) => !visible)}
                  hitSlop={12}
                >
                  <Ionicons
                    name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={16}
                    color={muted}
                  />
                </Pressable>
              </InputGroup.Suffix>
            </InputGroup>
            {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
          </TextField>
        )}
      />

      <Button onPress={onSubmit} isDisabled={changePasswordMutation.isPending}>
        {!changePasswordMutation.isPending && (
          <Ionicons name="save-outline" size={16} color={accentForeground} />
        )}
        <Button.Label>
          {changePasswordMutation.isPending
            ? t("changePassword.saving")
            : t("changePassword.save")}
        </Button.Label>
      </Button>
    </View>
  );
}
