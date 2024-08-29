import React, { createContext, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { getJsonWebToken } from "@/services/api/authApi";
import { getUserAccountDataById } from "@/services/api/usersApi";
import { save } from "@/utils/expoSecureStore";
import { UserAccountData } from "@/types/api-data-types/user-types";

interface LoggedInUser extends UserAccountData {
  username: string;
}
interface UserContext {
  user: LoggedInUser | null;
  setUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
  login: (username: string, password: string) => Promise<void>;
}
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  login: async () => {}
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser| null>(null);

  const login = async (username: string, password: string) => {
    try {
      const token = await getJsonWebToken(username, password);
      await save("bearerToken", token.access_token);

      const userAccountData = await getUserAccountDataById(token.user_id);
      const userAccountWithUsername = {
        ...userAccountData,
        username: username,
      };

      setUser(userAccountWithUsername);
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};
