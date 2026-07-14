import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import type { ApiError, ApiResponse } from '@/types';

// ─── Axios Instance ───────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // send httpOnly refresh-token cookie
});

// ─── Request Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Import lazily to avoid circular deps at module init time
    const { useAuthStore } = require('@/store/auth.store');
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Token Refresh Queue ──────────────────────────────────────────────────────

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

// ─── Response Interceptor ────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        // Queue this request while a refresh is in-flight
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiClient.post<ApiResponse<{ accessToken: string }>>(
          '/auth/refresh',
        );
        const newToken = data.data.accessToken;

        // Store new token in memory
        const { useAuthStore } = require('@/store/auth.store');
        useAuthStore.getState().setAccessToken(newToken);

        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Clear auth state and redirect to login
        const { useAuthStore } = require('@/store/auth.store');
        useAuthStore.getState().logout();

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }

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
