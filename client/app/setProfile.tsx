import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import AuthHeader from "@/components/AuthHeader";
import CustomText from "@/components/CustomText";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/sporzvouswp.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <AuthHeader />
          </View>
          <CustomText
            customStyle={styles.welcomeText}
            text="Let's fire up your profile! 🔥"
          />
          <CustomText
            customStyle={styles.descriptionText}
            text="Get ready to enhance your experience by setting up your profile. Fill
            in your details to connect with others and participate in exciting
            sports events."
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.rightButton]}
              onPress={() => router.push("setProfile2")}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
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
    justifyContent: "center", // Center the container vertically
    alignItems: "center", // Center the container horizontally
  },
  headerContainer: {
    marginBottom: 20,
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
    width: "80%", // Make the container width smaller
    height: "52%", // Limit the container height
    justifyContent: "center", // Center the content vertically within the container
    position: "relative",
  },
  welcomeText: {
    fontSize: 24,
    color: "#FF5C00",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
});

export default WelcomeScreen;
