import React, { createContext, useState, ReactNode } from "react";
import { getJsonWebToken } from "@/services/api/authApi";
import { getUserAccountDataById } from "@/services/api/usersApi";
import { UserAccountData } from "@/types/api-data-types/user-types";
import { router } from "expo-router";
import { setToken, deleteToken } from "@/utils/tokenUtils";

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
      await setToken(token.access_token);

      const userAccountData = await getUserAccountDataById(token.user_id);
      const userAccountWithUsername = {
        ...userAccountData,
        username: username,
      };

      setUser(userAccountWithUsername);
      router.push('/(drawer)/(tabs)/search/map');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    await deleteToken();
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
