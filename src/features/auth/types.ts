export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  expiresAt: number;
  user: User;
};
