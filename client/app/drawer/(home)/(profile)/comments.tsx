import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CommentItem from "@/components/CommentItem";
import { router } from "expo-router";
import CustomText from "@/components/CustomText";
import { useCommentContext } from "@/context/CommentProvider";
import { useUserContext } from "@/context/UserProvider";
import { useIsFocused } from "@react-navigation/native";

const parseDate = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to remove time part

  const [day, month, year] = dateStr.split("/");
  const commentDate = new Date(year, month - 1, day);
  commentDate.setHours(0, 0, 0, 0); // Normalize comment date

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor((today - commentDate) / millisecondsPerDay);

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${daysAgo} days ago`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
};

const Page = () => {
  const { fetchComments } = useCommentContext();
  const { user } = useUserContext();
  const [selectedType, setSelectedType] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const isFocused = useIsFocused();
  const [commentData, setCommentData] = useState<Comment[]>([]);

  useEffect(() => {
    const getMyEvents = async () => {
      console.log("fetching my events");
      setCommentData(await fetchComments());
      console.log("fetched my events");
    };
    if (isFocused) {
      getMyEvents();
    }
  }, [isFocused, user]);

  const sortedComments = useMemo(() => {
    return commentData
      .map((comment) => ({
        ...comment,
        readableDate: parseDate(comment.commentDate),
        // Adding a sortableDate for consistent sorting
        sortableDate: new Date(
          comment.commentDate.split("/").reverse().join("-")
        ),
      }))
      .sort((a, b) => b.sortableDate - a.sortableDate); // Sort by newly created sortableDate
  }, [commentData]);

  const filterCounts = useMemo(() => {
    const countMap = { All: sortedComments.length, Organization: 0, Sports: 0 };
    sortedComments.forEach((comment) => {
      if (comment.type === "Organization") {
        countMap["Organization"] += 1;
      } else {
        countMap["Sports"] += 1;
      }
    });
    return countMap;
  }, [sortedComments]);

  const filters = useMemo(
    () => ["All", "Organization", "Sports"],
    [commentData]
  );

  const filteredComments = useMemo(() => {
    switch (selectedType) {
      case "All":
        return sortedComments;
      case "Organization":
        return sortedComments.filter(
          (comment) => comment.type === "Organization"
        );
      case "Sports":
        return sortedComments.filter(
          (comment) => comment.type !== "Organization"
        );
      default:
        return [];
    }
  }, [selectedType, sortedComments]);

  const sportTypes = useMemo(() => {
    const types = new Set(sortedComments.map((comment) => comment.type));
    return ["All", ...types];
  }, [sortedComments]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollView}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedType === filter ? styles.filterButtonSelected : null,
              ]}
              onPress={() => setSelectedType(filter)}
            >
              <CustomText
                text={`${filter} (${filterCounts[filter]})`}
                customStyle={
                  selectedType === filter
                    ? styles.filterTextSelected
                    : styles.filterText
                }
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() =>
            router.push({
              pathname: "drawer/(home)/(profile)/filterComments",
              params: { sortedComments: JSON.stringify(sortedComments) },
            })
          }
        >
          <AntDesign name="filter" size={30} color="#FF5C00" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredComments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  filtersScrollView: {
    flexGrow: 1,
  },
  filterButton: {
    marginRight: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  filterButtonSelected: {
    backgroundColor: "#FF6347",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  filterTextSelected: {
    color: "#FFF", // Example style for selected filter text
  },
  filterIcon: {
    marginLeft: "auto",
    padding: 10,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
