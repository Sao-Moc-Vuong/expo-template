import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps, JSX } from "react";
import type { ColorValue } from "react-native";

import { CustomTabBar } from "@/components/custom-tab-bar";
import { useTranslation } from "@/hooks/use-translation";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

function tabIcon(activeName: IoniconName, inactiveName: IoniconName) {
  return function TabIcon({ color, focused }: { color: ColorValue; focused: boolean }): JSX.Element {
    return <Ionicons name={focused ? activeName : inactiveName} size={22} color={color} />;
  };
}

export default function TabsLayout(): JSX.Element {
  const { t } = useTranslation("tabs");

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: t("home"), tabBarIcon: tabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: t("profile"), tabBarIcon: tabIcon("person", "person-outline") }}
      />
    </Tabs>
  );
}
