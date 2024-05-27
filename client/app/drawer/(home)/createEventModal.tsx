import { useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select"; // Import the Picker
import CustomText from "@/components/CustomText";

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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const Page = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { addEvent } = useEventContext();
  const [time, setTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [sport, setSport] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("");
  const [locationVillage, setLocationVillage] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<string>("");
  const teamCount = 2;
  const [date, setDate] = useState<string>("");

  const [minSkillLevel, setMinSkillLevel] = useState<number>(2.5);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmTime = (time: moment.MomentInput) => {
    const selectedTime = moment(time).format("HH:mm");
    setTime(selectedTime);
    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date: moment.MomentInput) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleRatingCompleted = (rating: React.SetStateAction<number>) => {
    console.log("Rated: ", rating);
    setMinSkillLevel(rating);
  };

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
                placeholder="Title"
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
              <View style={styles.userInfo}>
                <View style={{ flex: 1 }}>
                  <RNPickerSelect
                    onValueChange={(sport) => setSport(sport)}
                    items={[
                      { label: "Basketball", value: "basketball" },
                      { label: "Football", value: "football" },
                    ]}
                    placeholder={{
                      label: "Select a sport",
                      value: null,
                      color: "#9EA0A4", // You can change the color of the placeholder text here
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Location</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={locationCity}
                onChangeText={setLocationCity}
                placeholder="Location"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
              <TextInput
                value={locationVillage}
                onChangeText={setLocationVillage}
                placeholder="Location"
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
                value={peopleCount}
                onChangeText={setPeopleCount}
                placeholder="People Count"
                placeholderTextColor={"#6F6F6F"}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Date</Text>
            </View>
            <View style={styles.eventTimeInput}>
              <Text style={styles.dateBox} onPress={showDatePicker}>
                {date || "Choose Date"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Time</Text>
            </View>
            <View style={styles.eventTimeInput}>
              <Text style={styles.dateBox} onPress={showTimePicker}>
                {time || "Choose Time"}
              </Text>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
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
                onFinishRating={handleRatingCompleted}
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
            onPress={() => {
              addEvent({
                title,
                sport,
                locationCity: locationCity,
                locationDistrict: locationVillage,
                participants: parseInt(peopleCount),
                maxParticipants: parseInt(peopleCount),
                teamNumber: teamCount,
                eventDate: date,
                eventTime: time,
                skillRating: minSkillLevel,
                locationIndex: "5",
                isEventOver: 0,
                organizer: user,
              });
              router.back(); // Navigate back to the previous screen
            }}
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
    flex: 0.9,
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
    height: 45,
  },

  dateBox: {
    fontSize: 18,
    fontWeight: "200",
  },

  eventInformationInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 2,
  },

  eventTimeInput: {
    borderRadius: 10,
    borderStyle: "solid",
    flex: 0.5,
    backgroundColor: "#F0F0F0",
    marginRight: 40,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
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

  locationButton: {
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "green",
  },

  eventInformationTitleFonts: {
    fontSize: 20,
    width: "90%",
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
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  label: {
    color: "#6F6F6F",
    width: "35%",
    fontSize: 16,
  },
});
