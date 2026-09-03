import type { JSX } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { HeroUINativeProvider } from "heroui-native";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { authQueryOptions } from "@/features/auth/hooks/auth.query-options";
import { LoginScreen } from "@/features/auth/components/login-screen";
import { queryClient } from "@/lib/react-query";
import { setupMockApiIfEnabled } from "@/mocks/mock-client";
import "@/lib/i18n";

import "../global.css";

setupMockApiIfEnabled();

function RootNavigator(): JSX.Element | null {
  const sessionQuery = useQuery(authQueryOptions.session);

  if (sessionQuery.isLoading) {
    return null;
  }

  return sessionQuery.data ? <Slot /> : <LoginScreen />;
}

export default function RootLayout(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <HeroUINativeProvider>
            <RootNavigator />
          </HeroUINativeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
