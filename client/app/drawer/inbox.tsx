import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";

const friendsData = [
  {
    id: "1",
    name: "Emre Erol",
    lastMessage: "Last Message",
    imageUri: require("../../assets/images/friendpp.jpg"),
    lastSeenDay: "Monday",
  },
  {
    id: "2",
    name: "Jane Doe",
    lastMessage: "Geliyorum",
    imageUri: require("../../assets/images/friendpp.jpg"),
    lastSeenDay: "Tuesday",
  },
  {
    id: "3",
    name: "John Smith",
    lastMessage: "Last",
    imageUri: require("../../assets/images/friendpp.jpg"),
    lastSeenDay: "Wednesday",
  },
  // add more friends here
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendContainer}>
    <Image source={friend.imageUri} style={styles.profileImage} />
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5 name="check-double" size={14} color="#FF5C00" style={{ padding: 5 }} />
        <Text style={styles.friendLastSeen}>{friend.lastMessage}</Text>
      </View>
    </View>
    <Text style={styles.lastSeenDay}>{friend.lastSeenDay}</Text>
  </View>
);

export default function InboxScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
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
  lastSeenDay: {
    color: "#FF5C00",
    fontSize: 14,
  },
});
