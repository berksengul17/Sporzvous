import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

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
            placeholderTextColor={"gray"}
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
