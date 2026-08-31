import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const TAB_ITEM_SIZE = 48;
const BAR_BOTTOM_OFFSET = 24;
const BAR_VERTICAL_PADDING = 10;

/** Chiều cao tab bar (icon + padding) cộng offset đáy — dùng làm padding-bottom
 * cho nội dung cuộn trong các tab dùng `BubbleTabBar`, vì bar nổi đè
 * (`position: absolute`) thay vì chiếm chỗ trong layout. */
export const BUBBLE_TAB_BAR_CLEARANCE =
  TAB_ITEM_SIZE + BAR_VERTICAL_PADDING * 2 + BAR_BOTTOM_OFFSET + 16;

/**
 * Tab bar icon-only kiểu "bong bóng" — mỗi tab có 1 vòng tròn indicator riêng
 * animate scale/opacity khi active, thay vì 1 pill nền trượt như `FloatingTabBar`.
 * Dựa theo D:\GitHub\custom-bottom-nav-bar-02.
 */
export function BubbleTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps): JSX.Element {
  const [accent, accentForeground, background] = useThemeColor([
    "accent",
    "accent-foreground",
    "background",
  ]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: accent, bottom: Math.max(insets.bottom, BAR_BOTTOM_OFFSET) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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

        return (
          <BubbleTabItem
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            icon={options.tabBarIcon}
            activeColor={accent}
            inactiveColor={accentForeground}
            indicatorColor={background}
          />
        );
      })}
    </View>
  );
}

function BubbleTabItem({
  isFocused,
  onPress,
  icon,
  activeColor,
  inactiveColor,
  indicatorColor,
}: {
  isFocused: boolean;
  onPress: () => void;
  icon: BottomTabBarProps["descriptors"][string]["options"]["tabBarIcon"];
  activeColor: string;
  inactiveColor: string;
  indicatorColor: string;
}): JSX.Element {
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isFocused ? 1 : 0) }],
    opacity: withTiming(isFocused ? 1 : 0),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isFocused ? 1.1 : 1) }],
  }));

  return (
    <Pressable onPress={onPress} style={styles.tabItem}>
      <Animated.View
        style={[styles.indicator, indicatorStyle, { backgroundColor: indicatorColor }]}
      />
      <Animated.View style={iconStyle}>
        {icon?.({
          focused: isFocused,
          color: isFocused ? activeColor : inactiveColor,
          size: 22,
        })}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    width: TAB_ITEM_SIZE,
    height: TAB_ITEM_SIZE,
  },
  indicator: {
    position: "absolute",
    width: TAB_ITEM_SIZE,
    height: TAB_ITEM_SIZE,
    borderRadius: TAB_ITEM_SIZE / 2,
  },
});
