import { UserContext } from "@/contexts/UserContext";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { useContext } from "react";

export default function CustomDrawerContent(props: any) {
  const {user, logout} = useContext(UserContext)

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      {user && <DrawerItem label={"logout"} onPress={() => logout()}/>}
    </DrawerContentScrollView>
  );
}
