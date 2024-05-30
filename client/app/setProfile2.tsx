import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import RNPickerSelect from "react-native-picker-select";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";

const StepTwo = () => {
  const { user, updateProfile } = useUserContext();
  const [fullName, setFullName] = useState<string>(user.fullName || "");
  const [age, setAge] = useState<string>(user.age?.toString() || "");
  const [gender, setGender] = useState<string>(user.gender || "");

  const inputStyle = {
    ...styles.input,
  };

  const handleNext = async () => {
    await updateProfile({ ...user, fullName, age: parseInt(age), gender });
    router.navigate("setProfile3");
  };

  return (
    <ImageBackground
      source={require("../assets/images/sporzvouswp.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
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
              style={inputStyle}
              placeholder="Enter your full name"
              placeholderTextColor="#FF5C00"
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText text="Age" customStyle={styles.label} />
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={inputStyle}
              placeholder="Enter your age"
              placeholderTextColor="#FF5C00"
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
  headerContainer: {
    marginTop: 20,
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
    paddingVertical: 10,
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

export default StepTwo;
