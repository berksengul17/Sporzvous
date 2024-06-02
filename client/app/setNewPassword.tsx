import AuthHeader from "@/components/AuthHeader";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { useUserContext } from "@/context/UserProvider";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SetNewPassword = () => {
  const { email, verificationCode } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const { resetPassword } = useUserContext();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onSetNewPassword = async () => {
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match. Please try again.");
      setModalVisible(true);
    } else {
      try {
        await resetPassword(
          email as string,
          verificationCode as string,
          password
        );
        setModalMessage(
          "Password reset successfully. You can now log in with your new password."
        );
        setModalVisible(true);
      } catch (error: any) {
        // setModalMessage("Failed to reset password. Please try again.");
        setModalMessage(error.message);
        setModalVisible(true);
      }
    }
  };

  const onCloseModal = () => {
    setModalVisible(false);
    if (
      modalMessage ===
      "Password reset successfully. You can now log in with your new password."
    ) {
      router.dismissAll();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require("../assets/images/sporzvouswp.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.2 }} // Adjust the opacity here for a subtle background
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <AuthHeader />
                <CustomText
                  customStyle={styles.infoText}
                  text="Please enter your new password."
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="New Password"
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <CustomButton
                  onPress={onSetNewPassword}
                  title="Set New Password"
                  containerStyle={styles.submitButton}
                />
                <CustomButton
                  onPress={() => router.dismissAll()}
                  title="Back to Login"
                  containerStyle={styles.backButton}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CustomText
                  customStyle={styles.modalText}
                  text={modalMessage}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onCloseModal}
                >
                  <CustomText customStyle={styles.textStyle} text="Close" />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Subtle darker overlay to improve text visibility
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight background color for form container
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight background color for input fields
    fontSize: 16,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#FF5C00",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    width: "100%",
    backgroundColor: "#6F6F6F",
    borderColor: "#6F6F6F",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for the modal background
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white", // Slight background color for modal view
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
  button: {
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
    color: "#000",
  },
});

export default SetNewPassword;
