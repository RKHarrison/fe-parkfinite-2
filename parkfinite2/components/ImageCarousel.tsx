import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";

import { CampsitePhoto } from "@/types/api-data-types/campsite-types";

type props = {
  campsitePhotos?: CampsitePhoto[] | null;
};

export function ImageCarousel({ campsitePhotos }: props) {
  return (
    <View style={styles.imageContainer}>
      {campsitePhotos ? (
        <ScrollView horizontal={true}>
          {campsitePhotos.map((photo, index) => (
            <Image
              key={index}
              style={styles.images}
              source={{ uri: photo.campsite_photo_url }}
            />
          ))}
        </ScrollView>
      ) : (
        <Image
          style={styles.images}
          source={{
            uri: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: 150,
    height: 150,
    margin: 20,
    marginLeft: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});
