import type MockAdapter from "axios-mock-adapter";

import { findUserByAccessToken, toPublicUser } from "@/mocks/seed/users.seed";

export function registerProfileMockHandlers(mock: MockAdapter): void {
  mock.onGet("/me").reply((config) => {
    const user = findUserByAccessToken(config.headers?.Authorization);
    if (!user) {
      return [401, { message: "Unauthorized", code: "UNAUTHORIZED" }];
    }
    return [200, { data: toPublicUser(user) }];
  });

  mock.onPut("/me").reply((config) => {
    const user = findUserByAccessToken(config.headers?.Authorization);
    if (!user) {
      return [401, { message: "Unauthorized", code: "UNAUTHORIZED" }];
    }
    const updates = JSON.parse(config.data ?? "{}");
    Object.assign(user, updates);
    return [200, { data: toPublicUser(user) }];
  });
}
