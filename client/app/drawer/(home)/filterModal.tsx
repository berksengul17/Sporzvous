import CustomText from "@/components/CustomText";
import { useEventContext } from "@/context/EventProvider";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

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
  const { filterEvents, filter, setFilter } = useEventContext();

  const applyFilters = async () => {
    await filterEvents();
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setFilter({
              ...filter,
              location: "All",
              date: "All",
              rating: 0,
            });
          }}
        >
          <CustomText customStyle={styles.clearText} text="Clear Filters" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <CustomText customStyle={styles.sectionTitle} text="Location" />
        </View>
        <RNPickerSelect
          onValueChange={(value) => setFilter({ ...filter, location: value })}
          items={eventLocations}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false} // this needs to be false to use your custom styles
          placeholder={{ label: "Choose Location", value: null }}
          value={filter.location}
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
                filter.date === date && styles.buttonSelected,
              ]}
              onPress={() => setFilter({ ...filter, date })}
            >
              <Text
                style={[
                  styles.buttonText,
                  filter.date === date && styles.buttonTextSelected,
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
                filter.rating === option.minRating && styles.buttonSelected,
              ]}
              onPress={() => setFilter({ ...filter, rating: option.minRating })}
            >
              <Text
                style={[
                  styles.buttonText,
                  filter.rating === option.minRating &&
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
