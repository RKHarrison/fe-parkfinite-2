import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

type CustomDrawerNavigationHeaderProps = {
  navigation: DrawerNavigationProp<any>;
  screenTitle: string
};


export default function CustomDrawerNavigationHeader({
  navigation, screenTitle
}: CustomDrawerNavigationHeaderProps) {
  const { user } = useContext(UserContext);
    console.log(screenTitle);
    
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
  screenTitle: {
    flex:1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "500",
    color: "#193419", 
  }
});
