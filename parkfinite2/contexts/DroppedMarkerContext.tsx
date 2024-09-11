import React, { createContext, useState, ReactNode } from "react";

export type DroppedMarker = { longitude: number; latitude: number };

export interface DroppedMarkerContext {
  droppedMarker: DroppedMarker | null;
  setDroppedMarker: React.Dispatch<
    React.SetStateAction<DroppedMarker | null>
  >;
}
interface DroppedMarkerProviderProps {
  children: ReactNode;
}

export const DroppedMarkerContext = createContext<DroppedMarkerContext>({
  droppedMarker: null,
  setDroppedMarker: () => {},
});

export const DroppedMarkerProvider: React.FC<
  DroppedMarkerProviderProps
> = ({ children }) => {
  const [droppedMarker, setDroppedMarker] =
    useState<DroppedMarker | null>(null);

  return (
    <DroppedMarkerContext.Provider
      value={{ droppedMarker, setDroppedMarker }}
    >
      {children}
    </DroppedMarkerContext.Provider>
  );
};
