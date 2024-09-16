import { StyleSheet } from "react-native";

export const campsiteDetailedCardStyles = StyleSheet.create({
  headerContainer: {
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  container: {
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
  subContainer: {
    width: 320,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    margin: 5,
    alignSelf: "center",
    backgroundColor: "beige",
    borderRadius: 10,
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 12,
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic"
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
});
