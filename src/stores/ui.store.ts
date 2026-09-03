import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import i18n, { type Language } from "@/lib/i18n";

export type ThemePreference = "system" | "light" | "dark";

type UiState = {
  themePreference: ThemePreference;
  language: Language;
};

type UiActions = {
  setThemePreference: (themePreference: ThemePreference) => void;
  setLanguage: (language: Language) => void;
};

type UiSlice = UiState & { actions: UiActions };

function applyColorScheme(themePreference: ThemePreference): void {
  Appearance.setColorScheme(themePreference === "system" ? "unspecified" : themePreference);
}

const DEFAULT_UI_STATE: UiState = {
  themePreference: "system",
  language: "vi",
};

export const useUiStore = create<UiSlice>()(
  persist(
    (set) => ({
      ...DEFAULT_UI_STATE,
      actions: {
        setThemePreference: (themePreference) => {
          applyColorScheme(themePreference);
          set({ themePreference });
        },
        setLanguage: (language) => {
          i18n.changeLanguage(language);
          set({ language });
        },
      },
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themePreference: state.themePreference,
        language: state.language,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyColorScheme(state.themePreference);
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);
