// global.d.ts
import { AxiosInstance } from 'axios';

declare global {
  interface Window {
    apiClient: AxiosInstance;
  }
}

export {};
