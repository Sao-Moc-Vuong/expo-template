import { MutationCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSettled: (_data, _error, _variables, _context, mutation) => {
      const { meta } = mutation.options;
      if (meta?.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: meta.invalidateQueries });
      }
      if (meta?.invalidateQueriesMultiple) {
        for (const queryKey of meta.invalidateQueriesMultiple) {
          queryClient.invalidateQueries({ queryKey });
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
