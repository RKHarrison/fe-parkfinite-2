import axios from "axios";
import { Campsite, CampsiteReview } from "@/types/api-data-types/campsite-types";

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
