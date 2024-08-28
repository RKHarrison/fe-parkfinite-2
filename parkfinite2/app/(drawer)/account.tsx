import { View } from "react-native";
import AccountScreen from "@/components/account-drawer/account-screen";

export default function Account() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AccountScreen />
    </View>
  );
}
