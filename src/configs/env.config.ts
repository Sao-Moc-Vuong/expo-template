export const env = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.example.com",
  API_MOCK: process.env.EXPO_PUBLIC_API_MOCK !== "0",
};
