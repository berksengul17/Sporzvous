import CustomButton from "@/components/CustomButton";
import ErrorModal from "@/components/ErrorModal";
import EvaluateEventModal from "@/components/EvaluateEventModal";
import PlayerRow from "@/components/PlayerRow";
import RatingModal from "@/components/RatingModal";
import { Event } from "@/context/EventProvider";
import { User, useUserContext } from "@/context/UserProvider";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const TIME_LIMIT = 6;

const createDate = (eventDate: string, eventTime: string): Date => {
  const [year, month, day] = eventDate.split("-").map(Number);
  const [hours, minutes] = eventTime.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0);
};

const isButtonDisabled = (eventDate: string, eventTime: string): boolean => {
  const currentDate: Date = new Date();
  const givenDate: Date = createDate(eventDate, eventTime);

  const differenceInMilliseconds: number =
    currentDate.getTime() - givenDate.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours > TIME_LIMIT;
};

const MainEventScreen = () => {
  const { event: strEvent } = useLocalSearchParams();
  const { user, leaveEvent } = useUserContext();

  const [playerRating, setPlayerRating] = useState(2.5);
  const [eventData, setEventData] = useState<Event>(
    JSON.parse(strEvent as string)
  );
  const [teamA, setTeamA] = useState<User[]>();
  const [teamB, setTeamB] = useState<User[]>();
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [showEvaluateEventPopup, setShowEvaluateEventPopup] = useState(false);
  const [showLeaveEventPopup, setShowLeaveEventPopup] = useState(false);
  const [showLeaveEventError, setShowLeaveEventError] = useState(false);
  const [leaveEventError, setLeaveEventError] = useState("");
  const [ratePlayer, setRatePlayer] = useState<User | null>(null);
  const [mvp, setMvp] = useState("Mvp");
  const [isMapVisible, setIsMapVisible] = useState(false);

  const buttonDisabled = isButtonDisabled(
    eventData.eventDate,
    eventData.eventTime
  );

  useEffect(() => {
    setTeamA(eventData.teams[0].users);
    setTeamB(eventData.teams[1].users);
  }, []);

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

  const handleLeaveEvent = async () => {
    try {
      await leaveEvent(eventData.eventId);
      setShowLeaveEventPopup(false);
      // TODO değişecek
      Alert.alert("Success", "You have successfully left the event.");
      router.back();
    } catch (error) {
      setLeaveEventError((error as Error).message);
      setShowLeaveEventError(true);
    }
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
          <Text style={styles.header}>{eventData.title}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.label}>
            <Text style={styles.details}>{eventData.eventDate}</Text>
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
            <Text style={styles.details}>{eventData.organizer.fullName}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.details}>{eventData.eventTime}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.details}>{eventData.sport}</Text>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          {/* <Text style={styles.teamScore}>{event.organizer.fullName}</Text> */}
          <Text style={styles.teamScore}>{eventData.teams[0].score}</Text>
          <Text style={styles.scoreDash}>-</Text>
          <Text style={styles.teamScore}>{eventData.teams[1].score}</Text>
          {/* <Text style={styles.teamScore}>{event.organizer.fullName}</Text> */}
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
              event={eventData}
              handlePlayerPress={handlePlayerPress}
              handleRatePress={handleRatePress}
            />
          )}
          keyExtractor={(item) => item.userId.toString()}
          style={{ width: "100%" }}
        />
        <FlatList
          data={teamB}
          renderItem={({ item }) => (
            <PlayerRow
              player={item}
              event={eventData}
              handlePlayerPress={handlePlayerPress}
              handleRatePress={handleRatePress}
            />
          )}
          keyExtractor={(item) => item.userId.toString()}
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {eventData.organizer.userId !== user.userId &&
          eventData.isEventOver === 0 && (
            <CustomButton
              title="Leave Event"
              onPress={() => setShowLeaveEventPopup(true)}
            />
          )}
        {eventData.organizer.userId === user.userId &&
          eventData.isEventOver === 1 && (
            <CustomButton title="Finish" onPress={handleFinishEvent} />
          )}
        {eventData.organizer.userId === user.userId &&
          eventData.isEventOver === 2 && (
            <CustomButton
              title="Evaluate Event"
              disabled={buttonDisabled}
              onPress={handleEvaluateEvent}
              containerStyle={buttonDisabled ? { opacity: 0.5 } : {}}
            />
          )}
        {eventData.organizer.userId !== user.userId &&
          eventData.isEventOver === 2 && (
            <CustomButton
              title="Rate Organizer"
              disabled={buttonDisabled}
              onPress={handleRateOrganizer}
              containerStyle={buttonDisabled ? { opacity: 0.5 } : {}}
            />
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
        eventId={eventData.eventId}
        visible={showEvaluateEventPopup}
        setEventData={setEventData}
        handleCancel={() => setShowEvaluateEventPopup(false)}
      />
      <Modal visible={isMapVisible}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: eventData.latitude, // Event latitude
              longitude: eventData.longitude, // Event longitude
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: eventData.latitude,
                longitude: eventData.longitude,
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
      {/* TODO stil lazım */}
      <Modal visible={showLeaveEventPopup} animationType="slide">
        <View>
          <Text>Are you sure you want to leave the event?</Text>
          <Button title="Yes" onPress={handleLeaveEvent} />
          <Button title="No" onPress={() => setShowLeaveEventPopup(false)} />
        </View>
      </Modal>
      <ErrorModal
        error={leaveEventError}
        modalVisible={showLeaveEventError}
        setModalVisible={setShowEvaluateEventPopup}
      />
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
