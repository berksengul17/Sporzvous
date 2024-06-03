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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { login } = useUserContext();
  const { t, i18n } = useTranslation("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const onLogin = async () => {
    try {
      console.log(email, password);

      await login({ email, password }, (response) => {
        router.replace("drawer");
      });
      setErrorLogin("");
    } catch (error) {
      setErrorLogin((error as Error).message);
      setModalVisible(true);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require("../assets/images/sporzvouswp.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <AuthHeader />
                <TextInput
                  style={[styles.input, { marginBottom: 15 }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("username")}
                  placeholderTextColor={"#6F6F6F"}
                />
                <TextInput
                  style={[styles.input, { marginBottom: 24 }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t("password")}
                  placeholderTextColor={"#6F6F6F"}
                  secureTextEntry
                />
                <CustomButton
                  onPress={onLogin}
                  title={t("login")}
                  containerStyle={styles.loginButton}
                />
                <TouchableOpacity onPress={() => router.navigate("/forgotpw")}>
                  <CustomText
                    text={t("reset_password")}
                    customStyle={styles.resetText}
                  />
                </TouchableOpacity>
                <CustomButton
                  onPress={() => router.navigate("/register")}
                  title={t("sign_up_for_free")}
                  containerStyle={styles.signUpButton}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <MaterialIcons
          name="language"
          size={30}
          color="black"
          style={styles.languageIcon}
          onPress={() => setLanguageModalVisible(true)}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CustomText customStyle={styles.modalText} text={errorLogin} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={languageModalVisible}
          onRequestClose={() => {
            setLanguageModalVisible(!languageModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.languageModalView}>
              <Text style={{ fontWeight: "bold" }}>{t("select_language")}</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.languageButton}
                  onPress={() => changeLanguage("en")}
                >
                  <Text style={styles.textStyle}>English</Text>
                </Pressable>
                <Pressable
                  style={styles.languageButton}
                  onPress={() => changeLanguage("tr")}
                >
                  <Text style={styles.textStyle}>Türkçe</Text>
                </Pressable>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setLanguageModalVisible(!languageModalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
  languageIcon: {
    position: "absolute",
    top: 60, // Adjust based on your design
    right: 20, // Adjust based on your design
    zIndex: 10, // Ensure it is on top of other elements
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  languageModalView: {
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
    backgroundColor: "#FF5C00",
  },
  languageButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF5C00",
    marginVertical: 10,
    marginHorizontal: 15,
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
  buttonContainer: {
    flexDirection: "row",
    margin: 5,
    paddingVertical: 10,
  },
});

export default LoginPage;
