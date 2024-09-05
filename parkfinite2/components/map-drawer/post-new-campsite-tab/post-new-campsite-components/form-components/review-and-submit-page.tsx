import { Text } from 'react-native'
import { Button } from "@/components/Button";
import { CampsitePostRequest } from "@/types/api-data-types/campsite-types";

interface ReviewAndSubmitNewCampsiteProps {
    newCampsiteAddress: string
    newCampsiteData: CampsitePostRequest,
    setFormStep: (step: number) => void;
}


export default function ReviewAndSubmitNewCampsite ({newCampsiteAddress, newCampsiteData, setFormStep} : ReviewAndSubmitNewCampsiteProps) {
    console.log(newCampsiteData);

    return (
        <>
        <Text>Location: {newCampsiteAddress}</Text>
        <Button title="Go back to add contacts" onPress={()=>setFormStep(3)}/>
        </>
    )

    
}