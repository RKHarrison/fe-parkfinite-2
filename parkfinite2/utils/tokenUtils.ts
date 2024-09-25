import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native"; // To detect platform

// Function to get the token
export async function getToken() {
    if (Platform.OS === "web") {
      return localStorage.getItem("bearerToken");
    } else {
      return await SecureStore.getItemAsync("bearerToken");
    }
  }
  // Function to set the token
  export async function setToken(token: string) {
    if (Platform.OS === "web") {
      localStorage.setItem("bearerToken", token);
    } else {
      await SecureStore.setItemAsync("bearerToken", token);
    }
  }
  // Function to delete the token
  export async function deleteToken() {
    if (Platform.OS === "web") {
      localStorage.removeItem("bearerToken");
    } else {
      await SecureStore.deleteItemAsync("bearerToken");
    }
  }