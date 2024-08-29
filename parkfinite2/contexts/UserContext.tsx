import React, { createContext, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { save } from "@/utils/expoSecureStore";
import { getJsonWebToken } from "@/services/api/authApi";
import { getUserAccountDataById } from "@/services/api/usersApi";
import { UserAccountData } from "@/types/api-data-types/user-types";

interface LoggedInUser extends UserAccountData {
  username: string;
}
interface UserContext {
  user: LoggedInUser | null;
  setUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);

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

  const logout = async () => {
    setUser(null);
    SecureStore.deleteItemAsync("bearerToken");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
