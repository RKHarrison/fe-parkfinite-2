import React, { createContext, useState, ReactNode } from "react";

type CustomCoordinates = { longitude: number; latitude: number };

interface CustomCoordinatesContext {
  customCoordinates: CustomCoordinates | null;
  setCustomCoordinates: React.Dispatch<
    React.SetStateAction<CustomCoordinates | null>
  >;
}
interface CustomCoordinateProviderProps {
  children: ReactNode;
}

export const CustomCoordinatesContext = createContext<CustomCoordinatesContext>({
  customCoordinates: null,
  setCustomCoordinates: () => {},
});

export const CustomCoordinatesProvider: React.FC<
  CustomCoordinateProviderProps
> = ({ children }) => {
  const [customCoordinates, setCustomCoordinates] =
    useState<CustomCoordinates | null>(null);

  return (
    <CustomCoordinatesContext.Provider
      value={{ customCoordinates, setCustomCoordinates }}
    >
      {children}
    </CustomCoordinatesContext.Provider>
  );
};
