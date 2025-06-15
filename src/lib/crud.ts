import apiClient from './apiClient';
import { toast } from 'react-toastify';

export function createAbortable<T>(
  request: (signal: AbortSignal) => Promise<T>
) {
  const controller = new AbortController();

  const promise = request(controller.signal).catch(error => {
    if (error.name === 'CanceledError') {
      console.warn('Request was cancelled');
    } else {
      toast.error(`Error: ${error.message}`);
      console.error(error);
    }
    throw error;
  });

  return { promise, abort: () => controller.abort() };
}

// CRUD
export const crud = {
  get: <T = any>(url: string, signal?: AbortSignal) =>
    apiClient.get<T>(url, { signal }).then(res => res.data),

  post: <T = any>(url: string, data: any, signal?: AbortSignal) =>
    apiClient.post<T>(url, data, { signal }).then(res => res.data),

  put: <T = any>(url: string, data: any, signal?: AbortSignal) =>
    apiClient.put<T>(url, data, { signal }).then(res => res.data),

  del: <T = any>(url: string, signal?: AbortSignal) =>
    apiClient.delete<T>(url, { signal }).then(res => res.data),
};
