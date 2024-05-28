import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
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
          router.replace("/");
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
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.formContainer}>
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
          <View style={styles.input}>
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "70%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
  },
  pickerButton: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#6F6F6F",
  },
  countryText: {
    marginTop: 10,
    fontSize: 16,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
