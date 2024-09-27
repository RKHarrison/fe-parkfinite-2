import { SafeAreaView } from "react-native-safe-area-context";
import MultiStepPostNewCampsiteForm from "./post-new-campsite-components/multi-step-post-new-campsite-form";

export default function PostNewCampsiteScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MultiStepPostNewCampsiteForm />
    </SafeAreaView>
  );
}
