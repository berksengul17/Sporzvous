import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";
import AuthHeader from "@/components/AuthHeader";
import BottomWaves from "@/components/BottomWaves";
import CustomButton from "@/components/CustomButton";

const Page = () => {
  return (
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
  },
  formContainer: {
    marginTop: 30,
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: 20,
  },
});
