import CustomButton from "@/components/CustomButton";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";

const friendsData = [
  {
    id: "1",
    name: "Emre Erol",
    lastSeen: "1 Hour",
    imageUri: require("../../../assets/images/friendpp.jpg"),
  },
  {
    id: "2",
    name: "Jane Doe",
    lastSeen: "2 Hours",
    imageUri: require("../../../assets/images/friendpp.jpg"),
  },
  {
    id: "3",
    name: "John Smith",
    lastSeen: "5 Minutes",
    imageUri: require("../../../assets/images/friendpp.jpg"),
  },
  // add more friends here
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendContainer}>
    <Image source={{ uri: friend.imageUri }} style={styles.profileImage} />
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.friendLastSeen}>Last seen: {friend.lastSeen}</Text>
    </View>
    <TouchableOpacity style={styles.iconButton}>
      <AntDesign name="message1" size={24} color="orange" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <AntDesign name="adduser" size={24} color="orange" />
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.popUpContainer}>
        <Modal
          backdropColor="#6F6F6F"
          animationIn={"tada"}
          animationOut={"fadeOut"}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
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
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6F6F6F" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={"#6F6F6F"}
          />
        </View>
        <TouchableOpacity style={{ marginTop: "2%", marginRight: "2%" }}>
          <MaterialCommunityIcons
            name="email-send"
            size={45}
            color="orange"
            onPress={() => router.push("/drawer/(friends)/friendRequests")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: "2%", marginRight: "2%" }}>
          <AntDesign
            name="adduser"
            size={45}
            color="orange"
            onPress={toggleModal}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={friendsData}
        renderItem={({ item }) => <FriendItem friend={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.wave}>
        <Image source={require("../../../assets/images/Waves.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  searchText: {
    marginLeft: 10,
    color: "#6F6F6F",
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  friendContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 10,
    backgroundColor: "#FFF", // Change this as necessary
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  friendLastSeen: {
    color: "grey",
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  wave: {
    position: "static",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
  popUpContainer: {
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
