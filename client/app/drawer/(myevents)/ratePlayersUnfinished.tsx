import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const eventData = [
  {
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
  },
];

const eventTeamsA = [
  {
    id: "1",
    playerName: "caganozsir",
  },
];

const eventTeamsB = [
  {
    id: "1",
    playerName: "caganozsir",
  },
];

const EventInformation = ({ eventData }) => {
  return (
    <View style={styles.eventInfoContainer}>
      <Text style={styles.header}>{eventData.name}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.label}>
          <Text style={styles.details}>{eventData.date}</Text>
        </View>
        <TouchableOpacity style={styles.locationView}>
          <Text style={styles.location}>Location</Text>
          <Entypo name="location-pin" size={24} color="#00C773" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.label}>
          <Text style={styles.details}>{eventData.host}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.details}>{eventData.time}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.details}>{eventData.sport}</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.teamScore}>{eventData.team_a} </Text>
        <Text style={styles.teamScore}>{eventData.team_a_score}</Text>
        <Text style={styles.scoreDash}>-</Text>
        <Text style={styles.teamScore}>{eventData.team_b_score}</Text>
        <Text style={styles.teamScore}>{eventData.team_b}</Text>
      </View>
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

const Page = () => {
  return (
    <View style={styles.pageContainer}>
      <EventInformation eventData={eventData[0]} />
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
          title="Leave          "
          onPress={() => router.replace("drawer/myevents")}
        />
      </View>
      <View style={styles.wave}>
        <Image source={require("../../../assets/images/Waves.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  eventInfoContainer: {
    padding: 20,
    alignItems: "center",

    marginTop: 10,
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
});

export default Page;
