import { Typography } from "heroui-native";
import type { JSX, ReactNode } from "react";

export function SettingsGroupLabel({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Typography.Paragraph type="body-xs" color="muted" className="px-4 pb-2 uppercase">
      {children}
    </Typography.Paragraph>
  );
}
