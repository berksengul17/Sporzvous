import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomWaves = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
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
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
