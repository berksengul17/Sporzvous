import AuthHeader from "@/components/AuthHeader";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
  ImageBackground,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const Register = () => {
  const { signUp } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorRegister, setErrorRegister] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("TR");
  const [country, setCountry] = useState({
    name: { common: "Turkey" },
    cca2: "TR",
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const onSignUp = async () => {
    try {
      await signUp(
        { username, email, password, country: country.name.common },
        (response) => {
          console.log("response", response.data);
          router.replace("information");
        }
      );
      setErrorRegister("");
    } catch (error) {
      setErrorRegister((error as Error).message);
      setModalVisible(true);
    }
  };

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setShowCountryPicker(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require("../assets/images/sporzvouswp.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.3 }} // Adjust the opacity here
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <AuthHeader />
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  placeholderTextColor={"#6F6F6F"}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="E-mail"
                  placeholderTextColor={"#6F6F6F"}
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <View style={styles.pickerButton}>
                  <CountryPicker
                    {...{
                      countryCode,
                      withFilter: true,
                      withFlag: true,
                      withCountryNameButton: true,
                      withAlphaFilter: true,
                      withCallingCode: false,
                      withEmoji: true,
                      onSelect,
                    }}
                    visible={showCountryPicker}
                    onClose={() => setShowCountryPicker(false)}
                  />
                </View>
                <View style={styles.buttons}>
                  <CustomButton
                    onPress={() => router.back()}
                    title="Back"
                    containerStyle={{
                      width: 90,
                      backgroundColor: "#6F6F6F",
                      borderColor: "#6F6F6F",
                    }}
                  />
                  <CustomButton
                    onPress={onSignUp}
                    title="Sign up"
                    containerStyle={{ backgroundColor: "#FF5C00" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{errorRegister}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle darker overlay to improve text visibility
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "90%", // Add padding from left and right
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Optional: add inner padding if needed
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight background color for form container
    borderRadius: 10,
    padding: 20,
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
  pickerButton: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight background color for picker button
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#6F6F6F",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight background color for modal view
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
    color: "#000", // Black text color for modal text
  },
});
