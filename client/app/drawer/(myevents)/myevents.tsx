import { Event, useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CheckBox from "expo-checkbox";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "@/context/DarkModeContext";

function EventStatus({ isEventOver }: { isEventOver: number }) {
  const { t } = useTranslation("myeventsPage");

  if (isEventOver === 2) {
    return (
      <View style={[styles.statusContainer, styles.completed]}>
        <Entypo name="check" size={16} color="white" />
        <Text style={styles.statusText}>{t("completed")}</Text>
      </View>
    );
  } else if (isEventOver === 1) {
    return (
      <View style={[styles.statusContainer, styles.OnGoing]}>
        <Entypo name="check" size={16} color="white" />
        <Text style={styles.statusText}>{t("ongoing")}</Text>
      </View>
    );
  }
  return (
    <View style={[styles.statusContainer, styles.notStarted]}>
      <MaterialCommunityIcons
        name="timer-sand-complete"
        size={16}
        color="white"
      />
      <Text style={styles.statusText}>{t("notStarted")}</Text>
    </View>
  );
}

const EventItem = ({ event }: { event: Event }) => {
  const { t } = useTranslation("myeventsPage");
  const { isDarkMode } = useDarkMode();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "drawer/(myevents)/mainEventScreen",
          params: {
            event: JSON.stringify({ ...event }),
          },
        })
      }
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text
          style={[styles.eventName, { color: isDarkMode ? "#fff" : "#333" }]}
        >
          {event.title}
        </Text>
        <EventStatus isEventOver={event.isEventOver} />
      </View>
      <View style={styles.cardContent}>
        <Text
          style={[styles.eventDetail, { color: isDarkMode ? "#fff" : "#666" }]}
        >
          {t("organizer")}: {event.organizer.fullName}
        </Text>
        <Text
          style={[styles.eventDetail, { color: isDarkMode ? "#fff" : "#666" }]}
        >
          {t("sport")}: {event.sport}
        </Text>
        <Text
          style={[styles.eventDetail, { color: isDarkMode ? "#fff" : "#666" }]}
        >
          {t("date")}: {event.eventDate}
        </Text>
        <Text
          style={[styles.eventDetail, { color: isDarkMode ? "#fff" : "#666" }]}
        >
          {t("time")}: {event.eventTime}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity>
          <Feather
            name="upload"
            size={24}
            color="#FF5C00"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="delete"
            size={24}
            color="#FF5C00"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function MyEvents() {
  const { user } = useUserContext();
  const { fetchMyEvents } = useEventContext();
  const [searchText, setSearchText] = useState("");
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const isFocused = useIsFocused();
  const { t } = useTranslation("myeventsPage");
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const getMyEvents = async () => {
      console.log("fetching my events");
      setMyEvents(await fetchMyEvents());
      console.log("fetched my events");
    };
    if (isFocused) {
      getMyEvents();
    }
  }, [isFocused, user]);

  const filteredEvents = myEvents.filter((event) => {
    const matchesSearchText =
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.organizer.fullName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchText.toLowerCase());
    const matchesShowMyEvents =
      !showMyEvents || event.organizer.fullName === user.fullName;

    return matchesSearchText && matchesShowMyEvents;
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "white" },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: isDarkMode ? "#444" : "#F0F0F0" },
          ]}
        >
          <Ionicons name="search" size={20} color="#6F6F6F" />
          <TextInput
            style={[styles.searchText, { color: isDarkMode ? "#fff" : "#000" }]}
            placeholder={t("search")}
            placeholderTextColor="#6F6F6F"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("drawer/(myevents)/filterEvents")}
        >
          <AntDesign
            name="filter"
            size={30}
            color="#FF5C00"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={showMyEvents}
          onValueChange={setShowMyEvents}
          color="#FF5C00"
        />
        <Text
          style={[
            styles.checkboxLabel,
            { color: isDarkMode ? "#fff" : "#333" },
          ]}
        >
          {t("showMyEvents")}
        </Text>
      </View>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.eventId?.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
  },
  searchText: {
    marginLeft: 10,
    flex: 1,
  },
  filterIcon: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  ongoing: {
    backgroundColor: "#FF9000",
  },
  completed: {
    backgroundColor: "#32CD32",
  },
  OnGoing: {
    backgroundColor: "lightblue",
  },
  notStarted: {
    backgroundColor: "#FF5C00",
  },
  statusText: {
    color: "white",
    marginLeft: 5,
  },
  cardContent: {
    marginBottom: 10,
  },
  eventDetail: {
    fontSize: 14,
    color: "#666",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginHorizontal: 5,
  },
});
