import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function Layout() {
  const { user } = useContext(UserContext);

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: "Go to Map screen...",
              title: "Map",
            }}
          />
          <Drawer.Screen
            name="account"
            options={{
              drawerLabel: user ? "My Account" : "Login",
              title: user ? "Account Details" : "Login Page",
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: "Settings",
              title: "Settings",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
  );
}