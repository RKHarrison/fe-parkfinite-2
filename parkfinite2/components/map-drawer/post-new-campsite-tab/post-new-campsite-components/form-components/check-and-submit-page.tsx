import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import {
  CampsitePostRequest,
  CampsiteReviewPostRequest,
} from "@/types/api-data-types/campsite-types";
import FieldAndDataText from "@/components/FieldAndDataText";
import { campsiteCategoryMap } from "./new-campsite-basic-info-form";
import {
  postCampsite,
  postReviewByCampsiteId,
} from "@/services/api/campsitesApi";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { router } from "expo-router";
import StarRatingComponent, { StarRating } from "@/components/StarRating";
import { DroppedMarker } from "@/contexts/DroppedMarkerContext";

interface CheckandSubmitNewCampsiteProps {
  newCampsiteAddress: string | null;
  newCampsiteData: CampsitePostRequest;
  rating: StarRating;
  setRating: (rating: StarRating) => void;
  setFormStep: (step: number) => void;
  setDroppedMarker: (droppedMarker: DroppedMarker | null) => void;
}

export default function CheckandSubmitNewCampsite({
  newCampsiteAddress,
  newCampsiteData,
  rating,
  setRating,
  setFormStep,
  setDroppedMarker
}: CheckandSubmitNewCampsiteProps) {
  const { user, logout } = useContext(UserContext);

  async function handleSubmitNewCampsite() {
    if (user && rating) {
      const fullCampsiteData = {
        ...newCampsiteData,
        user_account_id: user.user_account_id,
      };
      try {
        const postedCampsite = await postCampsite(fullCampsiteData);
        const review: CampsiteReviewPostRequest = {
          rating: rating,
          user_account_id: user.user_account_id,
          comment: null,
        };
        const postedReview = await postReviewByCampsiteId(
          postedCampsite.campsite_id,
          review
        );
        setDroppedMarker(null);
        setRating(null)
        router.push("/(drawer)/(tabs)/search/map");
        alert("New campsite submitted!");
      } catch (error) {
        console.error("Error submitting new campsite", error);
        alert("Error submitting new campsite. Please try again.");
      }
    }
  }

  const handleRatingChange = (newRating: StarRating) => {
    setRating(newRating);
  };

  return (
    <>
      <Text style={styles.h2}>
        Final step - review info and submit new campsite:
      </Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.h3}>Location</Text>
        <Text>{newCampsiteAddress}</Text>
        <Button
          title="Go back to choose location"
          onPress={() => setFormStep(1)}
        />
        <StarRatingComponent
          initialRating={rating}
          onRatingChange={handleRatingChange}
        />

        <Text style={styles.h3}>Basic Info</Text>
        <FieldAndDataText title="Name" data={newCampsiteData?.campsite_name} />
        <FieldAndDataText
          title="Category"
          data={campsiteCategoryMap.get(Number(newCampsiteData?.category_id))}
        />
        <FieldAndDataText
          title="Description"
          data={newCampsiteData?.description}
        />
        <FieldAndDataText
          title="Parking cost"
          data={`£${newCampsiteData?.parking_cost}`}
        />
        <FieldAndDataText
          title="Facilities cost"
          data={`£${newCampsiteData?.facilities_cost}`}
        />
        <FieldAndDataText
          title="Open between"
          data={
            newCampsiteData?.opening_month
              ? `${newCampsiteData.opening_month} and ${newCampsiteData?.closing_month}`
              : "n/a"
          }
        />
        <Button title="Go back to basic info" onPress={() => setFormStep(2)} />

        <Text style={styles.h3}>Contact(s)</Text>
        {newCampsiteData?.contacts ? (
          <View style={{ maxHeight: 150 * newCampsiteData.contacts.length }}>
            {newCampsiteData.contacts.map((contact, index) => (
              <View key={index} style={styles.contactContainer}>
                <FieldAndDataText
                  title="Name"
                  data={contact.campsite_contact_name}
                />
                <FieldAndDataText
                  title="Phone"
                  data={contact.campsite_contact_phone}
                />
                {contact.campsite_contact_email && (
                  <FieldAndDataText
                    title="Email"
                    data={contact.campsite_contact_email}
                  />
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text>No contacts provided for this spot.</Text>
        )}
        <Button title="Go back to contacts" onPress={() => setFormStep(3)} />
      </ScrollView>
      <Button
        buttonStyle={styles.submitButton}
        title="Confirm campsite details and submit new campsite!"
        onPress={() => handleSubmitNewCampsite()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: { alignItems: "center", width: "100%" },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 3,
  },
  contactContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  submitButton: {
    marginTop: 12,
    marginBottom: 8,
  },
});
