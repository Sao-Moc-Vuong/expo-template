import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  FieldError,
  Input,
  InputGroup,
  Label,
  TextField,
  useThemeColor,
} from "heroui-native";
import type { JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { useAppToast } from "@/hooks/use-app-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useZodErrorMap } from "@/hooks/use-zod-error-map";

import { authApi } from "@/features/auth/api/auth.api";
import { authQueryKeys, authQueryOptions } from "@/features/auth/hooks/auth.query-options";
import {
  UpdateProfileInputSchema,
  type UpdateProfileInput,
} from "@/features/auth/schemas/auth.schema";
import { ApiError } from "@/lib/api-error";
import { setStoredSession } from "@/lib/auth-session-storage";

export function EditProfileForm({ onSaved }: { onSaved: () => void }): JSX.Element {
  const { toast } = useAppToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation("settings");
  const errorMap = useZodErrorMap();
  const accentForeground = useThemeColor("accent-foreground");
  const sessionQuery = useQuery(authQueryOptions.session);
  const updateMutation = useMutation({ mutationFn: authApi.updateMe });
  const user = sessionQuery.data?.user;

  const submitError =
    updateMutation.error instanceof ApiError
      ? updateMutation.error.message
      : updateMutation.error
        ? t("editProfile.submitError")
        : undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileInputSchema, { error: errorMap }),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const onSubmit = handleSubmit((values) => {
    updateMutation.mutate(values, {
      onSuccess: async (updatedUser) => {
        const session = sessionQuery.data;
        if (session) {
          const updatedSession = { ...session, user: updatedUser };
          await setStoredSession(updatedSession);
          queryClient.setQueryData(authQueryKeys.session, updatedSession);
        }
        onSaved();
        toast.show({ variant: "success", label: t("editProfile.toastSaved") });
      },
    });
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
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={!!errors.name}>
            <Label>{t("editProfile.nameLabel")}</Label>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={t("editProfile.namePlaceholder")}
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={!!errors.email}>
            <Label>{t("editProfile.emailLabel")}</Label>
            <InputGroup className="rounded-field shadow-field">
              <InputGroup.Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("editProfile.emailPlaceholder")}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </InputGroup>
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </TextField>
        )}
      />

      <Button onPress={onSubmit} isDisabled={updateMutation.isPending}>
        {!updateMutation.isPending && (
          <Ionicons name="save-outline" size={16} color={accentForeground} />
        )}
        <Button.Label>
          {updateMutation.isPending ? t("editProfile.saving") : t("editProfile.save")}
        </Button.Label>
      </Button>
    </View>
  );
}
