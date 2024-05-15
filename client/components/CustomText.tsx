import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

const CustomText = ({ text }: { text: string }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans_400Regular",
    }),
  },
});
