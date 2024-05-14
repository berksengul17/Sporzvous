import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const eventData = [
  {
    id: "1",
    name: "Esenyurt Hailsaha",
    sport: "Football",
    host: "Çağan Özsir",
    date: "20.04.2024",
  },
  {
    id: "2",
    name: "Tennis",
    sport: "Tennis",
    host: "Emre Erol",
    date: "05.05.2024",
  },
  {
    id: "3",
    name: "Berk’s Tennis",
    sport: "Tennis",
    host: "Berk Şengül",
    date: "07.05.2024",
  },
  {
    id: "4",
    name: "Bornova Futbol",
    sport: "Football",
    host: "Emre Erol",
    date: "12.05.2024",
  },
  // Add more events here
];

const EventItem = ({ event }) => (
  <View style={styles.eventContainer}>
    <View style={styles.eventRow}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventSport}>{event.sport}</Text>
      <FontAwesome5 name="check-circle" size={24} color="green" />
    </View>
    <View style={styles.eventRow}>
      <Text style={styles.eventHost}>{event.host}</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
      <TouchableOpacity>
        <Octicons name="upload" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="delete" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MyEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={"gray"}
          />
        </View>
        <TouchableOpacity>
          <AntDesign
            name="filter"
            size={40}
            color="orange"
            style={{ margin: 4 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventData}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.wave}>
        <Image source={require("../../assets/images/Waves.png")} />
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
    flex: 1,
  },
  eventContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  eventName: {
    fontWeight: "bold",
  },
  eventSport: {
    color: "orange",
    marginRight: 10,
  },
  eventHost: {
    color: "gray",
  },
  eventDate: {
    color: "gray",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});
