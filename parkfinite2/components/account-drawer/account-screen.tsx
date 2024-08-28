import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import UserLoginForm from "./account-screen-components/user-login-form";

export default function AccountScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(()=>{

  }, [isLoggedIn])

  return (
    <SafeAreaView>
      {!isLoggedIn && <UserLoginForm setIsLoggedIn={setIsLoggedIn}/>}
    </SafeAreaView>
  );
}
