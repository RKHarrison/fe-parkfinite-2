import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/Button";

type FormData = {
  campsiteName: string;
};

export default function PostNewCampsiteForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data:FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <View>
      <Text style={styles.title}>Post a new campsite...</Text>

      <Controller
        control={control}
        name="campsiteName"
        rules={{
          required: "Campsite name is required",
          minLength: {
            value: 4,
            message: "Minimum length for campsite name or summary is 4",
          },
        }}
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
      {errors.campsiteName && (
        <Text style={{ color: "red" }}>{errors.campsiteName.message}</Text>
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
