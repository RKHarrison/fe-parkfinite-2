import React, { createContext, useState, ReactNode } from "react";

export const UserContext = createContext<[any, React.Dispatch<any>] | {}>({});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};