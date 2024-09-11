import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import { CampsiteContactPostRequest } from "@/types/api-data-types/campsite-types";
import { Button } from "@/components/Button";
import { FORM_STEPS } from "@/constants/postCampsiteFormSteps";

type NewCampsiteContactsFormProps = {
  setFormStep: (step: number) => void;
  newCampsiteData: any;
  setNewCampsiteData: (data: any) => void;
};

export default function NewCampsiteContactsForm({
  setFormStep,
  newCampsiteData,
  setNewCampsiteData,
}: NewCampsiteContactsFormProps) {
  const [contactsList, setContactsList] = useState<
    CampsiteContactPostRequest[]
  >(newCampsiteData.contacts || []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CampsiteContactPostRequest>();

  function handleAddContact(newContact: CampsiteContactPostRequest) {
    setContactsList((prevContacts) => [...prevContacts, newContact]);
    reset();
  }
  function handleRemoveContact(index: number) {
    setContactsList((prevContacts) =>
      prevContacts.filter((_, i) => i !== index)
    );
  }
  function handleSubmitContactList() {
    setNewCampsiteData((previousData: any) => ({
      ...previousData,
      contacts: contactsList,
    }));
    setFormStep(FORM_STEPS.review);
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>
        Step 3 (optional) - Enter contact(s) for {newCampsiteData.campsite_name}
      </Text>
      <ScrollView>
        <Text style={styles.fieldTitleText}>
          Enter a name for the contact assosciated with your spot...
        </Text>
        <Controller
          control={control}
          name="campsite_contact_name"
          rules={{
            required: "Contact name is required",
            minLength: {
              value: 2,
              message:
                "Minimum length for campsite name or summary is 2 characters",
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
        {errors.campsite_contact_name && (
          <Text style={styles.errorText}>
            {errors.campsite_contact_name.message}
          </Text>
        )}
        <Text style={styles.fieldTitleText}>
          Enter a telephone number for this contact...
        </Text>
        <Controller
          control={control}
          name="campsite_contact_phone"
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
        {errors.campsite_contact_phone && (
          <Text style={styles.errorText}>
            {errors.campsite_contact_phone.message}
          </Text>
        )}
        <Text style={styles.fieldTitleText}>
          Enter an email for this contact... (optional)
        </Text>
        <Controller
          control={control}
          name="campsite_contact_email"
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
        {errors.campsite_contact_email && (
          <Text style={styles.errorText}>
            {errors.campsite_contact_email.message}
          </Text>
        )}
      </ScrollView>
      <Text style={styles.h3}>
        You have added {contactsList.length} contact(s) for{" "}
        {newCampsiteData.campsite_name}:
      </Text>
      <ScrollView>
        {contactsList.map((contact, i) => (
          <View key={i} style={styles.contactRow}>
            <View style={styles.miniButtonWrapper}>
              <Button title="-" onPress={() => handleRemoveContact(i)} />
            </View>
            <View>
              <Text style={styles.h4}>
                Contact {i + 1}: {contact.campsite_contact_name}
              </Text>
              <Text>Phone: {contact.campsite_contact_phone}</Text>
              {contact.campsite_contact_email && (
                <Text>Email: {contact.campsite_contact_email}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <Button
        title="Add a new contact to list"
        onPress={handleSubmit(handleAddContact)}
      />
      <Button
        title={
          contactsList.length
            ? "Submit contact list for new campsite"
            : "Skip adding contacts"
        }
        onPress={
          contactsList.length ? handleSubmitContactList : () => setFormStep(FORM_STEPS.review)
        }
      />
      <Button title="Go back to basic info..." onPress={() => setFormStep(FORM_STEPS.basicInfo)} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  h4: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
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
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
  },
  miniButtonWrapper: {
    maxWidth: 3,
    marginRight: 45,
  },
});
