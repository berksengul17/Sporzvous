import CustomText from "@/components/CustomText";
import { useCommentContext } from "@/context/CommentProvider";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Constants for filter options
const initialSportsData = [
  { id: "1", label: "Basketball", value: "basketball" },
  { id: "2", label: "Football", value: "football" },
  { id: "3", label: "Volleyball", value: "volleyball" },
  { id: "4", label: "Tennis", value: "tennis" },
  { id: "5", label: "Baseball", value: "baseball" },
  { id: "6", label: "Badminton", value: "badminton" },
  { id: "7", label: "Handball", value: "handball" },
  { id: "8", label: "Ice Hockey", value: "ice_hockey" }, // Corrected value
  { id: "9", label: "Paintball", value: "paintball" }, // Corrected value
];

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
  const { filter, setFilter, filterComments } = useCommentContext();
  const { sortedComments: sortedCommentsJson } = route.params; // Destructure and retrieve the event JSON string

  let sortedComments;
  if (sortedCommentsJson) {
    sortedComments = JSON.parse(sortedCommentsJson);
  }
  // const sportsTypes = useMemo(() => {
  //   if (sortedComments) {
  //     const types = new Set(sortedComments.map((comment) => comment.type));
  //     return ["All", ...types];
  //   }
  //   return ["All"]; // Fallback to default if sortedComments is not available
  // }, [sortedComments]);

  const applyFilters = async () => {
    setFilter({ ...filter });
    await filterComments();
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setFilter({
            ...filter,
            sport: "All",
            date: "All",
            minRating: 0,
          });
        }}
      >
        <CustomText customStyle={styles.clearText} text="Clear Filters" />
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <CustomText customStyle={styles.sectionTitle} text="Sport" />
      </View>
      <View style={styles.buttonContainer}>
        {initialSportsData.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.button,
              filter.sport === sport.label && styles.buttonSelected,
            ]}
            onPress={() => setFilter({ ...filter, sport: sport.label })}
          >
            <Text
              style={[
                styles.buttonText,
                filter.sport === sport.label && styles.buttonTextSelected,
              ]}
            >
              {sport.label}
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
              filter.minRating === option.minRating && styles.buttonSelected,
            ]}
            onPress={() =>
              setFilter({ ...filter, minRating: option.minRating })
            }
          >
            <Text
              style={[
                styles.buttonText,
                filter.minRating === option.minRating &&
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
