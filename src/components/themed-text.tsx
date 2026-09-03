import { cn, type ThemeColor, useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Platform, Text, type TextProps } from "react-native";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

export type ThemedTextType =
  "default" | "title" | "small" | "smallBold" | "subtitle" | "link" | "linkPrimary" | "code";

export type ThemedTextProps = TextProps & {
  className?: string;
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({
  className,
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps): JSX.Element {
  const color = useThemeColor(themeColor ?? (type === "linkPrimary" ? "accent" : "foreground"));

  return (
    <Text
      className={cn(
        type === "default" && "text-base leading-6 font-medium",
        type === "title" && "text-5xl leading-13 font-semibold",
        type === "small" && "text-sm leading-5 font-medium",
        type === "smallBold" && "text-sm leading-5 font-bold",
        type === "subtitle" && "text-[32px] leading-11 font-semibold",
        type === "link" && "text-sm leading-7.5",
        type === "linkPrimary" && "text-sm leading-7.5",
        type === "code" && "text-xs",
        className
      )}
      style={[{ color }, type === "code" && { fontFamily: MONO_FONT }, style]}
      {...rest}
    />
  );
}
