import { save, getValueFor } from "../../../utils/expoSecureStore";
import { getJsonWebToken } from "@/services/api/authApi";
import { Button } from "@/components/Button";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { getUserAccountDataById } from "@/services/api/usersApi";
import { UserContext } from "@/contexts/UserContext";

interface UserLoginFormProps {
  setIsLoggedIn: (isLoggedIn: Boolean) => void;
}

export default function UserLoginForm({ setIsLoggedIn }: UserLoginFormProps) {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function handleLogin() {
    try {
      const token = await getJsonWebToken(usernameInput, passwordInput);
      console.log('GOT', token);
      
      await save("bearerToken", token.access_token);
      setUsernameInput("");
      setPasswordInput("");
      setIsLoggedIn(true);
      getUserAccountDataById(token.user_id).then(res => (
        setUser(res)
      ))
      alert("Login successful!");
    } catch (error) {
      alert("Login unsuccsessful. Please check your username and password.");
    }
  }

  useEffect(()=>{
    console.log('user', user);
  }, [user])

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
