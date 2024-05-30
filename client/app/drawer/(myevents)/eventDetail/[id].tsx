import CustomButton from "@/components/CustomButton";
import { Event, useEventContext } from "@/context/EventProvider";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";

const eventTeamsA = [
  {
    id: "1",
    playerName: "caganozsir",
  },
];

const eventTeamsB = [
  {
    id: "1",
    playerName: "emre",
  },
];

const EventInformation = ({ event }: { event: Event }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);

  const handleLocationClick = () => {
    setIsMapVisible(true);
  };

  return (
    <View style={styles.eventInfoContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backIconContainer}
        >
          <AntDesign name="back" size={30} color={"#FF5C00"} />
        </TouchableOpacity>
        <Text style={styles.header}>{event.title}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.label}>
          <Text style={styles.details}>{event.eventDate}</Text>
        </View>
        <TouchableOpacity
          style={styles.locationView}
          onPress={handleLocationClick}
        >
          <Text style={styles.location}>Location</Text>
          <Entypo name="location-pin" size={24} color="#00C773" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.label}>
          <Text style={styles.details}>{event.organizer.fullName}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.details}>{event.eventTime}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.details}>{event.sport}</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.teamScore}>{event.team_a} </Text>
        <Text style={styles.teamScore}>{event.team_a_score}</Text>
        <Text style={styles.scoreDash}>-</Text>
        <Text style={styles.teamScore}>{event.team_b_score}</Text>
        <Text style={styles.teamScore}>{event.team_b}</Text>
      </View>

      <Modal isVisible={isMapVisible}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: event.latitude, // Event latitude
              longitude: event.longitude, // Event longitude
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              title="Event Location"
            />
          </MapView>
          <Button
            title="Close"
            onPress={() => setIsMapVisible(false)}
            color="red"
          />
        </View>
      </Modal>
    </View>
  );
};

const TeamInformation = ({ team }) => {
  return (
    <View style={styles.playerRow}>
      <View style={styles.player_a}>
        <View style={styles.playerName}>
          <Text>{team.playerName}</Text>
        </View>
        <TouchableOpacity style={styles.ratePlayer}>
          <MaterialIcons name="delete-outline" size={29} color="#FF3647" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ratePlayer}>
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EventDetail = () => {
  const { id } = useLocalSearchParams();
  const { fetchEvent } = useEventContext();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (id) {
      fetchEvent(Number(id))
        .then((event) => setEvent(event))
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <View style={styles.pageContainer}>
      {event && <EventInformation event={event} />}
      <View style={styles.playersTitleContainer}>
        <Text style={styles.playersTitle}>Players A</Text>
        <Text style={styles.playersTitle}>Players B</Text>
      </View>
      <View style={styles.playersContainer}>
        <FlatList
          data={eventTeamsA}
          renderItem={({ item }) => <TeamInformation team={item} />}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
        <FlatList
          data={eventTeamsB}
          renderItem={({ item }) => <TeamInformation team={item} />}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Leave"
          onPress={() => router.replace("drawer/myevents")}
        />
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  eventInfoContainer: {
    padding: 20,
    alignItems: "center",
    width: "100%", // Ensure this container fills the width
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center", // This centers the children
    alignItems: "center", // Aligns children vertically in the center
    position: "relative", // Allows absolute positioning of the back icon
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  backIconContainer: {
    position: "absolute", // Position it over the relative container
    justifyContent: "center", // This centers the children
    left: 0, // Move it 10 pixels from the left
    top: 0, // Align it to the top
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF5C00",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    marginTop: 10,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: "#787878",
  },
  location: {
    fontSize: 16,
    color: "#00C773",
    padding: 2,
    marginLeft: 4,
  },
  locationView: {
    flexDirection: "row",
    borderStyle: "solid",
    padding: 2,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#00C773",
  },
  scoreContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "85%",
    justifyContent: "space-around",
  },
  teamScore: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreDash: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  label: {
    borderStyle: "solid",
    padding: 4,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#B7B7B7",
  },
  playersTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
  playersContainer: {
    flexDirection: "row",
    flex: 1,
  },
  playersTitle: {
    fontSize: 27,
    color: "#FF5C00",
  },
  playerRow: {
    flex: 1,
    flexDirection: "row",
    margin: 2,
    padding: 4,
  },
  player_a: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
    marginRight: 10,
  },
  player_b: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  playerName: {
    flex: 1,
    alignSelf: "center",
  },
  ratePlayer: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  wave: {
    position: "static",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
