import apiClient from './apiClient';
import { UploadClient } from '@uploadcare/upload-client';

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export const uploadFile = async (file: File) => {
  if (!UPLOADCARE_PUBLIC_KEY) {
    throw new Error(
      'Uploadcare Public Key is not set in .env.VITE_UPLOADCARE_PUBLIC_KEY'
    );
  }

  const client = new UploadClient({ publicKey: UPLOADCARE_PUBLIC_KEY });

  try {
    // 上傳檔案到 Uploadcare
    const uploadcareFile = await client.uploadFile(file);

    // Uploadcare 返回的永久 CDN URL
    const permanentUploadcareUrl = uploadcareFile.cdnUrl;

    if (!permanentUploadcareUrl) {
      throw new Error('Uploadcare did not return a valid CDN URL.');
    }

    // 將 Uploadcare 的永久 URL 儲存到 JSON Server
    const jsonServerResponse = await apiClient.post('/uploads', {
      name: file.name,
      size: file.size,
      type: file.type,
      createdAt: new Date().toISOString(),
      url: permanentUploadcareUrl, // 使用 Uploadcare 返回的永久 URL
    });

    return jsonServerResponse.data;
  } catch (error) {
    console.error('File upload process failed:', error);
    throw error;
  }
};
