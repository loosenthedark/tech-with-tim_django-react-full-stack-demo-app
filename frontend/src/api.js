import axios from "axios";

import { ACCESS_TOKEN } from "./constants";

// Axios interceptor logic for automatically adding correct headers to API requests
const api = axios.create({
  //   NB: In Vite, all environment variables need to start with the VITE_ prefix. This ensures that only variables explicitly meant for the frontend (the client-side React app) are exposed, preventing accidental leakage of sensitive server-side information.
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    // Getter method for adding auth header to requests (if token present in LS)
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
