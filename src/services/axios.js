import axios from "axios";

const api = axios.create({
  baseURL: "https://predictiveplaybackendpractice.pythonanywhere.com",
  withCredentials: true,
});

// Track refresh state globally to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Function to notify all subscribers that token is refreshed
const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Function to add request to queue while refreshing
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors that haven't been retried yet
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/api/v2/refresh/");
      
      // Notify all queued requests to retry
      onTokenRefreshed();
      isRefreshing = false;
      
      // Retry the original request
      return api(originalRequest);
      
    } catch (refreshError) {
      isRefreshing = false;
      refreshSubscribers = [];
      console.log("Token refresh failed:", refreshError);
      console.log("Refresh failed");
      window.location.href = "/register";
      return Promise.reject(refreshError);
    }
  }
);

export default api;