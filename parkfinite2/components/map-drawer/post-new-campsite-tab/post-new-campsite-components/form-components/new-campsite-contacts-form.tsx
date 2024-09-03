import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { CampsiteContactPostRequest } from "@/types/api-data-types/campsite-types";
import { Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@/components/Button";

type NewCampsiteContacts = CampsiteContactPostRequest[];

type NewCampsiteContactsFormProps = {
  setFormStep: (step: number) => void;
  setNewCampsiteData: (data: any) => void;
  newCampsiteName: string;
};

export default function NewCampsiteContactsForm({
  setFormStep,
  setNewCampsiteData,
  newCampsiteName,
}: NewCampsiteContactsFormProps) {
  const [contactsList, setContactsList] = useState<
    CampsiteContactPostRequest[]
  >([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CampsiteContactPostRequest>();

  function handleAddContact(newContact: CampsiteContactPostRequest) {
    setContactsList((contactsList) => [...contactsList, newContact]);

    reset();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>
        Step 3 (optional) - Enter contact(s) for {newCampsiteName}
      </Text>
      <ScrollView>
        <Text style={styles.fieldTitleText}>
          Enter a name for the contact assosciated with your spot...
        </Text>
        <Controller
          control={control}
          name="contact_name"
          rules={{
            required: "Campsite name is required",
            minLength: {
              value: 4,
              message:
                "Minimum length for campsite name or summary is 4 characters",
            },
            maxLength: {
              value: 200,
              message: "Max length for a name input is 200 characters.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Enter contact name..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.contact_name && (
          <Text style={styles.errorText}>{errors.contact_name.message}</Text>
        )}
        <Text style={styles.fieldTitleText}>
          Enter a telephone number for this contact...
        </Text>
        <Controller
          control={control}
          name="contact_number"
          rules={{
            required: "A telephone number is required.",
            pattern: {
              value:
                /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?)?\d{1,4}[-.\s]?\d{1,9}$/,
              message: "Please enter a valid telephone mumber.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Enter contact's telephone number..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.contact_number && (
          <Text style={styles.errorText}>{errors.contact_number.message}</Text>
        )}
        <Text style={styles.fieldTitleText}>
          Enter an email for this contact... (optional)
        </Text>
        <Controller
          control={control}
          name="contact_email"
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Enter contact's email..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.contact_email && (
          <Text style={styles.errorText}>{errors.contact_email.message}</Text>
        )}
      </ScrollView>
      <Button
        title="Add a new contact to campsite list"
        onPress={handleSubmit(handleAddContact)}
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
