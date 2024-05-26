import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from "react-native";
import { Rating } from "react-native-ratings";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useRoute } from "@react-navigation/native";

const eventData = {
  organizerName: "Çağan Özsır",
  sport: "Football",
  location: "Esenyurt Halısaha",
  peopleCount: 14,
  teamCount: 2,
  date: "11.01.2001",
  time: "14:00",
  skillLevel: 3,
};

const JoinEventPage = () => {
  const route = useRoute();
  const { event: eventJson } = route.params; // Destructure and retrieve the event JSON string

  let event;
  if (eventJson) {
    event = JSON.parse(eventJson);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.eventInformationContainer}>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Organizer</Text>
          </View>
          <View style={styles.valueView}>
            <TouchableOpacity onPress={() => router.push("OrganizerProfile")}>
              <Text style={styles.value}>{event.organizer.fullName}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Sport</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{event.sport}</Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Location</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{event.locationDistrict}</Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>People Count</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>
              {event.participants}/{event.maxParticipants}
            </Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Team Count</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{event.teamNumber}</Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Date</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{event.eventDate}</Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Time</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{event.eventTime}</Text>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Minimum Skill Level</Text>
          </View>
          <View style={styles.ratingStars}>
            <Rating
              readonly
              startingValue={event.skillRating}
              type="star"
              ratingCount={5}
              imageSize={30}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Choose Location"
          onPress={() => Alert.alert("Button clicked")}
          color="green"
        />
        <CustomButton
          title="Join          "
          onPress={() => router.replace("drawer/(home)/home")}
        />
      </View>
      <View style={styles.wave}>
        <Image source={require("../../../assets/images/Waves.png")} />
      </View>
    </SafeAreaView>
  );
};

export default JoinEventPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    alignSelf: "flex-start",
    margin: 10,
  },
  eventInformationContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 5,
  },
  eventInformationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    borderStyle: "solid",
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#F0F0F0",
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
  },
  valueView: {
    flex: 1,
  },
  labelView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ratingStars: {
    flex: 1,
  },
  wave: {
    position: "static",
    bottom: -35,
    width: "100%",
    resizeMode: "cover",
  },
});
