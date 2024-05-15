import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const Page = () => {
  const [countryCode, setCountryCode] = useState("TR");
  const [country, setCountry] = useState({
    name: { common: "Turkey" },
    cca2: "TR",
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);

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
            placeholder="Username"
            placeholderTextColor={"#6F6F6F"}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={"#6F6F6F"}
          />
          <TextInput
            style={styles.input}
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
              backgroundColor="#6F6F6F"
              width={90}
            />
            <CustomButton
              onPress={() => router.replace("/")}
              title="Sign up"
              backgroundColor="#FF5C00"
            />
          </View>
        </View>
        <BottomWaves />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;

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
});
