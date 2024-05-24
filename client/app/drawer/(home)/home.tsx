import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const eventData = [
  {
    id: "1",
    title: "Esenyurt Hailsaha",
    sport: "Football",
    host: "Çağan Özsir",
    playernum: 2,
    eventcapacity: 10,
  },
  {
    id: "2",
    title: "Tennis",
    sport: "Tennis",
    host: "Emre Erol",
    playernum: 3,
    eventcapacity: 20,
  },
  {
    id: "3",
    title: "Berk’s Tennis",
    sport: "Tennis",
    host: "Berk Şengül",
    playernum: 2,
    eventcapacity: 30,
  },
  {
    id: "4",
    title: "Bornova Futbol",
    sport: "Football",
    host: "Emre Erol",
    playernum: 5,
    eventcapacity: 40,
  },
  // Add more events here
];

const EventItem = ({ event }) => {
  const navigation = useNavigation();  // Hook to access the navigation object
  return (
    <TouchableOpacity 
      style={styles.eventContainer}
      onPress={() => router.push('join_event')} // Assuming 'EventDetails' is the route name
    >
      <View style={styles.eventhostrow}>
        <Text>{event.host}</Text>
      </View>
      <View style={styles.eventtitlerow}>
        <Text numberOfLines={1}>{event.title}</Text>
      </View>
      <View style={styles.eventsportrow}>
        <Text>{event.sport}</Text>
      </View>
      <View style={styles.eventcapacityrow}>
        <Text numberOfLines={1}>
          {event.playernum}/{event.eventcapacity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6F6F6F" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={"#6F6F6F"}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("drawer/(home)/filterModal")}
          style={styles.filterButton}
        >
          <AntDesign name="filter" size={40} color="#FF5C00" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleview}>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity
          onPress={() => router.push("drawer/(home)/createEventModal")}
          style={styles.addButton}
        >
          <AntDesign name="plussquare" size={40} color="#FF5C00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventData}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.id}
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
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  searchBar: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    borderRadius: 10,
  },
  filterButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  titleview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  searchText: {
    marginLeft: 10,
    color: "#6F6F6F",
    flex: 1,
  },
  eventContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF5C00",
    alignSelf: "center",
  },
  addButton: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
  eventhostrow: {
    flex: 1,
  },
  eventtitlerow: {
    flex: 1,
  },
  eventsportrow: {
    flex: 1,
    alignItems: "center",
  },
  eventcapacityrow: {
    alignItems: "flex-end",
  },
  username: {
    fontWeight: "bold",
  },
  eventName: {
    color: "#6F6F6F",
  },
  sport: {
    fontStyle: "italic",
  },
  wave: {
    position: "static",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});
