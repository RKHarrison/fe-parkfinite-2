import {Text} from "react-native"

export default function FieldAndDataText({ title, data }) {
  return (
    <Text>
      {title}
      <Text style={{ fontWeight: "bold" }}>{data && `: ${data}`}</Text>
    </Text>
  );
}
