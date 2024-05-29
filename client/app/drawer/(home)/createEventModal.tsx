import { useEventContext } from "@/context/EventProvider";
import { useUserContext } from "@/context/UserProvider";
import axios from "axios";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select"; // Import the Picker
import { Rating } from "react-native-ratings";
import CustomButton from "../../../components/CustomButton";
import MapView, { Marker } from "react-native-maps"; // Import MapView and Marker

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
  const [isMapVisible, setIsMapVisible] = useState(false); // State to control map visibility
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store selected location

  useEffect(() => {
    // Fetch cities from GeoNames API
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&country=TR&featureClass=P&maxRows=83`
      )
      .then((response) => {
        const cityList = response.data.geonames.map((city: any) => ({
          label: city.name,
          value: city.name,
        }));
        setCities(cityList);
        setLocationVillage("");
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const fetchVillages = (city: string) => {
    // Fetch villages based on selected city from GeoNames API
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&q=${city}&maxRows=60&featureClass=P`
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

  const handleChooseLocation = () => {
    setIsMapVisible(true);
  };

  const handleMapPress = (event: {
    nativeEvent: { coordinate: { latitude: any; longitude: any } };
  }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
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
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
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
                    color: "#9EA0A4",
                  }}
                  style={{
                    inputAndroid: styles.pickerStyles,
                    inputIOS: styles.pickerStyles,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Location</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(city) => {
                    setLocationCity(city);
                    setSelectedCity(city);
                    fetchVillages(city);
                  }}
                  items={cities}
                  placeholder={{
                    label: "City",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  style={{
                    inputAndroid: styles.pickerStyles,
                    inputIOS: styles.pickerStyles,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  onValueChange={setLocationVillage}
                  items={villages}
                  placeholder={{
                    label: "Village",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  style={{
                    inputAndroid: styles.pickerStyles,
                    inputIOS: styles.pickerStyles,
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
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.eventTimeInput}
            >
              <Text style={styles.dateBox}>{date || "Choose Date"}</Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.eventInformationRow}>
            <View style={styles.eventInformationTitle}>
              <Text style={styles.eventInformationTitleFonts}>Time</Text>
            </View>
            <TouchableOpacity
              onPress={showTimePicker}
              style={styles.eventTimeInput}
            >
              <Text style={styles.dateBox}>{time || "Choose Time"}</Text>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
              />
            </TouchableOpacity>
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
            onPress={handleChooseLocation}
            color="green"
          />
          <CustomButton title="Create" onPress={handleAddEvent} />
        </View>
        <View style={styles.wave}>
          <Image source={require("../../../assets/images/Waves.png")} />
        </View>

        {isMapVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isMapVisible}
            onRequestClose={() => {
              setIsMapVisible(!isMapVisible);
            }}
          >
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 39.9334, // Central latitude of Turkey (Ankara)
                  longitude: 32.8597, // Central longitude of Turkey (Ankara)
                  latitudeDelta: 10, // Adjust the delta to cover the entire country
                  longitudeDelta: 10, // Adjust the delta to cover the entire country
                }}
                onPress={handleMapPress}
              >
                {selectedLocation && (
                  <Marker
                    coordinate={selectedLocation}
                    title="Selected Location"
                    description="This is the chosen location"
                  />
                )}
              </MapView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setIsMapVisible(!isMapVisible);
                }}
              >
                <Text style={styles.textStyle}>Confirm Location</Text>
              </Pressable>
            </View>
          </Modal>
        )}

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
    backgroundColor: "#F0F0F0",
    marginRight: 40,
    padding: 10, // Adjust padding for better spacing
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  pickerStyles: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    color: "black",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
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
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
