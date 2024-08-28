import { save, getValueFor } from "../../../utils/expoSecureStore";
import { getJsonWebToken } from "@/services/api/authApi";
import { Button } from "@/components/Button";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

interface UserLoginFormProps {
    setIsLoggedIn: (isLoggedIn:Boolean) => void;
}

export default function UserLoginForm({setIsLoggedIn}:UserLoginFormProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function handleLogin() {
    try {
      const token = await getJsonWebToken(usernameInput, passwordInput);
      await save("bearerToken", token.access_token);
      setUsernameInput("")
      setPasswordInput("")
      setIsLoggedIn(true)
      alert("Login successful!")
    } catch (error) {
      alert("Login unsuccsessful. Please check your username and password.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Please login to enable all features...</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsernameInput}
        value={usernameInput}
        placeholder="Please provide a valid username..."
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPasswordInput}
        value={passwordInput}
        placeholder="Please provide a valid password..."
        keyboardType="numeric"
      />
      <Button title="login" onPress={() => handleLogin()}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
