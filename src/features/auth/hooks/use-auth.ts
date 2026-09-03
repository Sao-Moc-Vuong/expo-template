import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearStoredSession, setStoredSession } from "@/lib/auth-session-storage";
import { setAccessToken } from "@/lib/auth-token";

import { authMutationOptions } from "@/features/auth/hooks/auth.mutation-options";
import { authQueryKeys } from "@/features/auth/hooks/auth.query-options";
import type { AuthSession } from "@/features/auth/types";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...authMutationOptions.login,
    onSuccess: async (session: AuthSession) => {
      setAccessToken(session.accessToken);
      await setStoredSession(session);
      queryClient.setQueryData(authQueryKeys.session, session);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      setAccessToken(null);
      await clearStoredSession();
    },
    onSuccess: () => {
      // Drop every non-auth query so no stale data leaks into the next
      // session, but avoid `queryClient.clear()` — it would also tear down
      // the live `session` query observer the root layout is subscribed to.
      queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== "auth" });
      queryClient.setQueryData(authQueryKeys.session, null);
    },
  });
}
