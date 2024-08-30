import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "../../components/navigation/CustomDrawerContent";
import CustomDrawerNavigationHeader from "../../components/navigation/CustomDrawerNavigationHeader"

export default function Layout() {
  const { user } = useContext(UserContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={({ navigation }) => ({
          header: () => <CustomDrawerNavigationHeader navigation={navigation} />,
          drawerHideStatusBarOnOpen: true,
          drawerStatusBarAnimation: "fade",
          drawerActiveTintColor: "#2a892a",
          drawerLabelStyle: { marginLeft: -20 },
        })}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Go to Map screen...",
            title: "Map",
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "map" : "map-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="account"
          options={{
            drawerLabel: user ? "My Account" : "Login",
            title: user ? "Account Details" : "Login Page",
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
