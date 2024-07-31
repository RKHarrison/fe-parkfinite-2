import axios from "axios";
import { Campsite } from "@/types/campsite";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-api.onrender.com",
});

export const getCampsites = () => {
  return parkfinite2Api
    .get<Campsite[]>("/campsites")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("API Error", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    });
};
