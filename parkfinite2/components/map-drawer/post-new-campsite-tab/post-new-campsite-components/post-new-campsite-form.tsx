import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/Button";

export default function PostNewCampsiteForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <View>
      <Text style={styles.title}>Post a new campsite...</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Campsite name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter campsite name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {errors.name && (
        <Text style={{ color: "red" }}>{errors.name.message}</Text>
      )}

      <Button
        title="Submit new campsite for approval..."
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: "60%",
  },
});
