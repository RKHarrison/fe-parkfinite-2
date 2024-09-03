import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { UserContext } from "@/contexts/UserContext";
import UserLoginForm from "./account-screen-components/user-login-form";
import UserAccountCard from "./account-screen-components/user-account-card";
import { Button } from "../Button";

export default function AccountScreen() {
  const {user, logout} = useContext(UserContext)

  return (
    <SafeAreaView>
      {!user && <UserLoginForm/>}
      {user && <UserAccountCard/>}
      {user && <Button title={"Log out"} onPress={logout}/>}
    </SafeAreaView>
  );
}
