import { Event, useEventContext } from "@/context/EventProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EventItem = ({ event }: { event: Event }) => {
  return (
    <TouchableOpacity
      style={styles.eventContainer}
      onPress={() =>
        router.push({
          pathname: "drawer/(home)/join_event",
          params: { event: JSON.stringify(event) },
        })
      }
    >
      <View style={styles.eventhostrow}>
        <Text>{event.organizer.fullName}</Text>
      </View>
      <View style={styles.eventtitlerow}>
        <Text numberOfLines={1}>{event.title}</Text>
      </View>
      <View style={styles.eventsportrow}>
        <Text>{event.sport}</Text>
      </View>
      <View style={styles.eventcapacityrow}>
        <Text numberOfLines={1}>
          {event.participants}/{event.maxParticipants}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { events, fetchEvents, addEvent } = useEventContext(); // Use events from context
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.isEventOver === 0 && // Add this line to check if the event is not over
      (event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.organizer.fullName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        event.sport.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <View style={styles.container}>
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
        data={filteredEvents}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.eventId.toString()}
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
