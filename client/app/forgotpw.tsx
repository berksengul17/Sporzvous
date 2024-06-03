import AuthHeader from "@/components/AuthHeader";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Forgotpw = () => {
  const { requestPasswordReset } = useUserContext();
  const { t } = useTranslation("forgotPw");

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorResetRequest, setErrorResetRequest] = useState("");

  const onRequestPasswordReset = async () => {
    try {
      await requestPasswordReset(email);
      setErrorResetRequest("");
      router.push({ pathname: "verificationCode", params: { email } });
    } catch (error) {
      setErrorResetRequest((error as Error).message);
      setModalVisible(true);
    }
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
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("email")}
                  placeholderTextColor={"#6F6F6F"}
                />
                <CustomButton
                  onPress={onRequestPasswordReset}
                  title={t("request_password_reset")}
                />
                <CustomButton
                  onPress={() => router.back()}
                  title={t("back")}
                  containerStyle={styles.backBtn}
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
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{errorResetRequest}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{t("hide_modal")}</Text>
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
  formContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 40,
    marginTop: 50,
    justifyContent: "space-between",
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
  backButtonText: {
    color: "#FF5C00",
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  backBtn: {
    width: "100%",
    backgroundColor: "#6F6F6F",
    borderColor: "#6F6F6F",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 35,
  },
});

export default Forgotpw;
