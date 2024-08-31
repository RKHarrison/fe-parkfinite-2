import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Campsite, CampsitePostRequest, CampsiteReview } from "@/types/api-data-types/campsite-types";

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
    throw error;
  }
);

export const postCampsite = (newCampsiteData: CampsitePostRequest) => {
  return parkfinite2Api
    .post("/campsites", newCampsiteData)
    .then(()=> console.log('posted'))
    .catch((error) => {
      console.error("API Error", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data.detail
      });
      throw error;
    });
}

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
