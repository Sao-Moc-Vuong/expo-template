import AsyncStorage from "@react-native-async-storage/async-storage";

import type { AuthSession } from "@/features/auth/types";

const SESSION_KEY = "expo-template/session";

export async function getStoredSession(): Promise<AuthSession | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  return JSON.parse(raw) as AuthSession;
}

export async function setStoredSession(session: AuthSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearStoredSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
