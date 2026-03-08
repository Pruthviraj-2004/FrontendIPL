import axios from "axios";

const api = axios.create({
  baseURL: "https://predictiveplaybackendpractice.pythonanywhere.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "/auth/refresh/",
          {},
          { withCredentials: true }
        );

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed");
        window.location.href = "/register";
      }
    }

    return Promise.reject(error);
  }
);

export default api;