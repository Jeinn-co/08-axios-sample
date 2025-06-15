import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // or your own API
  timeout: 10000,
});

// Authorization: 自動加上 token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // or from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
