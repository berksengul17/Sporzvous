import React from "react";
import { Platform, StyleSheet, Text, TextStyle } from "react-native";

const CustomText = ({
  text,
  customStyle,
}: {
  text: string;
  customStyle?: TextStyle;
}) => {
  return <Text style={[styles.text, customStyle]}>{text}</Text>;
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
