import { type ThemeColor, useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  className?: string;
  type?: ThemeColor;
};

export function ThemedView({
  className,
  style,
  type,
  ...otherProps
}: ThemedViewProps): JSX.Element {
  const backgroundColor = useThemeColor(type ?? "background");

  return <View className={className} style={[{ backgroundColor }, style]} {...otherProps} />;
}
