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

const handleAuthFailure = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (e) {
    // ignore storage errors
  }
  // redirect to login
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

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

    const status = error?.response?.status;
    const message = String(error?.response?.data?.message || "").toLowerCase();

    // If unauthorized or token-related error, clear auth and redirect to login
    if (
      status === 401 ||
      message.includes("token") ||
      message.includes("expired") ||
      message.includes("jwt") ||
      message.includes("authentication required") ||
      message.includes("unauthorized")
    ) {
      handleAuthFailure();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
