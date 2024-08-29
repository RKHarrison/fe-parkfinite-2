import { UserContext } from "@/contexts/UserContext";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { View, Image } from "react-native";

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
                margin:20
              }}
            />
          </View>
        )}
        <DrawerItemList {...props} />
        {user && <DrawerItem label={"logout"} onPress={() => logout()} />}
      </DrawerContentScrollView>
    </View>
  );
}
