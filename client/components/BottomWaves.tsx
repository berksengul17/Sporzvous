import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomWaves = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Image source={require("../assets/images/Waves.png")} />
    </View>
  );
};

export default BottomWaves;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // Adjust the height based on your image's aspect ratio
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
