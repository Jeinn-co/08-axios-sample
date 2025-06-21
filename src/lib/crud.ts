import apiClient from './apiClient';
import { toast } from 'react-toastify';

// 改善點：將錯誤處理抽出為函式，便於維護
function handleError(error: unknown) {
  if (
    error instanceof Error &&
    (error.name === 'CanceledError' || error.name === 'AbortError')
  ) {
    console.warn('Request was cancelled');
  } else if (error instanceof Error) {
    toast.error(`Error: ${error.message}`);
    console.error(error);
  } else {
    console.error('Unknown error:', error);
  }
}

export function createAbortable<T>(
  request: (signal: AbortSignal) => Promise<T>
) {
  const controller = new AbortController();

  const promise = request(controller.signal).catch(error => {
    handleError(error);
    throw error;
  });

  return { promise, abort: () => controller.abort() };
}

// CRUD 寫法保持簡潔，讓主要責任集中在 apiClient 層
export const crud = {
  get: <T = unknown>(url: string, signal?: AbortSignal) =>
    apiClient.get<T>(url, { signal }).then(res => res.data),

  post: <T = unknown>(url: string, data: unknown, signal?: AbortSignal) =>
    apiClient.post<T>(url, data, { signal }).then(res => res.data),

  put: <T = unknown>(url: string, data: unknown, signal?: AbortSignal) =>
    apiClient.put<T>(url, data, { signal }).then(res => res.data),

  patch: <T = unknown>(url: string, data: unknown, signal?: AbortSignal) =>
    apiClient.patch<T>(url, data, { signal }).then(res => res.data),

  del: <T = unknown>(url: string, signal?: AbortSignal) =>
    apiClient.delete<T>(url, { signal }).then(res => res.data),
};
