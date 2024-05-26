import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";

const FriendRequestItem = ({ user }) => {
  const handleAccept = () => alert("Accept clicked.");
  const handleReject = () => alert("Reject clicked.");

  return (
    <View style={styles.requestItem}>
      <TouchableOpacity
        style={styles.picAndName}
        onPress={() => console.log("Profile clicked!")}
      >
        <Image source={user.profilePicUrl} style={styles.profilePic} />
        <CustomText customStyle={styles.name} text={user.fullName} isBold={true} />
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleAccept} style={[styles.button, styles.acceptButton]}>
          <MaterialCommunityIcons name="check" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReject} style={[styles.button, styles.rejectButton]}>
          <MaterialCommunityIcons name="close" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FriendsRequestsScreen = () => {
  const [userList, setUserList] = useState([
    {
      id: 1,
      fullName: "Çağan Özsır",
      profilePicUrl: require("../../../assets/images/friendpp.jpg"),
    },
    {
      id: 2,
      fullName: "Bekir Şengül",
      profilePicUrl: require("../../../assets/images/friendpp.jpg"),
    },
    {
      id: 3,
      fullName: "Emre Erol",
      profilePicUrl: require("../../../assets/images/friendpp.jpg"),
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({ item }) => <FriendRequestItem user={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default FriendsRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  requestItem: {
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
  picAndName: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingTop: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 40,
    height: 40,
  },
  acceptButton: {
    backgroundColor: "#FF5C00", // Orange
    shadowColor: "#FF5C00",
  },
  rejectButton: {
    backgroundColor: "#6F6F6F", // Grey
    shadowColor: "#6F6F6F",
  },
  icon: {
    textAlign: "center",
  },
});
