import CustomButton from "@/components/CustomButton";
import EvaluateEventModal from "@/components/EvaluateEventModal";
import PlayerRow from "@/components/PlayerRow";
import RatingModal from "@/components/RatingModal";
import { Event } from "@/context/EventProvider";
import { User } from "@/context/UserProvider";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal/dist/modal";

const MainEventScreen = () => {
  const { event: strEvent } = useLocalSearchParams();
  const event: Event = JSON.parse(strEvent as string);

  const [playerRating, setPlayerRating] = useState(2.5);
  const [eventData, setEventData] = useState(event);
  const [teamA, setTeamA] = useState();
  const [teamB, setTeamB] = useState();
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [showEvaluateEventPopup, setShowEvaluateEventPopup] = useState(false);
  const [ratePlayer, setRatePlayer] = useState<User | null>(null);
  const [mvp, setMvp] = useState("Mvp");
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    console.log("event", eventData);
  }, [eventData]);

  const handlePlayerPress = (player: User) => {
    console.log("Navigate to player profile:", player.fullName);
  };

  const handleRatePress = (player: User) => {
    setRatePlayer(player);
    setShowRatePopup(true);
  };

  const handleRatingCompleted = (rating: number) => {
    console.log("Rated: ", rating);
    setPlayerRating(rating);
  };

  const handleSaveRating = () => {
    setShowRatePopup(false);
    // Save the rating logic here
  };

  const handleFinishEvent = () => {
    setEventData({ ...eventData, isEventOver: 2 });
    console.log("finishing...");
    // Save the status change logic here
  };

  const handleRateOrganizer = () => {
    setShowOrganizerPopup(true);
  };

  const handleEvaluateEvent = () => {
    setShowEvaluateEventPopup(true);
  };

  const handleSaveOrganizerRating = () => {
    setShowOrganizerPopup(false);
  };

  const handleLocationClick = () => {
    setIsMapVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.eventInfoContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backIconContainer}
          >
            <AntDesign name="back" size={30} color="#FF5C00" />
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
            <FontAwesome5 name="map-marker-alt" size={24} color="#00C773" />
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
          <Text style={styles.teamScore}>{event.organizer.fullName}</Text>
          <Text style={styles.teamScore}>7</Text>
          <Text style={styles.scoreDash}>-</Text>
          <Text style={styles.teamScore}>8</Text>
          <Text style={styles.teamScore}>{event.organizer.fullName}</Text>
        </View>
      </View>
      <View style={styles.playersTitleContainer}>
        <Text style={styles.playersTitle}>Players A</Text>
        <Text style={styles.playersTitle}>Players B</Text>
      </View>
      <View style={styles.playersContainer}>
        <FlatList
          data={teamA}
          renderItem={({ item }) => (
            <PlayerRow
              player={item}
              event={event}
              handlePlayerPress={handlePlayerPress}
              handleRatePress={handleRatePress}
            />
          )}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
        <FlatList
          data={teamB}
          renderItem={({ item }) => (
            <PlayerRow
              player={item}
              event={event}
              handlePlayerPress={handlePlayerPress}
              handleRatePress={handleRatePress}
            />
          )}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {event.organizer.userId === 1 && eventData.isEventOver === 1 && (
          <CustomButton title="Finish" onPress={handleFinishEvent} />
        )}
        {event.organizer.userId === 1 && eventData.isEventOver === 2 && (
          <CustomButton title="Evaluate Event" onPress={handleEvaluateEvent} />
        )}
        {event.organizer.userId !== 1 && eventData.isEventOver === 0 && (
          <CustomButton
            title="Leave"
            onPress={() => console.log("Leave event")}
          />
        )}
        {event.organizer.userId !== 1 && eventData.isEventOver === 2 && (
          <CustomButton title="Rate Organizer" onPress={handleRateOrganizer} />
        )}
      </View>
      <RatingModal
        visible={showRatePopup}
        title={`Rate: ${ratePlayer?.fullName}`}
        playerName={ratePlayer?.fullName}
        handleRatingCompleted={handleRatingCompleted}
        handleSaveRating={handleSaveRating}
        handleCancel={() => setShowRatePopup(false)}
      />
      <RatingModal
        visible={showOrganizerPopup}
        title="Rate Organizer"
        handleRatingCompleted={handleRatingCompleted}
        handleSaveRating={handleSaveOrganizerRating}
        handleCancel={() => setShowOrganizerPopup(false)}
      />
      <EvaluateEventModal
        eventId={event.eventId}
        visible={showEvaluateEventPopup}
        handleCancel={() => setShowEvaluateEventPopup(false)}
      />

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

export default MainEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  eventInfoContainer: {
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  backIconContainer: {
    position: "absolute",
    justifyContent: "center",
    left: 0,
    top: 0,
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
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 1,
    padding: 10,
    borderBottomWidth: 1,
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
    alignSelf: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "95%",
  },
  playersContainer: {
    flexDirection: "row",
    flex: 1,
  },
  playersTitle: {
    fontSize: 27,
    color: "#FF5C00",
  },

  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
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
