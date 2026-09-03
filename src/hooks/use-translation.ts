import { useTranslation as useI18nTranslation } from "react-i18next";

import type { Language } from "@/lib/i18n";
import { LOCALE_TAG } from "@/lib/i18n";

export function useTranslation(ns?: string | string[]) {
  const { t, i18n } = useI18nTranslation(ns);
  const language = i18n.language as Language;

  return {
    t,
    language,
    localeTag: LOCALE_TAG[language],
  };
}
