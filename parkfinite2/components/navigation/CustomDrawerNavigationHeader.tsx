import { useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { UserContext } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


type CustomDrawerNavigationHeaderProps = {
  navigation: DrawerNavigationProp<any>;
  screenTitle: string;
};

export default function CustomDrawerNavigationHeader({
  navigation,
  screenTitle,
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
          color={"#123b12"}
          onPress={() => navigation.openDrawer()}
        />
      )}
      <Text style={styles.screenTitle}>{screenTitle}</Text>
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
    backgroundColor: "#badeba",

    // IOS SHADOW
    shadowColor: "#000", // Black shadow color
    shadowOffset: { width: 0, height: 2 }, // Slightly larger offset
    shadowOpacity: 0.15, // Slightly lighter shadow opacity
    shadowRadius: 4, // Slightly larger blur radius
    // ANDROID SHADOW
    elevation: 7, // Adds shadow effect on Android
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
    width: 35,
    height: 35,
    marginHorizontal: 2,
    borderRadius: 50,
  },
  screenTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#123b12",
  },
});
