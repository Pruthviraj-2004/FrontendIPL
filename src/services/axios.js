import axios from "axios";
import { logout } from "../store/actions/user";
import store from "../store";

const api = axios.create({
  baseURL: "https://predictiveplaybackendpractice.pythonanywhere.com",
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    // Ignore auth endpoints
    if (
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/register") ||
      originalRequest.url.includes("/refresh")
    ) {
      return Promise.reject(error);
    }

    // Only handle 401 once
    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh already happening, queue request
    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber(() => resolve(api(originalRequest)));
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/api/v2/refresh/");

      isRefreshing = false;
      onTokenRefreshed();

      return api(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      refreshSubscribers = [];

      // Clear redux auth state
      store.dispatch(logout());

      const currentPath = window.location.pathname;

      // Prevent redirect loops
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.replace("/#/register");
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;