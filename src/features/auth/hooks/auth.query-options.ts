import { queryOptions } from "@tanstack/react-query";

import { getStoredSession } from "@/lib/auth-session-storage";
import { setAccessToken } from "@/lib/auth-token";

import type { AuthSession } from "@/features/auth/types";

export const authQueryKeys = {
  session: ["auth", "session"] as const,
};

async function bootstrapSession(): Promise<AuthSession | null> {
  const session = await getStoredSession();
  if (!session || session.expiresAt <= Date.now()) {
    return null;
  }
  setAccessToken(session.accessToken);
  return session;
}

export const authQueryOptions = {
  session: queryOptions({
    queryKey: authQueryKeys.session,
    queryFn: bootstrapSession,
    staleTime: Infinity,
  }),
};
