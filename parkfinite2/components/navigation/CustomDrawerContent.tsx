import { UserContext } from "@/contexts/UserContext";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { View } from "react-native";

export default function CustomDrawerContent(props: any) {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{backgroundColor: "#ebf9eb"}}
      >
        <DrawerItemList {...props}/>
        {user && <DrawerItem label={"logout"} onPress={() => logout()} />}
      </DrawerContentScrollView>
    </View>
  );
}
