import { Ionicons } from "@expo/vector-icons";
import { type ThemeColor, type ToastShowOptions, useThemeColor, useToast } from "heroui-native";

type ToastVariant = "default" | "accent" | "success" | "warning" | "danger";

const ICON_NAME_BY_VARIANT: Record<ToastVariant, keyof typeof Ionicons.glyphMap> = {
  default: "information-circle-outline",
  accent: "information-circle",
  success: "checkmark-circle",
  warning: "warning",
  danger: "alert-circle",
};

const COLOR_TOKEN_BY_VARIANT: Record<ToastVariant, ThemeColor> = {
  default: "muted",
  accent: "accent",
  success: "success",
  warning: "warning",
  danger: "danger",
};

export function useAppToast() {
  const { toast, ...rest } = useToast();
  const [muted, accent, success, warning, danger] = useThemeColor([
    "muted",
    "accent",
    "success",
    "warning",
    "danger",
  ]);
  const colorByToken: Record<ThemeColor, string> = {
    muted,
    accent,
    success,
    warning,
    danger,
  } as Record<ThemeColor, string>;

  function show(options: string | ToastShowOptions) {
    if (typeof options === "string" || "component" in options) {
      return toast.show(options);
    }
    if (options.icon !== undefined) {
      return toast.show(options);
    }
    const variant = options.variant ?? "default";
    const color = colorByToken[COLOR_TOKEN_BY_VARIANT[variant]];
    return toast.show({
      ...options,
      icon: <Ionicons name={ICON_NAME_BY_VARIANT[variant]} size={18} color={color} />,
    });
  }

  return { ...rest, toast: { ...toast, show } };
}
