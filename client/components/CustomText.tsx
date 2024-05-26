import React from "react";
import { Platform, StyleSheet, Text, TextStyle } from "react-native";

interface CustomTextProps {
  text: string;
  customStyle?: TextStyle;
  isBold?: boolean; // New prop to indicate bold text
}

const CustomText = ({
  text,
  customStyle,
  isBold = false, // Default to false if not provided
}: CustomTextProps) => {
  return (
    <Text style={[styles.text, isBold ? styles.bold : null, customStyle]}>
      {text}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  bold: {
    fontFamily: Platform.select({
      android: "OpenSans_700Bold",
      ios: "OpenSans_700Bold",
    }),
  },
});
