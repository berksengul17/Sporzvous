import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";

const initialSportsData = [
  { id: "1", name: "Basketball", icon: "basketball" },
  { id: "2", name: "Football", icon: "soccer" },
  { id: "3", name: "Volleyball", icon: "volleyball" },
  { id: "4", name: "Tennis", icon: "tennis" },
  { id: "5", name: "Baseball", icon: "baseball" },
  { id: "6", name: "Badminton", icon: "badminton" },
  { id: "7", name: "Handball", icon: "handball" },
  { id: "8", name: "Ice Hockey", icon: "hockey-puck" },
  { id: "9", name: "Paintball", icon: "pistol" },
];

const SportCard = ({ sport, onPress, isSelected }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <MaterialCommunityIcons name={sport.icon} size={40} color="#FF5C00" />
      <Text style={styles.cardText}>{sport.name}</Text>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#FF5C00"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const StepFour = () => {
  const { user, updateProfile } = useUserContext();
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    if (user.favoriteSport) {
      const favoriteSport = initialSportsData.find(
        (sport) => sport.name === user.favoriteSport
      );
      setSelectedSport(favoriteSport);
    }
  }, [user]);

  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
  };

  const handleNext = async () => {
    if (!selectedSport) {
      alert("Please select a favorite sport.");
      return;
    }
    await updateProfile({ ...user, favoriteSport: selectedSport.name });
    router.navigate("setProfile5");
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
                text="Select Your Favorite Sport"
              />
            </View>
            <View style={styles.sportsGrid}>
              {initialSportsData.map((sport) => (
                <SportCard
                  key={sport.id}
                  sport={sport}
                  onPress={() => handleSelectSport(sport)}
                  isSelected={selectedSport?.id === sport.id}
                />
              ))}
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="<"
                onPress={() => router.back()}
                containerStyle={styles.button}
              />
              <CustomButton
                title=">"
                onPress={handleNext}
                containerStyle={styles.button}
              />
            </View>
          </View>
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
    height: "25%",
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
  checkIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
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
});

export default StepFour;
