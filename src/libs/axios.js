import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const router = useRouter();
    if (error.response && error.response.status === 401) {
      console.warn("User is not authenticated. Redirecting to login...");
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
