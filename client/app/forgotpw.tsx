import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";
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
        <View style={styles.header}>
          <AuthHeader />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            placeholderTextColor={"#6F6F6F"}
          />
          <CustomButton
            onPress={() => router.replace("/")}
            title="Request Password Reset"
            width={210}
            margin={20}
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
  header: {
    height: "25%",
    marginTop: 35,
  },
  formContainer: {
    marginTop: 50,
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
});

export default LoginPage;
