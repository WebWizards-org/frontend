import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

// DEBUG: log request/response for troubleshooting
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // temporary debug
    console.debug(
      "[axios] request:",
      config.method?.toUpperCase(),
      config.url,
      { hasToken: !!token }
    );
    return config;
  },
  (error) => {
    console.debug("[axios] request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.debug(
      "[axios] response:",
      response.config.url,
      response.status,
      response.data
    );
    return response;
  },
  (error) => {
    console.debug(
      "[axios] response error:",
      error?.response?.status,
      error?.response?.data
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
