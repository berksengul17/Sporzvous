import { View, Text, Modal, Image, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { User } from "@/context/UserProvider";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "@/components/CustomText";

const FriendRequestItem = ({ user /*: User*/ }) => {
  const handleAccept = () => alert("Accept clicked.");
  const handleReject = () => alert("Reject clicked.");

  return (
    <View style={styles.requestItem}>
      <TouchableOpacity
        style={styles.picAndName}
        onPress={() => console.log("Profile clicked!")} //buraya router.push(commentor.profile) tarzı bi şey yazılcak sanırım
      >
        <Image
          source={{
            uri: user.profilePicUrl,
          }}
          style={styles.profilePic}
        />

        <CustomText
          customStyle={styles.name}
          text={user.fullName}
          isBold={true}
        />
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleAccept} style={styles.button}>
          <FontAwesome5 name="check-circle" size={40} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReject} style={styles.button}>
          <Octicons name="x-circle" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Page = () => {
  const [userList, setUserList] = useState([
    {
      id: 1,
      fullName: "Çağan Özsır",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: 2,
      fullName: "Bekir Şengül",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: 3,
      fullName: "Emre Erol",
      profilePicUrl: "https://via.placeholder.com/48",
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({ item }) => <FriendRequestItem user={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.wave}>
        <Image source={require("../../../assets/images/Waves.png")} />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6347",
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    margin: 20,
  },
  picAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 10,
  },
  wave: {
    position: "static",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});
