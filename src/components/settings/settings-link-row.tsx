import { ListGroup } from "heroui-native";
import type { JSX } from "react";

export function SettingsLinkRow({
  title,
  description,
  onPress,
}: {
  title: string;
  description?: string;
  onPress: () => void;
}): JSX.Element {
  return (
    <ListGroup.Item onPress={onPress}>
      <ListGroup.ItemContent>
        <ListGroup.ItemTitle>{title}</ListGroup.ItemTitle>
        {description && <ListGroup.ItemDescription>{description}</ListGroup.ItemDescription>}
      </ListGroup.ItemContent>
      <ListGroup.ItemSuffix />
    </ListGroup.Item>
  );
}
