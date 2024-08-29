import React, { createContext, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { getJsonWebToken } from "@/services/api/authApi";
import { getUserAccountDataById } from "@/services/api/usersApi";
import { save } from "@/utils/expoSecureStore";
import { UserAccountData } from "@/types/api-data-types/user-types";

interface LoggedInUser extends UserAccountData {
  username: string;
}
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<{
  user: LoggedInUser | null;
  setUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};