import CustomButton from "@/components/CustomButton";
import React from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";

type RatingModalProps = {
  visible: boolean;
  title: string;
  playerName?: string;
  handleRatingCompleted: (rating: number) => void;
  handleSaveRating: () => void;
  handleCancel: () => void;
};

const RatingModal = ({
  visible,
  title,
  playerName,
  handleRatingCompleted,
  handleSaveRating,
  handleCancel,
}: RatingModalProps) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={handleCancel}
  >
    <View style={styles.popupContainer}>
      <View style={styles.popup}>
        <Text style={styles.popupTitle}>{title}</Text>
        {playerName && <Text>{playerName}</Text>}
        <Rating
          type="star"
          ratingCount={5}
          imageSize={30}
          style={styles.ratingStars}
          onFinishRating={handleRatingCompleted}
        />
        <TextInput
          style={styles.input}
          placeholder="Comments"
          placeholderTextColor="#6F6F6F"
          multiline={true}
        />
        <View style={styles.popupButtons}>
          <CustomButton title="Cancel" onPress={handleCancel} />
          <CustomButton title="Save" onPress={handleSaveRating} />
        </View>
      </View>
    </View>
  </Modal>
);

export default RatingModal;

// styles.js
const styles = StyleSheet.create({
  ratingStars: {
    padding: 7,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
