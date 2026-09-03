import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAuth from "./locales/en/auth.json";
import enCommon from "./locales/en/common.json";
import enProfile from "./locales/en/profile.json";
import enSettings from "./locales/en/settings.json";
import enTabs from "./locales/en/tabs.json";
import enValidation from "./locales/en/validation.json";
import viAuth from "./locales/vi/auth.json";
import viCommon from "./locales/vi/common.json";
import viProfile from "./locales/vi/profile.json";
import viSettings from "./locales/vi/settings.json";
import viTabs from "./locales/vi/tabs.json";
import viValidation from "./locales/vi/validation.json";

export type Language = "vi" | "en";

export const LOCALE_TAG: Record<Language, string> = {
  vi: "vi-VN",
  en: "en-US",
};

const resources = {
  vi: {
    common: viCommon,
    tabs: viTabs,
    profile: viProfile,
    settings: viSettings,
    auth: viAuth,
    validation: viValidation,
  },
  en: {
    common: enCommon,
    tabs: enTabs,
    profile: enProfile,
    settings: enSettings,
    auth: enAuth,
    validation: enValidation,
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
