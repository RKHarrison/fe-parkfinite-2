import { UserContext } from "@/contexts/UserContext";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { View, Image, Text } from "react-native";

export default function CustomDrawerContent(props: any) {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#ebf9eb" }}
      >
        {user && (
          <View>
            <Image
              source={require("@/assets/images/dummy_profile_pic.jpeg")}
              style={{
                width: 120,
                height: 120,
                alignSelf: "center",
                borderRadius: 100,
                padding: 20,
                margin: 20,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "500",
                fontSize: 20,
                paddingTop: 5,
                paddingBottom: 25,
                color: "#2a892a",
              }}
            >
              Welcome {user.user_firstname}
            </Text>
          </View>
        )}
        <DrawerItemList {...props} />
        {user && <DrawerItem label={"Logout"} onPress={() => logout()} />}
      </DrawerContentScrollView>
    </View>
  );
}
