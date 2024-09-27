import { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "@/contexts/UserContext";
import FieldAndDataText from "@/components/FieldAndDataText";
import { Button } from "@/components/Button";

export default function UserAccountCard() {
  const { user, logout } = useContext(UserContext);

  return (
    <View>
      <Text>User account details for {user?.username}</Text>
      <FieldAndDataText
        title={"User"}
        data={`${user?.user_firstname} ${user?.user_lastname}`}
      />
      <FieldAndDataText title={"Email"} data={user?.user_email} />
      <FieldAndDataText title={"Parkfinite2 XP"} data={user?.xp} />
      <Button title={"Log out"} onPress={logout} />
    </View>
  );
}
