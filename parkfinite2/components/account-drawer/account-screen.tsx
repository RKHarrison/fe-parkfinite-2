import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "@/contexts/UserContext";
import UserLoginForm from "./account-screen-components/user-login-form";
import UserAccountCard from "./account-screen-components/user-account-card";

export default function AccountScreen() {
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!user && <UserLoginForm />}
      {user && <UserAccountCard />}
    </SafeAreaView>
  );
}
