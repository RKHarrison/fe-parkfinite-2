import { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
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
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
