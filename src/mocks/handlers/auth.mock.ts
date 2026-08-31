import type MockAdapter from "axios-mock-adapter";

import { mockAccessTokenFor, seedUsers, toPublicUser } from "@/mocks/seed/users.seed";

const ONE_HOUR_MS = 60 * 60 * 1000;

export function registerAuthMockHandlers(mock: MockAdapter): void {
  mock.onPost("/auth/login").reply((config) => {
    const { email, password } = JSON.parse(config.data ?? "{}");
    const user = seedUsers.find((u) => u.email === email && u.password === password);

    if (!user) {
      return [401, { message: "Invalid email or password", code: "INVALID_CREDENTIALS" }];
    }

    return [
      200,
      {
        data: {
          accessToken: mockAccessTokenFor(user.id),
          expiresAt: Date.now() + ONE_HOUR_MS,
          user: toPublicUser(user),
        },
      },
    ];
  });
}
