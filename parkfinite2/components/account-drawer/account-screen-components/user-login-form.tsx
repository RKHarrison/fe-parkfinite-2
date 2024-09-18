import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@/components/Button";

export default function UserLoginForm() {
  const { login } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function handleLogin() {
    try {
      await login(usernameInput, passwordInput)
      setUsernameInput("");
      setPasswordInput("");
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
