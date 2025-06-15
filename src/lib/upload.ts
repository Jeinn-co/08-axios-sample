import apiClient from './apiClient';

export const uploadFile = async (file: File, signal?: AbortSignal) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post(
    'https://ptsv2.com/t/yourbucket/post',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      signal,
    }
  );

  return response.data;
};
