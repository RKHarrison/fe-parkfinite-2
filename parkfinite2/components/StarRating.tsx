import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Animated, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";


export type StarRating = number | null;

type StarRatingProps = {
  initialRating: StarRating,
  onRatingChange: (rating: StarRating) => void
}

export default function StarRatingComponent({ initialRating=null, onRatingChange } : StarRatingProps) {
  const starRatingOptions = [1, 2, 3, 4, 5];
  
  const [starRating, setStarRating] = useState(initialRating);
  
  const animatedButtonScale = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleStarPress = (option: number) => {
    setStarRating(option);
    onRatingChange(option);
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {starRating ? `You said this was a ${starRating} star spot!` : 'Tap to rate this spot'}
      </Text>
      <View style={styles.stars}>
        {starRatingOptions.map((option) => (
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleStarPress(option)}
            key={option}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating && starRating >= option ? 'star' : 'star-border'}
                size={32}
                style={starRating && starRating >= option ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});