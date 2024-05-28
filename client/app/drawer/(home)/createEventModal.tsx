import { useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select"; // Import the Picker
import CustomText from "@/components/CustomText";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  Modal,
  Pressable,
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
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { addEvent } = useEventContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorAddEvent, setErrorAddEvent] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState<string>("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [sport, setSport] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("");
  const [locationVillage, setLocationVillage] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [playerCapacity, setpPlayerCapacity] = useState<string>("");
  const teamCount = 2;

  const [minSkillLevel, setMinSkillLevel] = useState<number>(2.5);

  const [cities, setCities] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    // Fetch cities from GeoNames API
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&country=TR&featureClass=P&maxRows=1000`
      )
      .then((response) => {
        const cityList = response.data.geonames.map((city: any) => ({
          label: city.name,
          value: city.name,
        }));
        setCities(cityList);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const fetchVillages = (city: string) => {
    // Fetch villages based on selected city from GeoNames API
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&q=${city}&maxRows=1000&featureClass=P`
      )
      .then((response) => {
        const villageList = response.data.geonames.map((village: any) => ({
          label: village.name,
          value: village.name,
        }));
        setVillages(villageList);
      })
      .catch((error) => {
        console.error("Error fetching villages:", error);
      });
  };

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

  const handleAddEvent = async () => {
    try {
      await addEvent({
        title,
        sport,
        locationCity,
        locationDistrict: locationVillage,
        participants: 0,
        maxParticipants: parseInt(playerCapacity),
        teamNumber: teamCount,
        eventDate: date,
        eventTime: time,
        skillRating: minSkillLevel,
        locationIndex: "5",
        isEventOver: 0,
        organizer: user,
      });
      setErrorAddEvent("");
      router.back(); // Navigate back to the previous screen
    } catch (error) {
      setErrorAddEvent((error as Error).message);
      setModalVisible(true); // Show modal on error
    }
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
                      { label: "Volleyball", value: "volleyball" },
                      { label: "Tennis", value: "tennis" },
                      { label: "Baseball", value: "baseball" },
                      { label: "Badminton", value: "badminton" },
                      { label: "Handball", value: "handball" },
                      { label: "Ice Hockey", value: "icehockey" },
                      { label: "Paintball", value: "paintball" },
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
              <View style={styles.userLocationInfo}>
                <RNPickerSelect
                  onValueChange={(city) => {
                    setLocationCity(city);
                    setSelectedCity(city);
                    setLocationVillage("");
                    fetchVillages(city);
                  }}
                  items={cities}
                  placeholder={{
                    label: "City",
                    value: null,
                    color: "#9EA0A4",
                  }}
                />
              </View>
              <View style={styles.userLocationInfo}>
                <RNPickerSelect
                  onValueChange={setLocationVillage}
                  items={villages}
                  placeholder={{
                    label: "Village",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  disabled={!selectedCity}
                />
              </View>
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Max Player</Text>
            </View>
            <View style={styles.eventInformationInput}>
              <TextInput
                value={playerCapacity}
                onChangeText={setpPlayerCapacity}
                placeholder="Player Capacity"
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
          <CustomButton title="Create" onPress={handleAddEvent} />
        </View>
        <View style={styles.wave}>
          <Image source={require("../../../assets/images/Waves.png")} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{errorAddEvent}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    fontWeight: "600",
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

  userLocationInfo: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 15,
    margin: 5,
  },

  label: {
    color: "#6F6F6F",
    width: "35%",
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  error: {
    color: "red",
  },
});
