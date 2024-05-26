import { FontAwesome5, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";

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
    <Image source={friend.imageUri} style={styles.profileImage} />
    <View style={styles.friendInfo}>
      <CustomText customStyle={styles.friendName} text={friend.name} isBold={true} />
      <CustomText customStyle={styles.friendLastSeen} text={`Last seen: ${friend.lastSeen}`} />
    </View>
    <TouchableOpacity style={styles.iconButton}>
      <AntDesign name="message1" size={24} color="#FF5C00" />
    </TouchableOpacity>
  </View>
);

export default function FriendsScreen() {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.popUpContainer}>
        <Modal
          backdropColor="#6F6F6F"
          animationIn={"tada"}
          animationOut={"fadeOut"}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Add Friend</Text>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={"#6F6F6F"}
            />
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
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={{ marginTop: "2%", marginRight: "2%" }}>
          <MaterialCommunityIcons
            name="email-send"
            size={45}
            color="#FF5C00"
            onPress={() => router.push("/drawer/(friends)/friendRequests")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: "2%", marginRight: "2%" }}>
          <AntDesign
            name="adduser"
            size={45}
            color="#FF5C00"
            onPress={toggleModal}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredFriends}
        renderItem={({ item }) => <FriendItem friend={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </SafeAreaView>
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
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    borderRadius: 25,
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
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  friendLastSeen: {
    color: "#6F6F6F",
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  popUpContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    marginTop: "60%",
    marginBottom: "100%",
    marginLeft: "12%",
    marginRight: "12%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF5C00",
  },
  input: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
});
