import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import { CampsiteContactPostRequest } from "@/types/api-data-types/campsite-types";
import { Text } from "react-native";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCampsiteContacts>();

  return (
    <Text style={styles.h2}>Step 3 (optional) - Enter contact(s) for {newCampsiteName}</Text>
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
