import { Ionicons } from "@expo/vector-icons";
import { ListGroup, useThemeColor } from "heroui-native";
import type { JSX, ReactNode } from "react";

import { ThemedText } from "@/components/themed-text";

function GroupLabel({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemedText type="small" themeColor="muted" className="ml-2 uppercase">
      {children}
    </ThemedText>
  );
}

function Row({
  icon,
  title,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: ReactNode;
}): JSX.Element {
  const foreground = useThemeColor("foreground");

  return (
    <ListGroup.Item disabled className="items-start py-4">
      <ListGroup.ItemPrefix className="mt-0.5">
        <Ionicons name={icon} size={20} color={foreground} />
      </ListGroup.ItemPrefix>
      <ListGroup.ItemContent className="gap-3">
        <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
        {children}
      </ListGroup.ItemContent>
    </ListGroup.Item>
  );
}

function Link({
  icon,
  title,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}): JSX.Element {
  const foreground = useThemeColor("foreground");
  const muted = useThemeColor("muted");

  return (
    <ListGroup.Item onPress={onPress} className="items-center py-4">
      <ListGroup.ItemPrefix>
        <Ionicons name={icon} size={20} color={foreground} />
      </ListGroup.ItemPrefix>
      <ListGroup.ItemContent className="flex-1">
        <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
      </ListGroup.ItemContent>
      <Ionicons name="chevron-forward" size={18} color={muted} />
    </ListGroup.Item>
  );
}

export const ListRow = Object.assign(Row, {
  GroupLabel,
  Link,
});
