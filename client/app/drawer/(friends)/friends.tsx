import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import FriendList from "@/components/FriendList";
import { useUserContext } from "@/context/UserProvider";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function FriendsScreen() {
  const { user } = useUserContext();
  const [searchText, setSearchText] = useState("");
  const [friendName, setFriendName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  // const filteredFriends = friendsData.filter((friend) =>
  //   friend.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const sendRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("senderUsername", user.username);
      formData.append("receiverUsername", friendName);
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/friendrequests/send`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          // Handle other types of errors (non-Axios errors)
          errorMessage = err.response?.data;
        }
      }
    }
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
              value={friendName}
              onChangeText={setFriendName}
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={"#6F6F6F"}
            />
            <View style={styles.buttons}>
              <CustomButton
                title="Cancel"
                onPress={toggleModal}
                containerStyle={{ width: 80, backgroundColor: "#fff" }}
                textStyle={{ color: "#fff" }}
              />
              <CustomButton
                title="Send Request"
                onPress={sendRequest}
                containerStyle={{ width: 130 }}
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
        <TouchableOpacity style={{ marginLeft: "1%" }}>
          <MaterialCommunityIcons
            name="email-send"
            size={45}
            color="#FF5C00"
            onPress={() => router.push("/drawer/(friends)/friendRequests")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: "1%" }}>
          <AntDesign
            name="adduser"
            size={42}
            color="#FF5C00"
            onPress={toggleModal}
          />
        </TouchableOpacity>
      </View>
      <FriendList />
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
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
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
