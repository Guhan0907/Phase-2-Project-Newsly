import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: "https://api.nytimes.com",
  timeout: 8000,
  params: {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
  },
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    window.location.href = "/error";
    return Promise.reject(error);
  },
);

export default API;
