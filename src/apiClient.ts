import axios, { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: '/api/v1'
});

// Intercept requests to add Authorization header if access token is present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Safely retrieve access token from localStorage
    const persistData = localStorage.getItem('persist:ecom');
    const accessToken = persistData
      ? JSON.parse(JSON.parse(persistData).auth).accessToken
      : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default apiClient;
