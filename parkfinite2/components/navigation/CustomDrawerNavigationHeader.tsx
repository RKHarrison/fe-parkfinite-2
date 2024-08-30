import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";

type CustomDrawerNavigationHeaderProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function CustomDrawerNavigationHeader({
  navigation,
}: CustomDrawerNavigationHeaderProps) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.headerContainer}>
      {user ? (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("@/assets/images/dummy_profile_pic.jpeg")}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <Ionicons
          name="menu"
          size={28}
          onPress={() => navigation.openDrawer()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 65,
    paddingVertical: 5,
    paddingTop: 25,
    backgroundColor: "#afcfaf",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
    borderRadius: 50,
  },
});
