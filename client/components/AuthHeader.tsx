import { View, Text, StyleSheet } from "react-native";
import React from "react";

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sporzvous</Text>
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
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 72,
    color: "darkorange",
    fontWeight: "bold",
  },
  subContainer: {
    flex: 1,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  left: {
    fontSize: 20,
    fontStyle: "italic",
    color: "grey",
    alignSelf: "flex-start",
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "",
  },
  mid: {
    fontSize: 20,
    fontStyle: "italic",
    color: "grey",
    alignSelf: "center",
    marginTop: 30,
    fontWeight: "bold",
  },
  right: {
    fontSize: 20,
    fontStyle: "italic",
    color: "grey",
    alignSelf: "flex-end",
    marginTop: 50,
    fontWeight: "bold",
  },
});
