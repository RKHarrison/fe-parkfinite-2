import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

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
              drawerIcon: ({size, color}) => (<Ionicons name="map-outline" size={size} color={color}/>)
            }}
          />
          <Drawer.Screen
            name="account"
            options={{
              drawerLabel: user ? "My Account" : "Login",
              title: user ? "Account Details" : "Login Page",
              drawerIcon: ({size, color}) => (<Ionicons name="person-outline" size={size} color={color}/>)
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: "Settings",
              title: "Settings",
              drawerIcon: ({size, color}) => (<Ionicons name="settings-outline" size={size} color={color}/>)
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
  );
}