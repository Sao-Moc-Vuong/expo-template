import { Skeleton } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

export function ListSkeleton({
  rows = 6,
  rowClassName = "h-20 w-full rounded-3xl",
}: {
  rows?: number;
  rowClassName?: string;
}): JSX.Element {
  return (
    <View className="gap-3 px-6 pt-2">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} isLoading className={rowClassName} />
      ))}
    </View>
  );
}
