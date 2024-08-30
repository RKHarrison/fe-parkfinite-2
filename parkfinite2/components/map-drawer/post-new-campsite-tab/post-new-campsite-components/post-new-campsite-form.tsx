import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@/components/Button";

type FormData = {
  campsiteName: string;
  campsiteDescription: string;
  campsiteCategory: string;
};

export default function PostNewCampsiteForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
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
            message:
              "Minimum length for campsite name or summary is 4 characters",
          },
          maxLength: {
            value: 35,
            message: "Max length for campsite name or summary is 35 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
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

      <Controller
        control={control}
        name="campsiteDescription"
        rules={{
          required: "A description of the campsite or parking spot is required",
          minLength: {
            value: 10,
            message: "Minimum length for description is 10 characters",
          },
          maxLength: {
            value: 150,
            message: "Max length for description is 150 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Enter a description of your new spot..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.campsiteDescription && (
        <Text style={{ color: "red" }}>
          {errors.campsiteDescription.message}
        </Text>
      )}

      <Controller
        control={control}
        name="campsiteCategory"
        rules={{
          required: "A category is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              onBlur={onBlur}
              onValueChange={onChange}
              selectedValue={value}
            >
              <Picker.Item
                style={styles.picker}
                label="Select a location..."
                value=""
                enabled={false}
              />
              <Picker.Item label="In Nature" value={1} />
              <Picker.Item label="Car Park" value={2} />
              <Picker.Item label="Car Park (day only)" value={3} />
              <Picker.Item label="Motorway Rest Stop" value={4} />
              <Picker.Item label="Free Motor Area" value={5} />
              <Picker.Item label="Paid Motor Area" value={6} />
              <Picker.Item label="Private Campervan Spot" value={7} />
              <Picker.Item label="Camping/Caravan Site" value={8} />
              <Picker.Item label="Picnic Area" value={9} />
              <Picker.Item label="On The Beach" value={10} />
            </Picker>
          </View>
        )}
      />
      {errors.campsiteCategory && (
        <Text style={{ color: "red" }}>{errors.campsiteCategory.message}</Text>
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
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: "60%",
  },
  picker: { padding: 0 },
  pickerWrapper: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: "60%",
    justifyContent: "center"
  },
});
