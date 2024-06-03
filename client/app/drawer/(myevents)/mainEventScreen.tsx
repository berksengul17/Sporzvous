import CustomButton from "@/components/CustomButton";
import ErrorModal from "@/components/ErrorModal";
import EvaluateEventModal from "@/components/EvaluateEventModal";
import PlayerRow from "@/components/PlayerRow";
import RatingModal from "@/components/RatingModal";
import { Event, useEventContext } from "@/context/EventProvider";
import { User, useUserContext } from "@/context/UserProvider";
import { useDarkMode } from "@/context/DarkModeContext";
import { useTranslation } from "react-i18next";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
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
  const { user, leaveEvent, addComment } = useUserContext();
  const { changeStatus } = useEventContext();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("mainEventScreen");

  const [playerRating, setPlayerRating] = useState(2.5);
  const [eventData, setEventData] = useState<Event>(
    JSON.parse(strEvent as string)
  );
  const [teamA, setTeamA] = useState<User[]>([]);
  const [teamB, setTeamB] = useState<User[]>([]);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [showEvaluateEventPopup, setShowEvaluateEventPopup] = useState(false);
  const [showLeaveEventPopup, setShowLeaveEventPopup] = useState(false);
  const [showLeaveEventError, setShowLeaveEventError] = useState(false);
  const [leaveEventError, setLeaveEventError] = useState("");
  const [showLeaveEventSuccess, setShowLeaveEventSuccess] = useState(false);
  const [ratePlayer, setRatePlayer] = useState<User | null>(null);
  const [mvp, setMvp] = useState("Mvp");
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [ratingReceiverIds, setRatingReceiverIds] = useState<number[]>([]);

  const buttonDisabled =
    isButtonDisabled(eventData.eventDate, eventData.eventTime) ||
    ratingReceiverIds.includes(eventData.organizer.userId);

  useEffect(() => {
    setTeamA(eventData.teams[0].users);
    setTeamB(eventData.teams[1].users);
    (async () => {
      await fetchRatingReceiverIds();
    })();
  }, []);

  useEffect(() => {
    console.log("IDS", ratingReceiverIds);
  }, [ratingReceiverIds]);

  const fetchRatingReceiverIds = async () => {
    try {
      console.log(
        "URL",
        `${process.env.EXPO_PUBLIC_API_URL}/api/ratings/get-event-ratings/${eventData.eventId}/${user.userId}`
      );
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/ratings/get-event-ratings/${eventData.eventId}/${user.userId}`
      );
      console.log("RESPONSE", response.data);
      setRatingReceiverIds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSaveRating = async (
    category: string,
    sport: string,
    userRating: number,
    content: string,
    userId: number
  ) => {
    try {
      console.log("saving comment");
      await addComment(
        category,
        sport,
        userRating,
        content,
        eventData.eventId,
        userId
      );
      await fetchRatingReceiverIds();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveEvent = async (userId: number, msg: string) => {
    try {
      await leaveEvent(eventData.eventId, userId);
      setShowLeaveEventPopup(false);
      setShowLeaveEventSuccess(true);
    } catch (error) {
      setLeaveEventError((error as Error).message);
      setShowLeaveEventError(true);
    }
  };

  const handleFinishEvent = async () => {
    try {
      setEventData({ ...eventData, isEventOver: 2 });
      await changeStatus(eventData.eventId, 2);
    } catch (error) {
      console.log(error);
    }
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

  const renderPlayerRows = (team: User[], teamSize: number) => {
    const playerRows = [];

    for (let i = 0; i < teamSize; i++) {
      playerRows.push(
        <PlayerRow
          key={i}
          player={team[i] || null}
          event={eventData}
          isSelf={team[i] && team[i].userId === user.userId}
          isOrganizer={user.userId === eventData.organizer.userId}
          commentDisabled={
            team[i] ? ratingReceiverIds.includes(team[i].userId) : false
          }
          handleKickPlayer={() =>
            handleLeaveEvent(
              team[i].userId,
              `You have successfully kicked ${team[i].username}.`
            )
          }
          handlePlayerPress={handlePlayerPress}
          handleRatePress={handleRatePress}
        />
      );
    }

    return playerRows;
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeBackground]}>
      <View style={styles.eventInfoContainer}>
        <View
          style={[
            styles.headerContainer,
            isDarkMode && { borderBottomColor: "#fff" },
          ]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backIconContainer}
          >
            <AntDesign name="back" size={30} color="#FF5C00" />
          </TouchableOpacity>
          <Text style={[styles.header, isDarkMode && styles.darkModeText]}>
            {eventData.title}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.label}>
            <Text style={[styles.details, isDarkMode && styles.darkModeText]}>
              {eventData.eventDate}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.locationView}
            onPress={handleLocationClick}
          >
            <Text style={[styles.location, isDarkMode && styles.darkModeText]}>
              {t("location")}
            </Text>
            <FontAwesome5 name="map-marker-alt" size={24} color="#00C773" />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.label}>
            <Text style={[styles.details, isDarkMode && styles.darkModeText]}>
              {eventData.organizer.fullName}
            </Text>
          </View>
          <View style={styles.label}>
            <Text style={[styles.details, isDarkMode && styles.darkModeText]}>
              {eventData.eventTime}
            </Text>
          </View>
          <View style={styles.label}>
            <Text style={[styles.details, isDarkMode && styles.darkModeText]}>
              {t(eventData.sport.toLowerCase())}
            </Text>
          </View>
        </View>
        <View
          style={[styles.scoreContainer, isDarkMode && { borderColor: "#fff" }]}
        >
          <Text style={[styles.teamScore, isDarkMode && styles.darkModeText]}>
            {eventData.teams[0].score}
          </Text>
          <Text style={[styles.scoreDash, isDarkMode && styles.darkModeText]}>
            -
          </Text>
          <Text style={[styles.teamScore, isDarkMode && styles.darkModeText]}>
            {eventData.teams[1].score}
          </Text>
        </View>
      </View>
      <View style={styles.playersTitleContainer}>
        <Text style={[styles.playersTitle, isDarkMode && styles.darkModeText]}>
          {t("playersA")}
        </Text>
        <Text style={[styles.playersTitle, isDarkMode && styles.darkModeText]}>
          {t("playersB")}
        </Text>
      </View>
      <View style={styles.playersContainer}>
        <View style={{ flex: 1, borderRightWidth: 1 }}>
          {renderPlayerRows(teamA, eventData.maxParticipants / 2)}
        </View>
        <View style={{ flex: 1, borderLeftWidth: 1 }}>
          {renderPlayerRows(teamB, eventData.maxParticipants / 2)}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {eventData.organizer.userId !== user.userId &&
          eventData.isEventOver === 0 && (
            <CustomButton
              title={t("leaveEvent")}
              onPress={() => setShowLeaveEventPopup(true)}
            />
          )}
        {eventData.organizer.userId === user.userId &&
          eventData.isEventOver === 1 && (
            <CustomButton title={t("finish")} onPress={handleFinishEvent} />
          )}
        {eventData.organizer.userId === user.userId &&
          eventData.isEventOver === 2 && (
            <CustomButton
              title={t("evaluateEvent")}
              disabled={buttonDisabled}
              onPress={handleEvaluateEvent}
              containerStyle={buttonDisabled ? { opacity: 0.5 } : {}}
            />
          )}
        {eventData.organizer.userId !== user.userId &&
          eventData.isEventOver === 2 && (
            <CustomButton
              title={t("rateOrganizer")}
              disabled={buttonDisabled}
              onPress={handleRateOrganizer}
              containerStyle={buttonDisabled ? { opacity: 0.5 } : {}}
            />
          )}
      </View>
      <RatingModal
        visible={showRatePopup}
        title={`${t("rate")}: ${ratePlayer?.fullName}`}
        category="SPORT"
        sport={eventData.sport}
        playerId={ratePlayer?.userId!}
        playerName={ratePlayer?.fullName}
        handleRatingCompleted={handleRatingCompleted}
        handleSaveRating={handleSaveRating}
        handleCancel={() => setShowRatePopup(false)}
      />
      <RatingModal
        visible={showOrganizerPopup}
        title={t("rateOrganizer")}
        category="ORGANIZATION"
        sport={eventData.sport}
        playerId={eventData.organizer.userId}
        handleRatingCompleted={handleRatingCompleted}
        handleSaveRating={handleSaveRating}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showLeaveEventPopup}
        onRequestClose={() => {
          setShowLeaveEventPopup(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.overlay} />
          <View
            style={[
              styles.modalView,
              { backgroundColor: isDarkMode ? "#333" : "white" },
            ]}
          >
            <Text style={[styles.modalText, isDarkMode && styles.darkModeText]}>
              {t("leaveEventConfirm")}
            </Text>
            <View style={styles.buttonGrp}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowLeaveEventPopup(false)}
              >
                <Text style={styles.textStyle}>{t("no")}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  handleLeaveEvent(user.userId, t("leaveEventConfirm"))
                }
              >
                <Text style={styles.textStyle}>{t("yes")}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showLeaveEventSuccess}
        onRequestClose={() => {
          setShowLeaveEventSuccess(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.overlay} />
          <View
            style={[
              styles.modalView,
              { backgroundColor: isDarkMode ? "#333" : "white" },
            ]}
          >
            <Text style={[styles.modalText, isDarkMode && styles.darkModeText]}>
              {t("leaveEventSuccess")}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowLeaveEventSuccess(false);
                router.back();
              }}
            >
              <Text style={styles.textStyle}>{t("ok")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ErrorModal
        error={leaveEventError}
        modalVisible={showLeaveEventError}
        setModalVisible={setShowLeaveEventError}
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
  darkModeBackground: {
    backgroundColor: "#333",
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
  darkModeText: {
    color: "white",
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
    borderBottomWidth: 2,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonConfirmLocation: {
    backgroundColor: "#FF5C00",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF5C00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonGrp: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
