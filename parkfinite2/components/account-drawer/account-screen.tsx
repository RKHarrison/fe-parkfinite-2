import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import UserLoginForm from "./user-login-form";

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
