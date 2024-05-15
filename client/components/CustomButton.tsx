import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  width?: number;
  height?: number;
  margin?: number;
}

const Button = ({
  title,
  onPress,
  backgroundColor = "#FF5C00",
  color = "white",
  width = 150,
  margin = 0,
}: Props) => {
  const buttonStyle: ViewStyle = {
    width,
    backgroundColor,
    margin,
    borderColor: backgroundColor,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, buttonStyle]}>
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FF5C00",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Button;
