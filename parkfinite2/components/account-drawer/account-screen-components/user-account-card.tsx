import { useContext } from "react"
import { Text } from "react-native"
import { UserContext } from "@/contexts/UserContext"
import FieldAndDataText from "@/components/FieldAndDataText"

export default function UserAccountCard() {
    const {user} = useContext(UserContext)
    
    return (
        <>
        <Text>User account details for {user?.username}</Text>
        <FieldAndDataText title={"User"} data={`${user?.user_firstname} ${user?.user_lastname}`}/>
        <FieldAndDataText title={"Email"} data={user?.user_email}/>
        <FieldAndDataText title={"Parkfinite2 XP"} data={user?.xp}/>
        </>
    )
}