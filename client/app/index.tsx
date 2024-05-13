import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import React from "react";
import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <AuthHeader />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={"gray"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"gray"}
          secureTextEntry
        />
        <CustomButton
          onPress={() => router.replace("/drawer/home")}
          title="Login"
          width={100}
        />
        <Button
          onPress={() => router.replace("/forgotpw")}
          title="Reset Password"
          color={"darkorange"}
        />
        <CustomButton
          onPress={() => router.replace("/register")}
          title="Sign up for free"
          backgroundColor="gray"
        />
      </View>
      <BottomWaves />
    </View>
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
