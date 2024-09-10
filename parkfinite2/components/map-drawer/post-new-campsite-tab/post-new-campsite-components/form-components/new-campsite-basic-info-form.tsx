import { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";

import { UserContext } from "@/contexts/UserContext";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@/components/Button";

type BasicInfo = {
  campsite_name: string;
  description: string;
  category_id: string;
  parking_cost: string;
  facilities_cost: string;
  opening_month: string;
  closing_month: string;
};

type NewCampsiteBasicInfoFormProps = {
  setFormStep: (step: number) => void;
  newCampsiteData: any;
  setNewCampsiteData: (data: any) => void;
};

export const campsiteCategoryMap = new Map<number, string>([
  [1, "In Nature"],
  [2, "Car Park"],
  [3, "Car Park (day only)"],
  [4, "Motorway Rest Stop"],
  [5, "Free Motor Area"],
  [6, "Paid Motor Area"],
  [7, "Private Campervan Spot"],
  [8, "Camping/Caravan Site"],
  [9, "Picnic Area"],
  [10, "On The Beach"],
]);

export default function NewCampsiteBasicInfoForm({
  setFormStep,
  newCampsiteData,
  setNewCampsiteData,
}: NewCampsiteBasicInfoFormProps) {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const { user, logout } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfo>({
    defaultValues: {
      campsite_name: newCampsiteData.campsite_name,
      description: newCampsiteData.description,
      category_id: newCampsiteData.category_id,
      parking_cost: newCampsiteData.parking_cost,
      facilities_cost: newCampsiteData.facilities_cost,
      opening_month: newCampsiteData.opening_month,
      closing_month: newCampsiteData.closing_month,
    },
  });

  const onSubmit = (basicInfo: BasicInfo) => {
    if (!user) {
      alert("Please log in to submit a new campsite.");
      return;
    }
    const parsedInfo = {
      category_id: Number(basicInfo.category_id),
      parking_cost: parseFloat(basicInfo.parking_cost),
      facilities_cost: parseFloat(basicInfo.facilities_cost),
    };
    setNewCampsiteData((previousData) => ({
      ...previousData,
      ...basicInfo,
      ...parsedInfo,
    }));
    setFormStep(3);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>
        Step 2 - Enter basic info for your new spot:
      </Text>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <Text style={styles.fieldTitleText}>
            Enter a name for your new spot (e.g. 'A quiet beachside spot')...
          </Text>
          <Controller
            control={control}
            name="campsite_name"
            rules={{
              required: "Campsite name is required",
              minLength: {
                value: 4,
                message:
                  "Minimum length for campsite name or summary is 4 characters",
              },
              maxLength: {
                value: 35,
                message:
                  "Max length for campsite name or summary is 35 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                placeholder="Enter a name..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.campsite_name && (
            <Text style={styles.errorText}>{errors.campsite_name.message}</Text>
          )}

          <Text style={styles.fieldTitleText}>
            Enter a description (e.g. level parking, noise at night...)
          </Text>
          <Controller
            control={control}
            name="description"
            rules={{
              required:
                "A description of the campsite or parking spot is required",
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
                placeholder="Enter a description..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}

          <Text style={styles.fieldTitleText}>
            Select a category describing the type of spot...
          </Text>
          <Controller
            control={control}
            name="category_id"
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
                    label="Select a category..."
                    value={null}
                    enabled={false}
                  />
                  {Array.from(campsiteCategoryMap).map(([value, label]) => (
                    <Picker.Item
                      key={value}
                      value={value}
                      label={label}
                    />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.category_id && (
            <Text style={styles.errorText}>{errors.category_id.message}</Text>
          )}

          <Text style={styles.fieldTitleText}>
            Enter the cost of parking in GBP for one night (if applicable)...
          </Text>
          <Controller
            control={control}
            name="parking_cost"
            rules={{
              required:
                "Please specify a cost for parking; if free, specify 0.",
              pattern: {
                value: /^\d*\.?\d*$/,
                message: "Parking cost must be a valid number or decimal",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="Enter cost to park in £GBP..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? value.toString() : ""}
              />
            )}
          />
          {errors.parking_cost && (
            <Text style={styles.errorText}>{errors.parking_cost.message}</Text>
          )}

          <Text style={styles.fieldTitleText}>
            Enter the cost of using facilities for one day/night (if
            applicable)...
          </Text>
          <Controller
            control={control}
            name="facilities_cost"
            rules={{
              required:
                "Please specify a cost for using facilities; if free or none available specify 0",
              pattern: {
                value: /^\d*\.?\d*$/,
                message: "Parking cost must be a valid number or decimal",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="Enter cost to use facilities in £GBP..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? value.toString() : ""}
              />
            )}
          />
          {errors.facilities_cost && (
            <Text style={styles.errorText}>
              {errors.facilities_cost.message}
            </Text>
          )}

          <Text style={styles.fieldTitleText}>
            Select the month the spot opens for use (if applicable)...
          </Text>
          <Controller
            control={control}
            name="opening_month"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.pickerWrapper}>
                <Picker
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  <Picker.Item
                    label="Select opening month..."
                    value={null}
                    enabled={false}
                  />
                  <Picker.Item label="Not applicable." value={null} />
                  <Picker.Item label="January" value="Jan" />
                  <Picker.Item label="February" value="Feb" />
                  <Picker.Item label="March" value="Mar" />
                  <Picker.Item label="April" value="Apr" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="June" value="Jun" />
                  <Picker.Item label="July" value="Jul" />
                  <Picker.Item label="August" value="Aug" />
                  <Picker.Item label="September" value="Sep" />
                  <Picker.Item label="October" value="Oct" />
                  <Picker.Item label="November" value="Nov" />
                  <Picker.Item label="December" value="Dec" />
                </Picker>
              </View>
            )}
          />

          <Text style={styles.fieldTitleText}>
            Select the month the spot closes (if applicable)...
          </Text>
          <Controller
            control={control}
            name="closing_month"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.pickerWrapper}>
                <Picker
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  <Picker.Item
                    label="Select closing month..."
                    value={null}
                    enabled={false}
                  />
                  <Picker.Item label="Not applicable." value={null} />
                  <Picker.Item label="January" value="Jan" />
                  <Picker.Item label="February" value="Feb" />
                  <Picker.Item label="March" value="Mar" />
                  <Picker.Item label="April" value="Apr" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="June" value="Jun" />
                  <Picker.Item label="July" value="Jul" />
                  <Picker.Item label="August" value="Aug" />
                  <Picker.Item label="September" value="Sep" />
                  <Picker.Item label="October" value="Oct" />
                  <Picker.Item label="November" value="Nov" />
                  <Picker.Item label="December" value="Dec" />
                </Picker>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <Button title="Submit basic info..." onPress={handleSubmit(onSubmit)} />
      <Button
        title="Go back to choose location"
        onPress={() => {
          setFormStep(1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  scrollViewContainer: {
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    margin: 10,
    alignSelf: "center",
    backgroundColor: "darkseagreen",
    borderRadius: 10,
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fieldTitleText: {
    marginTop: 12,
    fontStyle: "italic",
    fontSize: 12,
    alignSelf: "center",
    color: "#123b12",
  },
  errorText: {
    color: "red",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 12,
  },
  textInput: {
    height: 40,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: "80%",
    backgroundColor: "#d8f3d8",
  },
  picker: { padding: 0 },
  pickerWrapper: {
    backgroundColor: "#d8f3d8",
    padding: 0,
    height: 40,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: "80%",
    justifyContent: "center",
  },
});
