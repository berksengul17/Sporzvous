import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

// Constants for filter options
const sportsTypes = ["All", "Football", "Basketball", "Tennis", "Volleyball"];
const dateOptions = ["All", "Today", "This Week", "This Month"];
const ratingOptions = [
  { label: "All", minRating: 0 },
  { label: "★ 4 and above", minRating: 4 },
  { label: "★ 3 and above", minRating: 3 },
];

const FilterComments = () => {
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);

  const applyFilters = () => ({
    sport: selectedSport,
    date: selectedDate,
    rating: selectedRating,
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectedSport("All");
          setSelectedDate("All");
          setSelectedRating(0);
        }}
      >
        <Text style={styles.clearText}>Clear Filters</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Sport</Text>
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
            <Text style={styles.buttonText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Date</Text>
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
            <Text style={styles.buttonText}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Score</Text>
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
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  clearText: {
    color: "#FF5C00",
    fontSize: 16,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
    backgroundColor: "#FF6347",
    borderColor: "#FF6347",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#FF5C00",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "50%",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FilterComments;
