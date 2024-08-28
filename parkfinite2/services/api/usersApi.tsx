import axios from "axios";
import * as SecureStore from "expo-secure-store";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-2-api.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

parkfinite2Api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("bearerToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

export const getUserAccountDataById = (userId: string) => {
  return parkfinite2Api
    .get(`/users/${userId}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
