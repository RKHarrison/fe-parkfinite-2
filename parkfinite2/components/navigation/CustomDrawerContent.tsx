import { useContext } from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { UserContext } from "@/contexts/UserContext";

export default function CustomDrawerContent(props: any) {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#d8f3d8" }}
      >
        {user && (
          <View>
            <Image
              source={require("@/assets/images/dummy_profile_pic.jpeg")}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                borderRadius: 100,
                paddingTop: 20,
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
        <View style={{ backgroundColor: "white", paddingTop: 15 }}>
          <DrawerItemList {...props} />
          {user && <DrawerItem label={"Logout"} onPress={() => logout()} />}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
