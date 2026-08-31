import { ListGroup } from "heroui-native";
import type { JSX, ReactNode } from "react";

export function SettingsRow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <ListGroup.Item className="items-center justify-between">
      <ListGroup.ItemContent>
        <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
      </ListGroup.ItemContent>
      {children}
    </ListGroup.Item>
  );
}
