import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { UserContext } from "@/contexts/UserContext";
import UserLoginForm from "./account-screen-components/user-login-form";

export default function AccountScreen() {
  const {user} = useContext(UserContext)

  return (
    <SafeAreaView>
      {!user && <UserLoginForm/>}
    </SafeAreaView>
  );
}
