import axios from 'axios';
import { toast } from 'react-toastify'; // 如果你用的是 react-toastify
import { showToast } from '../utils/toastSingleton';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // JSON Server 的預設端口
  timeout: 10000,
});

// Request: 自動加上 token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // or from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request config error:', error);
    return Promise.reject(error);
  }
);

// Response: 統一處理錯誤
apiClient.interceptors.response.use(
  response => response, // 正常回傳直接通過
  error => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        toast.error('未授權，請重新登入');
        // 可以加上 router.push('/login') 或 localStorage.removeItem('token')
      } else if (status === 500) {
        toast.error('伺服器發生錯誤，請稍後再試');
      } else {
        toast.error(
          `錯誤代碼 ${status}：${error.response.data?.message || '請求失敗'}`
        );
      }
    } else if (error.request) {
      // toast.error('連線錯誤，伺服器無回應');
      showToast('error', '連線錯誤，伺服器無回應');
    } else {
      // toast.error(`請求發送錯誤：${error.message}`);
      console.warn('Request error:', error.message);
    }

    return Promise.reject(error); // 讓呼叫端仍可用 try/catch 捕捉
  }
);

export default apiClient;
