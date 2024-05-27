import { Event, useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

function EventStatus({ isEventOver }: { isEventOver: number }) {
  if (isEventOver === 1) {
    return <Entypo name="check" size={24} color="black" style={styles.check} />;
  }
  return (
    <MaterialCommunityIcons
      name="timer-sand-complete"
      size={24}
      color="black"
      style={styles.sandwatch}
    />
  );
}

const Status = ({ event }: { event: Event }) => {
  return EventStatus(event);
};

const EventItem = ({ event }: { event: Event }) => {
  const navigateByCondition = () => {
    if (event.isEventOver === 1) {
      router.push("drawer/(myevents)/ratePlayersFinished", { event });
    } else {
      router.push("drawer/(myevents)/ratePlayersUnfinished", { event });
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "./eventDetail/[id]",
          params: { id: event.eventId },
        })
      }
    >
      <View style={styles.eventContainer}>
        <View style={styles.eventRow}>
          <View style={styles.labelView}>
            <Text style={styles.eventName}>{event.title}</Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.eventSport}>{event.sport}</Text>
          </View>
          <Status event={event} />
        </View>
        <View style={styles.eventRow}>
          <View style={styles.labelView}>
            <Text style={styles.eventHost}>{event.organizer.fullName}</Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.eventDate}>{event.eventDate}</Text>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity>
              <Feather
                name="upload"
                size={24}
                color="#FF5C00"
                style={{ marginRight: "10%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="delete" size={24} color="#FF5C00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MyEvents() {
  const { user } = useUserContext();
  const { fetchMyEvents } = useEventContext();
  const [searchText, setSearchText] = useState("");
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log("fetching");

    const getMyEvents = async () => {
      setMyEvents(await fetchMyEvents());
    };

    getMyEvents();
  }, [user]);

  useEffect(() => {
    console.log("myevents", myEvents);
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
            placeholderTextColor={"#6F6F6F"}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity>
          <AntDesign
            name="filter"
            size={40}
            color="#FF5C00"
            style={{ margin: 4 }}
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  eventName: {
    color: "#6F6F6F",
  },
  eventSport: {
    color: "#6F6F6F",
  },
  eventHost: {
    color: "#6F6F6F",
  },
  eventDate: {
    color: "#6F6F6F",
  },
  sandwatch: {
    borderWidth: 1,
    backgroundColor: "#FAFF00",
    borderColor: "#FAFF00",
    borderRadius: 6,
    overflow: "hidden",
    padding: 2,
  },
  check: {
    borderWidth: 1,
    backgroundColor: "#00FF94",
    borderColor: "#00FF94",
    borderRadius: 6,
    overflow: "hidden",
    padding: 2,
  },
  labelView: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonView: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});
