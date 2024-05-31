import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Rating as RNRating } from "react-native-ratings";

const Rating = ({
  value,
  isEditable = true,
  customStyles,
  onFinishRating,
}: {
  value?: number;
  isEditable?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  onFinishRating?: (rating: number) => void;
}) => {
  return (
    <RNRating
      type="custom"
      startingValue={value}
      readonly={!isEditable}
      ratingCount={5}
      imageSize={30}
      ratingColor="#ffc978"
      ratingBackgroundColor="#d9d9d9"
      style={[styles.rating, customStyles]}
      tintColor="#fff"
      onFinishRating={onFinishRating}
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
