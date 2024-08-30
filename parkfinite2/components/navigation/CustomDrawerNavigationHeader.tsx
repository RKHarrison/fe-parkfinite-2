import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TextInput } from "react-native";


export default function CustomDrawerNavigationHeader({navigation}) {

    return (
        <View style={styles.headerContainer}>
          <Ionicons
            name="menu"
            size={28}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 60,
        paddingVertical: 5,
        backgroundColor: '#d8f3d8',
      },
      searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 10,
      },
    });
    