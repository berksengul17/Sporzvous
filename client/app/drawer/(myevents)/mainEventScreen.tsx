import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { useLocalSearchParams, router } from "expo-router";
import { useUserContext } from "@/context/UserProvider";
import { Rating } from "react-native-ratings";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const dummyEventData = {
  id: "1",
  name: "Esenyurt Hailsaha",
  sport: "Football",
  host: "Çağan Özsir",
  date: "20.04.2024",
  team_a: "Team A",
  team_a_score: "7",
  team_b: "Team B",
  team_b_score: "8",
  time: "14:30",
};

const dummyEventTeamsA = [
  { id: "1", playerName: "caganozsir", playerId: 1 },
  { id: "2", playerName: "player2", playerId: 2 },
  { id: "3", playerName: "player3", playerId: 3 },
];

const dummyEventTeamsB = [
  { id: "4", playerName: "player4", playerId: 4 },
  { id: "5", playerName: "player5", playerId: 5 },
  { id: "6", playerName: "player6", playerId: 6 },
];

const MainEventScreen = () => {
  const { event: strEvent } = useLocalSearchParams();
  const event: Event = JSON.parse(strEvent as string);

  const [PlayerRating, setPlayerRating] = useState<number>(2.5);
  const { user } = useUserContext();
  const [eventData, setEventData] = useState<Event>(event);
  const [teamA, setTeamA] = useState(dummyEventTeamsA);
  const [teamB, setTeamB] = useState(dummyEventTeamsB);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [showEvaluateEventPopup, setShowEvaluateEventPopup] = useState(false);
  const [ratePlayer, setRatePlayer] = useState(null);
  const [mvp, setMvp] = useState("Mvp");

  const handlePlayerPress = (player) => {
    console.log("Navigate to player profile:", player.playerName);
    console.log(event.organizer);
  };

  const handleRatePress = (player) => {
    setRatePlayer(player);
    setShowRatePopup(true);
  };

  const handleRatingCompleted = (rating: React.SetStateAction<number>) => {
    console.log("Rated: ", rating);
    setPlayerRating(rating);
  };
  const handleSaveRating = () => {
    setShowRatePopup(false);
    // Save the rating logic here
  };

  const handleFinishEvent = () => {
    setEventData({ ...eventData, isEventOver: 2 });
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
    // Save the organizer rating logic here
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerRow}>
      <TouchableOpacity
        style={styles.playerName}
        onPress={() => handlePlayerPress(item)}
      >
        <Text style={{ fontSize: 20 }}>{item.playerName}</Text>
      </TouchableOpacity>
      {event.organizer.userId === 2 &&
        event.isEventOver !== 2 &&
        item.playerId !== event.organizer.userId && (
          <TouchableOpacity style={styles.deletePlayer}>
            <MaterialIcons name="delete-outline" size={29} color="#FF3647" />
          </TouchableOpacity>
        )}
      {event.organizer.userId !== 2 &&
        event.isEventOver !== 1 &&
        event.isEventOver !== 0 &&
        item.playerId !== event.organizer.userId && (
          <TouchableOpacity
            style={styles.ratePlayer}
            onPress={() => handleRatePress(item)}
          >
            <AntDesign name="staro" size={24} color="black" />
          </TouchableOpacity>
        )}
      {event.organizer.userId === 2 &&
        event.isEventOver === 2 &&
        item.playerId !== event.organizer.userId && (
          <TouchableOpacity
            style={styles.ratePlayer}
            onPress={() => handleRatePress(item)}
          >
            <AntDesign name="staro" size={24} color="black" />
          </TouchableOpacity>
        )}
    </View>
  );

  const renderRatePopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRatePopup}
      onRequestClose={() => setShowRatePopup(false)}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Rate: {ratePlayer?.playerName}</Text>
          <Text>Rating:</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            style={styles.ratingStars}
            onFinishRating={handleRatingCompleted}
          />
          <TextInput
            style={styles.input}
            placeholder="Comments about this player"
            placeholderTextColor={"#6F6F6F"}
            multiline={true}
          />
          <View style={styles.popupButtons}>
            <CustomButton
              title="Cancel"
              onPress={() => setShowRatePopup(false)}
            />
            <CustomButton title="Save" onPress={handleSaveRating} />
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderOrganizerPopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showOrganizerPopup}
      onRequestClose={() => setShowOrganizerPopup(false)}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Rate Organizer</Text>
          <Text>Rating:</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            style={styles.ratingStars}
            onFinishRating={handleRatingCompleted}
          />
          {/* Add rating stars component here */}
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setMvp(value)}
              items={[
                { label: "EmreErol", value: "0" },
                { label: "caganozsir", value: "0" },
                { label: "player2", value: "0" },
                { label: "player3", value: "0" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select man of the Match", value: null }}
              value={mvp}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Comments about this organizer"
            placeholderTextColor={"#6F6F6F"}
            multiline={true}
          />
          <View style={styles.popupButtons}>
            <CustomButton
              title="Cancel"
              onPress={() => setShowOrganizerPopup(false)}
            />
            <CustomButton title="Save" onPress={handleSaveOrganizerRating} />
          </View>
        </View>
      </View>
    </Modal>
  );
  const renderEvaluateEventPopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showEvaluateEventPopup}
      onRequestClose={() => setShowEvaluateEventPopup(false)}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Evaluate Event</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            <Text style={{ marginRight: 30 }}>Team A Score</Text>
            <Text>Team B Score</Text>
          </View>
          <View style={styles.evaluateTeamScores}>
            <TextInput
              style={styles.evaluateInputs}
              placeholder="Team A Score"
              placeholderTextColor={"#6F6F6F"}
            />
            <TextInput
              style={styles.evaluateInputs}
              placeholder="Team B Score"
              placeholderTextColor={"#6F6F6F"}
            />
          </View>
          <View style={styles.popupButtons}>
            <CustomButton
              title="Cancel"
              onPress={() => setShowEvaluateEventPopup(false)}
            />
            <CustomButton title="Save" onPress={handleEvaluateEvent} />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.locationView}>
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
          <Text style={styles.teamScore}>{event.organizer.fullName} </Text>
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
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
        <FlatList
          data={teamB}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {event.organizer.userId === 2 && event.isEventOver === 1 && (
          <CustomButton title="Finish" onPress={handleFinishEvent} />
        )}
        {event.organizer.userId === 2 && event.isEventOver === 2 && (
          <CustomButton title="Evaluate Event" onPress={handleEvaluateEvent} />
        )}
        {event.organizer.userId !== 2 && event.isEventOver === 0 && (
          <CustomButton
            title="Leave"
            onPress={() => console.log("Leave event")}
          />
        )}
        {event.organizer.userId !== 2 && event.isEventOver === 2 && (
          <CustomButton title="Rate Organizer" onPress={handleRateOrganizer} />
        )}
      </View>
      {renderRatePopup()}
      {renderOrganizerPopup()}
      {renderEvaluateEventPopup()}
    </View>
  );
};

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
  playerRow: {
    flex: 1,
    flexDirection: "row",
    margin: 2,
    padding: 5,
    alignContent: "center",
  },
  pickerContainer: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  playerName: {
    flex: 1,
  },
  ratingStars: {
    padding: 7,
  },

  ratePlayer: {
    marginHorizontal: 4,
  },
  deletePlayer: {
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  evaluateTeamScores: {
    flexDirection: "row",
    alignItems: "center",
  },
  evaluateInputs: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,

    margin: 5,
    marginBottom: 15,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
});

export default MainEventScreen;
