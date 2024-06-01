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

const getEventStatus = (isEventOver) => {
  switch (isEventOver) {
    case 0:
      return "Not Started";
    case 1:
      return "OnGoing";
    case 2:
      return "Finished";
    default:
      return "Unknown";
  }
};

function EventStatus({ isEventOver }: { isEventOver: number }) {
  if (isEventOver === 2) {
    return (
      <View style={[styles.statusContainer, styles.completed]}>
        <Entypo name="check" size={16} color="white" />
        <Text style={styles.statusText}>Completed</Text>
      </View>
    );
  } else if (isEventOver === 1) {
    return (
      <View style={[styles.statusContainer, styles.OnGoing]}>
        <Entypo name="check" size={16} color="white" />
        <Text style={styles.statusText}>OnGoing</Text>
      </View>
    );
  }
  return (
    <View style={[styles.statusContainer, styles.ongoing]}>
      <MaterialCommunityIcons
        name="timer-sand-complete"
        size={16}
        color="white"
      />
      <Text style={styles.statusText}>Not Started</Text>
    </View>
  );
}

const EventItem = ({ event }: { event: Event }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "drawer/(myevents)/mainEventScreen",
          params: {
            event: JSON.stringify({
              eventId: 1,
              title: "Dkdkk",
              sport: "Tennis",
              locationCity: "Diyarbakır",
              locationDistrict: "Lice",
              participants: 0,
              teamNumber: 2,
              eventDate: "2024-06-12",
              eventTime: "21:52:00",
              skillRating: 2.5,
              locationIndex: "5",
              isEventOver: 1,
              organizer: {
                userId: 1,
                email: "a@gmail.com",
                password: "123",
                fullName: "Berk Şengül",
                username: "bekirsama",
                country: "Turkey",
                image: null,
                age: 21,
                gender: "Male",
                favoriteSport: "Football",
                eventCount: 12,
                isVerified: 0,
                status: null,
                events: [],
                friends: [],
                teams: [],
                sentRequests: [],
                receivedRequests: [],
                sportRatings: [],
                imageAsBase64: null,
              },
              users: [],
              maxParticipants: 2,
              latitude: null,
              longitude: null,
              organizerImage: "data:image/jpeg;base64,null",
            }),
          },
        })
      }
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.eventName}>{event.title}</Text>
        <EventStatus isEventOver={event.isEventOver} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.eventDetail}>
          Organizer: {event.organizer.fullName}
        </Text>
        <Text style={styles.eventDetail}>Sport: {event.sport}</Text>
        <Text style={styles.eventDetail}>Date: {event.eventDate}</Text>
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
  const isFocused = useIsFocused();

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

  useEffect(() => {
    myEvents.forEach((event: Event) => {
      console.log(event.eventId);
      console.log(event.organizer.fullName);
      console.log("----------------");
    });
  }, [myEvents]);

  const filteredEvents = myEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.organizer.fullName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6F6F6F" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor="#6F6F6F"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity>
          <AntDesign
            name="filter"
            size={30}
            color="#FF5C00"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
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
    backgroundColor: "white",
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
    backgroundColor: "#F0F0F0",
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
  card: {
    backgroundColor: "white",
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
