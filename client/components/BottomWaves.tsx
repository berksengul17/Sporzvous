import React from "react";
import { View, StyleSheet, Image } from "react-native";

const BottomWaves = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/Waves.png")} />
    </View>
  );
};

export default BottomWaves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
