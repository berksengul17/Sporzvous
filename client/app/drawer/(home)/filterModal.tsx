import CustomText from "@/components/CustomText";
import { useEventContext } from "@/context/EventProvider";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const sportsTypes = ["All", "Football", "Basketball", "Volleyball", "Tennis"];
const eventLocations = [
  { label: "All", value: "All" },
  { label: "Bornova", value: "Bornova" },
  { label: "Urla", value: "Urla" },
];
const dateOptions = ["All", "Today", "This Week", "This Month"];
const ratingOptions = [
  { label: "All", minRating: 0 },
  { label: "★ 4 and above", minRating: 4 },
  { label: "★ 3 and above", minRating: 3 },
  { label: "★ 2 and above", minRating: 2 },
  { label: "★ 1 and above", minRating: 1 },
];

const Page = () => {
  const { filterEvents } = useEventContext();

  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);

  const applyFilters = () => {
    filterEvents(selectedSport, selectedLocation, selectedDate, selectedRating)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSport("All");
            setSelectedDate("All");
            setSelectedRating(0);
          }}
        >
          <CustomText customStyle={styles.clearText} text="Clear Filters" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <CustomText customStyle={styles.sectionTitle} text="Sport" />
        </View>
        <View style={styles.buttonContainer}>
          {sportsTypes.map((sport) => (
            <TouchableOpacity
              key={sport}
              style={[
                styles.button,
                selectedSport === sport && styles.buttonSelected,
              ]}
              onPress={() => setSelectedSport(sport)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedSport === sport && styles.buttonTextSelected,
                ]}
              >
                {sport}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.titleWrapper}>
          <CustomText customStyle={styles.sectionTitle} text="Location" />
        </View>
        <RNPickerSelect
          onValueChange={(value) => setSelectedLocation(value)}
          items={eventLocations}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false} // this needs to be false to use your custom styles
          placeholder={{ label: "Choose Location", value: null }}
          value={selectedLocation}
        />
        <View style={[styles.titleWrapper, { marginTop: 20 }]}>
          <CustomText customStyle={styles.sectionTitle} text="Date" />
        </View>
        <View style={styles.buttonContainer}>
          {dateOptions.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.button,
                selectedDate === date && styles.buttonSelected,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedDate === date && styles.buttonTextSelected,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.titleWrapper}>
          <CustomText customStyle={styles.sectionTitle} text="Rating" />
        </View>
        <View style={styles.buttonContainer}>
          {ratingOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.button,
                selectedRating === option.minRating && styles.buttonSelected,
              ]}
              onPress={() => setSelectedRating(option.minRating)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedRating === option.minRating &&
                    styles.buttonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
  },
  clearText: {
    color: "#FF5C00",
    fontSize: 16,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#47315a",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonSelected: {
    backgroundColor: "#FF5C00",
    borderColor: "#FF5C00",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  buttonTextSelected: {
    fontSize: 14,
    color: "white",
  },
  applyButton: {
    backgroundColor: "#FF5C00",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "50%", // Sets the button width to half of its container width
    alignSelf: "center", // Centers the button horizontally within the ScrollView
    marginTop: 20, // Optional: adds space above the button
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "#6F6F6F",
    borderRadius: 8,
    color: "black",
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Page;
