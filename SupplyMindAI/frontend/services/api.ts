import axios, { type AxiosError, type AxiosResponse } from "axios";

import type { ApiError, ApiResponse } from "@/types";

// ─── Axios Instance ───────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "v1";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // send cookies (refresh token httpOnly cookie)
});

// ─── Request Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Attach access token from memory store (implement in features phase)
    // const { accessToken } = useAuthStore.getState();
    // if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token),
  );
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // TODO: call refresh token endpoint and retry
        // const { data } = await apiClient.post("/auth/refresh");
        // store new token, processQueue(null, newToken);
        processQueue(null);
        return apiClient(originalRequest!);
      } catch (refreshError) {
        processQueue(refreshError);
        // TODO: redirect to /login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ─── Typed Helpers ────────────────────────────────────────────────────────────

export async function get<T>(url: string, params?: Record<string, unknown>) {
  const res = await apiClient.get<ApiResponse<T>>(url, { params });
  return res.data;
}

export async function post<T>(url: string, body?: unknown) {
  const res = await apiClient.post<ApiResponse<T>>(url, body);
  return res.data;
}

export async function put<T>(url: string, body?: unknown) {
  const res = await apiClient.put<ApiResponse<T>>(url, body);
  return res.data;
}

export async function patch<T>(url: string, body?: unknown) {
  const res = await apiClient.patch<ApiResponse<T>>(url, body);
  return res.data;
}

export async function del<T>(url: string) {
  const res = await apiClient.delete<ApiResponse<T>>(url);
  return res.data;
}
