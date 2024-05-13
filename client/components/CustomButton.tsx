import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
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
  backgroundColor = "darkorange",
  color = "white",
  width = 150,
  height = 45,
  margin = 5,
}: Props) => {
  const buttonStyle: ViewStyle = {
    height,
    width,
    backgroundColor,
    margin,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "orange",
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
