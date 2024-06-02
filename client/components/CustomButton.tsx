import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  title,
  disabled,
  onPress,
  containerStyle,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
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
    borderColor: "#FF5C00",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans_400Regular",
    }),
  },
});

export default Button;
