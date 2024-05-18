import React from "react";
import { StyleSheet } from "react-native";
import { Rating as RNRating } from "react-native-ratings";

const Rating = () => {
  return (
    <RNRating
      type="custom"
      ratingCount={5}
      imageSize={30}
      ratingColor="#ffc978"
      ratingBackgroundColor="#d9d9d9"
      style={styles.rating}
      tintColor="#fff"
    />
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
