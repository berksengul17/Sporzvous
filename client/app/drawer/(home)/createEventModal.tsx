import { useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import CustomButton from "../../../components/CustomButton";

const Page = () => {
  const { user } = useUserContext();
  const { addEvent } = useEventContext();

  const [title, setTitle] = useState<string>("Esenyurt Halısaha");
  const [sport, setSport] = useState<string>("Football");
  const [location, setLocation] = useState<string>("İstanbul");
  const [peopleCount, setPeopleCount] = useState<number>(14);
  const [teamCount, setTeamCount] = useState<number>(2);
  const [date, setDate] = useState<string>("12/05/2024");
  const [time, setTime] = useState<string>("16:00");
  const [minSkillLevel, setMinSkillLevel] = useState<number>(2.5);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.createEventContainer}>
        <View style={styles.eventInformationContainer}>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Title</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Esenyurt Halısaha"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Sport</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={sport}
                onChangeText={setSport}
                placeholder="Football"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Location</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="İstanbul"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>
                People Count
              </Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={peopleCount.toString()}
                onChangeText={(text) => setPeopleCount(parseInt(text))}
                placeholder="14"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Team Count</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={teamCount.toString()}
                onChangeText={(text) => setTeamCount(parseInt(text))}
                placeholder="2"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Date</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="11.01.2021"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Time</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={time}
                onChangeText={setTime}
                placeholder="14:00"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text numberOfLines={2} style={styles.eventInformationTitleFonts}>
                Minimum Skill Level
              </Text>
            </View>
            <View style={styles.ratingStars}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                style={styles.ratingStars}
                onFinishRating={(rating) => console.log("Rated: ", rating)}
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
            title="Create"
            onPress={() =>
              addEvent({
                title,
                sport,
                locationCity: location,
                locationDistrict: "Bornova",
                participants: peopleCount,
                maxParticipants: peopleCount,
                teamNumber: teamCount,
                eventDate: new Date("2024-05-12"),
                eventTime: time,
                skillRating: minSkillLevel,
                locationIndex: "5",
                isEventOver: 0,
                organizer: user,
              })
            }
          />
        </View>
        <View style={styles.wave}>
          <Image source={require("../../../assets/images/Waves.png")} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Page;

const styles = StyleSheet.create({
  createEventContainer: {
    backgroundColor: "white",
    flex: 1,
  },

  eventInformationContainer: {
    flex: 1,
    justifyContent: "center",
  },

  eventInformationRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  eventInformationTitle: {
    flex: 1,
    flexDirection: "row",
  },

  inputBox: {
    flexDirection: "row",
    borderRadius: 10,
    borderStyle: "solid",
    flex: 1,
    backgroundColor: "#F0F0F0",
    margin: 2,
    paddingHorizontal: 10,
  },

  eventInformationInput: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 2,
  },

  skillLevelContainer: {
    flexDirection: "row",
    padding: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  eventInformationTitleFonts: {
    fontSize: 20,
  },
  ratingStars: {
    padding: 7,
  },
  wave: {
    position: "static",
    bottom: -35,
    width: "100%",
    resizeMode: "cover",
  },
});
