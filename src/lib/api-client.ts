import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { env } from "@/configs/env.config";
import { getAccessToken } from "@/lib/auth-token";
import { ApiError } from "@/lib/api-error";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

// The response interceptor below unwraps `AxiosResponse` down to just the
// payload, so every request method here returns `Promise<T>` directly
// instead of axios' default `Promise<AxiosResponse<T>>`.
type UnwrappedApiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
};

// Exposed separately (typed as a plain `AxiosInstance`) so infra code that
// needs the real axios shape — e.g. `axios-mock-adapter` — isn't fighting the
// `UnwrappedApiClient` cast that `apiClient` below uses for feature code.
// eslint-disable-next-line import/no-named-as-default-member
export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15000,
});

const instance = axiosInstance;

export const apiClient = instance as unknown as UnwrappedApiClient;

instance.interceptors.request.use((config) => {
  if (!config.skipAuth) {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new ApiError("Request timed out", "TIMEOUT"));
    }
    if (!error.response) {
      return Promise.reject(new ApiError(error.message, "NETWORK"));
    }
    const { status, data } = error.response;
    return Promise.reject(
      new ApiError(data?.message ?? error.message, data?.code ?? "UNKNOWN", status)
    );
  }
);
