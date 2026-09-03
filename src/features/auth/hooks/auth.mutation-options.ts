import { mutationOptions } from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/auth.api";

export const authMutationOptions = {
  login: mutationOptions({
    mutationFn: authApi.login,
  }),
};
