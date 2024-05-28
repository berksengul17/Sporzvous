import AuthHeader from "@/components/AuthHeader";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";

const LoginPage = () => {
  const { login } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const onLogin = async () => {
    try {
      console.log(email, password);

      await login({ email, password }, (response) => {
        console.log("response", response.data);
        router.replace("drawer/(home)/sportsScreen");
      });
      setErrorLogin("");
    } catch (error) {
      setErrorLogin((error as Error).message);
      setModalVisible(true); // Show modal on error
    }
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
                  style={[styles.input, { marginBottom: 15 }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Username"
                  placeholderTextColor={"#6F6F6F"}
                />
                <TextInput
                  style={[styles.input, { marginBottom: 24 }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <CustomButton
                  onPress={onLogin}
                  title="Login"
                  containerStyle={styles.loginButton}
                />
                <TouchableOpacity onPress={() => router.navigate("/forgotpw")}>
                  <CustomText
                    text="Reset Password"
                    customStyle={styles.resetText}
                  />
                </TouchableOpacity>
                <CustomButton
                  onPress={() => router.navigate("/register")}
                  title="Sign up for free"
                  containerStyle={styles.signUpButton}
                />
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
              <Text style={styles.modalText}>{errorLogin}</Text>
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
  loginButton: {
    width: "100%",
    backgroundColor: "#FF5C00",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  resetText: {
    color: "#FF5C00",
    marginVertical: 16,
  },
  signUpButton: {
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

export default LoginPage;
