import axios from "axios";
import {
  Campsite,
  CampsitePostRequest,
  CampsiteReview,
  CampsiteReviewPostRequest,
} from "@/types/api-data-types/campsite-types";
import { router } from "expo-router";
import { getToken } from "@/utils/tokenUtils";

const parkfinite2Api = axios.create({
  baseURL: "https://parkfinite-2-api.onrender.com/",
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

parkfinite2Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      alert("Please log in again, session has expired.");
      router.push("/(drawer)/account");
    }
    return Promise.reject(error);
  }
);

export const postCampsite = (newCampsiteData: CampsitePostRequest) => {
  return parkfinite2Api
    .post("/campsites", newCampsiteData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("API Error", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data.detail,
      });
      if (error.status === 401) {
        alert("Please log in again, session has expired.");
        router.push("/(drawer)/account");
      }
      return Promise.reject(error);
    });
};

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
      return Promise.reject(error);
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
      return Promise.reject(error);
    });
}

export function postReviewByCampsiteId(
  campsiteId: number,
  review: CampsiteReviewPostRequest
) {
  return parkfinite2Api
    .post<CampsiteReview>(`/campsites/${campsiteId}/reviews`, review)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("API Error", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return Promise.reject(error);
    });
}

export function getReviewsByCampsiteId(campsiteId: number) {
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
      return Promise.reject(error);
    });
}
