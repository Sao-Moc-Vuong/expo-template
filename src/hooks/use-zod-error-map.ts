import type { $ZodIssue, $ZodRawIssue } from "zod/v4/core";
import { useTranslation } from "react-i18next";

export function useZodErrorMap() {
  const { t } = useTranslation("validation");

  return (issue: $ZodRawIssue): string | undefined => {
    switch ((issue as $ZodIssue).code) {
      case "invalid_type":
        return t("required");
      case "too_small":
        return t("minLength", { count: (issue as $ZodIssue & { code: "too_small" }).minimum });
      case "too_big":
        return t("maxLength", { count: (issue as $ZodIssue & { code: "too_big" }).maximum });
      case "invalid_format": {
        const format = (issue as $ZodIssue & { code: "invalid_format" }).format;
        return format === "email" ? t("invalidEmail") : t("invalidFormat");
      }
      default:
        return undefined;
    }
  };
}
