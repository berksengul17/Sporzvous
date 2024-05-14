import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";
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
        <View style={styles.header}>
          <AuthHeader />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"gray"}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={"gray"}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"gray"}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"gray"}
            secureTextEntry
          />
          <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
              <View style={styles.pickerButton}>
                <Text style={styles.pickerButtonText}>
                  {country ? country.name.common : "Select Nationality"}
                </Text>
              </View>
            </TouchableOpacity>
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
              onPress={() => router.replace("/")}
              title="Back"
              backgroundColor="gray"
              width={90}
            />
            <CustomButton
              onPress={() => router.replace("/")}
              title="Sign up"
              backgroundColor="darkorange"
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
  header: {
    height: "25%",
    marginTop: 35,
  },
  formContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    width: "90%",
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
    color: "gray",
  },
  countryText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: 20,
  },
});
