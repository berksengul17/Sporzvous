import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header} numberOfLines={1}>
        Sporzvous
      </Text>
      <View style={styles.subContainer}>
        <Text style={styles.left}>Organized,</Text>
        <Text style={styles.mid}>Played,</Text>
        <Text style={styles.right}>Conquered</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    fontSize: 62,
    color: "#FF5C00",
    fontWeight: "bold",
  },
  subContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 5,
    alignSelf: "stretch",
  },
  left: {
    fontSize: 20,
    color: "#6F6F6F",
    alignSelf: "flex-start",
    fontFamily: "JejuHallasan",
  },
  mid: {
    fontSize: 20,
    color: "#6F6F6F",
    alignSelf: "center",
    fontFamily: "JejuHallasan",
  },
  right: {
    fontSize: 20,
    color: "#6F6F6F",
    alignSelf: "flex-end",
    fontFamily: "JejuHallasan",
  },
});
