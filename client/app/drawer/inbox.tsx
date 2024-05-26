import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import axios from 'axios';

const InboxScreen = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchInboxData();
  }, []);

  const fetchInboxData = async () => {
    try {
      const response = await axios.get('http://YOUR_BACKEND_API_URL/api/messages/inbox', {
        params: { userId: 'CURRENT_USER_ID' } // Replace with actual user ID
      });
      setFriendsData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch inbox data.");
    }
  };

  const FriendItem = ({ friend }) => (
    <View style={styles.friendContainer}>
      <Image source={{ uri: friend.imageUri }} style={styles.profileImage} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="check-double" size={14} color="#FF5C00" style={{ padding: 5 }} />
          <Text style={styles.friendLastSeen}>{friend.lastMessage}</Text>
        </View>
      </View>
      <Text>{friend.lastSeenDay}</Text>
    </View>
  );

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
};

export default InboxScreen;

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
});
