import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { UserProvider } from "@/contexts/UserContext";

export default function Layout() {
  return (
    <UserProvider>
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
              drawerLabel: "My Account",
              title: "Account Page",
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
    </UserProvider>
  );
}
