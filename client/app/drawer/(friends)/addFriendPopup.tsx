// app/drawer/friends/addFriendPopup.tsx
import CustomButton from "@/components/CustomButton";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";

const AddFriendPopup = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        backdropColor="#6F6F6F"
        isVisible={isModalVisible}
        style={{
          marginTop: "60%",
          marginBottom: "100%",
          marginLeft: "12%",
          marginRight: "12%",
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Add Friend</Text>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={"#6F6F6F"}
          ></TextInput>
          <View style={styles.buttons}>
            <CustomButton
              title="Cancel"
              onPress={toggleModal}
              width={80}
              backgroundColor="white"
              color="#FF5C00"
            />
            <CustomButton
              title="Send Request"
              onPress={toggleModal}
              width={130}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    width: "25%",
    flexDirection: "column",
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    color: "#FF5C00",
  },
  input: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
});

export default AddFriendPopup;
