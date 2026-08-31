import { apiClient } from "@/lib/api-client";

import type { LoginInput } from "@/features/auth/schemas/auth.schema";
import type { AuthSession, User } from "@/features/auth/types";

export const authApi = {
  login: (payload: LoginInput): Promise<AuthSession> =>
    apiClient.post("/auth/login", payload, { skipAuth: true }),

  getMe: (): Promise<User> => apiClient.get("/me"),

  updateMe: (payload: Partial<Pick<User, "name" | "email">>): Promise<User> =>
    apiClient.put("/me", payload),

  changePassword: (payload: { currentPassword: string; newPassword: string }): Promise<User> =>
    apiClient.put("/me/password", payload),
};
