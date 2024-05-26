import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import CustomText from "@/components/CustomText";

// Constants for filter options
const dateOptions = ["All", "Today", "This Week", "This Month"];
const ratingOptions = [
  { label: "All", minRating: 0 },
  { label: "★ 4 and above", minRating: 4 },
  { label: "★ 3 and above", minRating: 3 },
  { label: "★ 2 and above", minRating: 2 },
  { label: "★ 1 and above", minRating: 1 },
];

const FilterComments = () => {
  const route = useRoute();
  const { sortedComments: sortedCommentsJson } = route.params; // Destructure and retrieve the event JSON string

  let sortedComments;
  if (sortedCommentsJson) {
    sortedComments = JSON.parse(sortedCommentsJson);
  }
  const sportsTypes = useMemo(() => {
    if (sortedComments) {
      const types = new Set(sortedComments.map((comment) => comment.type));
      return ["All", ...types];
    }
    return ["All"]; // Fallback to default if sortedComments is not available
  }, [sortedComments]);

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
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#47315a",
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
    backgroundColor: "#FF6347",
    borderColor: "#FF6347",
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

export default FilterComments;
