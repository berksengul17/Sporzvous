import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Pressable,
} from "react-native";
import CustomText from "@/components/CustomText";
import { useUserContext } from "@/context/UserProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
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

export type Sport = {
  id: string;
  name: string;
  icon: string;
};

const SportCard = ({
  sport,
  onPress,
  isSelected,
}: {
  sport: Sport;
  onPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <MaterialCommunityIcons
        name={sport.icon as any}
        size={40}
        color="#FF5C00"
      />
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
  const { t } = useTranslation("setProfile4");
  const [selectedSport, setSelectedSport] = useState<Sport>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSport = (sport: Sport) => {
    setSelectedSport(sport);
  };

  const handleNext = async () => {
    if (!selectedSport) {
      setModalVisible(true);
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
                text={t("select_favorite_sport")}
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
              <TouchableOpacity
                style={[styles.button, styles.leftButton]}
                onPress={() => router.back()}
              >
                <Text style={styles.buttonText}>{t("back")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rightButton]}
                onPress={handleNext}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  {t("next")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {t("select_favorite_sport_error")}
                </Text>
                <Pressable
                  style={[styles.errorButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>{t("close")}</Text>
                </Pressable>
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
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    elevation: 10,
  },
  leftButton: {
    borderColor: "#FF5C00",
    backgroundColor: "white",
  },
  rightButton: {
    borderColor: "#FF5C00",
    backgroundColor: "#FF5C00",
  },
  buttonText: {
    color: "#FF5C00",
    fontWeight: "bold",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FF5C00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  error: {
    color: "red",
  },
});

export default StepFour;
