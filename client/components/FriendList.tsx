import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { User, useUserContext } from "@/context/UserProvider";

const FriendItem = ({
  friend,
  onPress,
}: {
  friend: User;
  onPress: (userId: number) => void;
}) => (
  <View style={styles.friendContainer}>
    {/* <Image source={friend.imageUri} style={styles.profileImage} /> */}
    <View style={styles.friendInfo}>
      <CustomText
        customStyle={styles.friendName}
        text={friend.fullName}
        isBold={true}
      />
      <CustomText
        customStyle={styles.friendLastSeen}
        text={`Last seen: Yesterday`}
      />
    </View>
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => onPress(friend.userId)}
    >
      <AntDesign name="message1" size={24} color="#FF5C00" />
    </TouchableOpacity>
  </View>
);

const FriendList = () => {
  const { user } = useUserContext();

  const handlePress = (receiverId: number) => {
    router.push({
      pathname: "/drawer/(friends)/chatScreen",
      params: { receiverId: user.userId === 1 ? 2 : 1 },
    });
  };

  return (
    <>
      <FlatList
        data={user.friends}
        renderItem={({ item }) => (
          <FriendItem friend={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item.userId.toString()}
        style={styles.list}
      />
    </>
  );
};

export default FriendList;

const styles = StyleSheet.create({
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
});
