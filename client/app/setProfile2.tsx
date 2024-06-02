import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import CustomText from "@/components/CustomText";
import RNPickerSelect from "react-native-picker-select";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import { t } from "i18next";

const StepTwo = () => {
  const { user, updateProfile } = useUserContext();
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [errorProfile, setErrorProfile] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const inputStyle = {
    ...styles.input,
  };

  const handleNext = async () => {
    const ageNumber = parseInt(age);
    try {
      await updateProfile({ ...user, fullName, age: ageNumber, gender });
      setErrorProfile("");
      router.navigate("setProfile3");
    } catch (error) {
      setErrorProfile((error as Error).message);
      setModalVisible(true); // Show modal on error
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/sporzvouswp.png")}
          style={styles.background}
        >
          <View style={styles.overlay}>
            <View style={styles.formContainer}>
              <View style={styles.headerContainer}>
                <CustomText
                  customStyle={styles.headerText}
                  text="Fill in your personal details"
                />
              </View>
              <View style={styles.userInfo}>
                <CustomText text="Name/Surname" customStyle={styles.label} />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.inputs}
                  placeholder="Enter your full name"
                  placeholderTextColor="#c1bbbb"
                />
              </View>
              <View style={styles.userInfo}>
                <CustomText text="Age" customStyle={styles.label} />
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  style={styles.inputs}
                  placeholder="Enter your age"
                  placeholderTextColor="#c1bbbb"
                />
              </View>
              <View style={styles.userInfo}>
                <CustomText text="Gender" customStyle={styles.label} />
                <View style={{ flex: 1 }}>
                  <RNPickerSelect
                    onValueChange={(newGender) => setGender(newGender)}
                    items={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputIOS: inputStyle,
                      inputAndroid: inputStyle,
                    }}
                    placeholder={{
                      label: "Select your gender...",
                      value: null,
                    }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.leftButton]}
                  onPress={() => router.back()}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.rightButton]}
                  onPress={handleNext}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
                <Text style={styles.modalText}>{errorProfile}</Text>
                <Pressable
                  style={[styles.errorButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
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
    height: "52%",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    color: "#FF5C00",
    fontWeight: "bold",
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 15,
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#6F6F6F",
    width: "35%",
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF5C00",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    color: "#494747",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  inputs: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF5C00",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#494747",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    alignItems: "center",
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
  buttonOpen: {
    backgroundColor: "#F194FF",
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

export default StepTwo;
