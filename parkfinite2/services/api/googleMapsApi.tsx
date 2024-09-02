import axios from "axios";

const googleMapsApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
});

export const getAddressFromCoordinate = (coordinate) => {
  const apikey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  return googleMapsApi
    .get(
      `geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${apikey}`
    )
    .then((res) => {
      const address = res.data.results[0].formatted_address;
      console.log(address);
    })
    .catch((error) => {
      console.error("Failed to fetch address", error);
      throw error;
    });
};
