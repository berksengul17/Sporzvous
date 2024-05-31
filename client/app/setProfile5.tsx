import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { Rating as RatingType, useUserContext } from "@/context/UserProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Sport } from "./setProfile4";

const initialSportsData = [
  { id: "1", name: "Basketball", icon: "basketball", visible: true },
  { id: "2", name: "Football", icon: "soccer", visible: true },
  { id: "3", name: "Volleyball", icon: "volleyball", visible: true },
  { id: "4", name: "Tennis", icon: "tennis", visible: true },
  { id: "5", name: "Baseball", icon: "baseball", visible: true },
  { id: "6", name: "Badminton", icon: "badminton", visible: true },
  { id: "7", name: "Handball", icon: "handball", visible: true },
  { id: "8", name: "Ice Hockey", icon: "hockey-puck", visible: true },
  { id: "9", name: "Paintball", icon: "pistol", visible: true },
];

const SportCard = ({
  sport,
  onPress,
}: {
  sport: Sport;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <MaterialCommunityIcons
        name={sport.icon as any}
        size={40}
        color="#FF5C00"
      />
      <Text style={styles.cardText}>{sport.name}</Text>
    </TouchableOpacity>
  );
};

const StepFive = () => {
  const { user, setUser } = useUserContext();
  const [selectedSport, setSelectedSport] = useState<Sport>();
  const [selectedSportRating, setSelectedSportRating] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState<RatingType[]>([]);

  const [errorRating, setErrorRating] = useState("");

  const handleSelectSport = (sport: Sport) => {
    setSelectedSport(sport);
    setModalVisible(true);
  };

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/sportRating";

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/initializeSportRatings/${user.userId}`,
        ratings
      );
      console.log(response.data);
      setErrorRating("");
      setUser({ ...user, ratings });
      router.navigate("/drawer/(home)/home");
    } catch (err) {
      setErrorRating("An unexpected error occurred. Please try again.");
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          setErrorRating(err.response.data.error);
        } else if (err instanceof Error) {
          setErrorRating(err.response?.data);
        }
      }
    }
  };

  const handleRatingCompleted = () => {
    setRatings((prevRatings: RatingType[]) => [
      ...prevRatings.filter(
        (r: RatingType) => r.sportName !== selectedSport?.name
      ),
      {
        sportName: selectedSport?.name!,
        rating: selectedSportRating,
      },
    ]);
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/sporzvouswp.png")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <CustomText
                customStyle={styles.headerText}
                text="Rate your skills for these sports"
              />
            </View>
            <View style={styles.sportsGrid}>
              {initialSportsData.map((sport) => (
                <SportCard
                  key={sport.id}
                  sport={sport}
                  onPress={() => handleSelectSport(sport)}
                />
              ))}
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="<"
                onPress={() => router.back()}
                containerStyle={styles.button}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Rate your skill level</Text>
                <Text style={styles.modalSportName}>{selectedSport?.name}</Text>
                <View style={styles.ratingStars}>
                  <Rating
                    customStyles={styles.ratingStars}
                    onFinishRating={(rating) => setSelectedSportRating(rating)}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <CustomButton
                    title="Close"
                    onPress={() => setModalVisible(false)}
                    containerStyle={styles.modalButton}
                  />
                  <CustomButton
                    title="Save"
                    onPress={handleRatingCompleted}
                    containerStyle={styles.modalButton}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    width: "80%",
    height: "80%",
    justifyContent: "space-between",
    position: "relative",
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FF5C00",
    fontWeight: "bold",
    textAlign: "center",
  },
  sportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
    position: "relative",
  },
  cardText: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FF5C00",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  saveButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FF5C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSportName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5C00",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    width: "45%",
    borderRadius: 10,
    backgroundColor: "#FF5C00",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  ratingStars: {
    padding: 7,
  },
});

export default StepFive;
