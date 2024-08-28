import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Campsite, CampsiteReview } from "@/types/api-data-types/campsite-types";
import { longPressHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-2-api.onrender.com/",
});

parkfinite2Api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('bearerToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export function getCampsiteById(campsiteId: string | string[]) {
  return parkfinite2Api
    .get<Campsite>(`/campsites/${campsiteId}`)
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
}

export function getReviewsByCampsiteId(campsiteId: string | string[]) {
  return parkfinite2Api
    .get<CampsiteReview[]>(`/campsites/${campsiteId}/reviews`)
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
}
