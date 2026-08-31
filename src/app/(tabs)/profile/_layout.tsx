import { Stack } from "expo-router";
import type { JSX } from "react";

export default function ProfileLayout(): JSX.Element {
  return <Stack screenOptions={{ headerShown: false }} />;
}
