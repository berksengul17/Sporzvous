import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LoginPage = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            placeholder="Username"
            placeholderTextColor={"#6F6F6F"}
          />
          <TextInput
            style={[styles.input, { marginBottom: 24 }]}
            placeholder="Password"
            placeholderTextColor={"#6F6F6F"}
            secureTextEntry
          />
          <CustomButton
            onPress={() => router.replace("/drawer/home")}
            title="Login"
            width={100}
          />
          <CustomText
            text="Reset Password"
            customStyle={{ color: "#FF5C00", marginVertical: 16 }}
          />
          <CustomButton
            onPress={() => router.navigate("/register")}
            title="Sign up for free"
            backgroundColor="#6F6F6F"
          />
        </View>
        <BottomWaves />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },

  formContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  input: {
    width: "70%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default LoginPage;
