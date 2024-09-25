import axios from "axios";
import { getToken } from "@/utils/tokenUtils";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-2-api.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

parkfinite2Api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserAccountDataById = (userId: string) => {
  return parkfinite2Api
    .get(`/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching user account data:", error);
      throw error;
    });
};
