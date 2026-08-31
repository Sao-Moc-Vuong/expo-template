import type { User } from "@/features/auth/types";

export type SeedUser = User & { password: string };

export const seedUsers: SeedUser[] = [
  { id: "1", name: "Admin", email: "admin@example.com", password: "password" },
  { id: "2", name: "User", email: "user@example.com", password: "password" },
];

export function toPublicUser(user: SeedUser): User {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

export function mockAccessTokenFor(userId: string): string {
  return `mock-token-${userId}`;
}

export function findUserByAccessToken(authHeader?: string): SeedUser | undefined {
  if (!authHeader) {
    return undefined;
  }
  const token = authHeader.replace("Bearer ", "");
  const userId = token.replace("mock-token-", "");
  return seedUsers.find((user) => user.id === userId);
}
