import { Event, useEventContext } from "@/context/EventProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "@/context/DarkModeContext"; // Adjust the import path as necessary

const EventItem = ({ event }: { event: Event }) => {
  const defaultImage = require("../../../assets/images/default-profile-photo.jpg");
  const { t } = useTranslation();

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
      <Image
        source={
          event.organizerImage ? { uri: event.organizerImage } : defaultImage
        }
        style={styles.eventImage}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.username}>{event.organizer.fullName}</Text>
        <Text numberOfLines={1} style={styles.eventName}>
          {event.title}
        </Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.sport}>
          {t(`sports.${event.sport.toLowerCase().replace(/ /g, "_")}`)}
        </Text>
        <Text style={styles.capacity}>
          {event.participants}/{event.maxParticipants}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { events } = useEventContext();
  const [searchText, setSearchText] = useState("");
  const route = useRoute();
  const { sport } = route.params;
  const { t } = useTranslation("homeScreen");
  const { isDarkMode } = useDarkMode();

  if (!events) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#333" : "white" },
        ]}
      >
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
          {t("loading")}
        </Text>
      </View>
    );
  }

  const filteredEvents = events.filter(
    (event) =>
      event.isEventOver === 0 &&
      event.sport.toLowerCase() === sport.toLowerCase() &&
      (event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.organizer.fullName
          .toLowerCase()
          .includes(searchText.toLowerCase()))
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "white" },
      ]}
    >
      <Text
        style={[styles.heading, { color: isDarkMode ? "#FF5C00" : "#FF5C00" }]}
      >
        {t("upcomingEvents", { sport: t(`sports.${sport.toLowerCase()}`) })}
      </Text>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? "#555" : "#F0F0F0" },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={isDarkMode ? "#888" : "#6F6F6F"}
        />
        <TextInput
          style={[
            styles.searchText,
            { color: isDarkMode ? "#fff" : "#6F6F6F" },
          ]}
          placeholder={t("search")}
          placeholderTextColor={isDarkMode ? "#888" : "#6F6F6F"}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "drawer/(home)/filterModal",
              params: { filteredEvents: JSON.stringify(filteredEvents) },
            })
          }
          style={styles.filterButton}
        >
          <Ionicons name="filter" size={24} color="#FF5C00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.eventId.toString()}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  selectSportText: {
    fontSize: 16,
    color: "#FF5C00",
    margin: 16,
    borderBottomWidth: 1,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF5C00",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5C00",
    margin: 16,
    textAlign: "center",
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  eventInfo: {
    flex: 1,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  eventName: {
    color: "#6F6F6F",
  },
  sport: {
    color: "#FF5C00",
    alignSelf: "flex-end",
  },
  capacity: {
    color: "grey",
    alignSelf: "flex-end",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FF5C00",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
