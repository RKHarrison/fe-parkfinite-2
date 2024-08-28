import {
  JwtResponse,
} from "@/types/api-data-types/auth-types";
import axios from "axios";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-2-api.onrender.com/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getJsonWebToken = (username: string, password: string) => {
  const params = new URLSearchParams({
    username: username,
    password: password,
  });

  return parkfinite2Api
    .post<JwtResponse>("/auth/token", params)
    .then((res) => {
      const jwt = res.data;
      console.log(jwt);
      
      return jwt;
    })
    .catch((error) => {
      console.error("API Error", {
        message: error.response?.data?.detail
          ? error.response.data.detail[0].msg
          : error.message,
        status: error.response?.status,
      });
      throw error;
    });
};
