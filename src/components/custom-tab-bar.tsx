import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CustomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps): JSX.Element {
  const [background, surface, border, accent, accentForeground, muted] = useThemeColor([
    "background",
    "surface",
    "border",
    "accent",
    "accent-foreground",
    "muted",
  ]);

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: background, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <View style={[styles.container, { backgroundColor: surface, borderColor: border }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const iconColor = isFocused ? accentForeground : muted;

          return (
            <AnimatedPressable
              key={route.key}
              layout={LinearTransition.springify().mass(0.5)}
              onPress={onPress}
              style={[styles.tabItem, { backgroundColor: isFocused ? accent : "transparent" }]}
            >
              <View style={styles.iconSlot}>
                {options.tabBarIcon?.({ color: iconColor, focused: isFocused, size: 22 })}
              </View>
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.duration(150)}
                  exiting={FadeOut.duration(100)}
                  style={[styles.label, { color: accentForeground }]}
                >
                  {label}
                </Animated.Text>
              )}
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 26,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
  },
});
