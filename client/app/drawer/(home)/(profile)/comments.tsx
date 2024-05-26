import React, { useMemo, useState } from "react";
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
  const [selectedType, setSelectedType] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [commentData, setCommentData] = useState([
    {
      id: "1",
      type: "Organization",
      rating: "5",
      commentor: "Çağan Özsir",
      commentDate: "24/05/2024",
      commentPreview: "Harika bir organizasyondu eline sağlık.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "2",
      type: "Football",
      rating: "4",
      commentor: "Emre Erol",
      commentDate: "22/05/2024",
      commentPreview: "Çok iyi futbol oynuyorsun.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "3",
      type: "Basketball",
      rating: "2",
      commentor: "Berk Şengül",
      commentDate: "22/05/2024",
      commentPreview: "Adam bütün maç leş attı.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "4",
      type: "Tennis",
      rating: "5",
      commentor: "Emrecan Çuhadar",
      commentDate: "20/05/2024",
      commentPreview: "Bu adamla oynaması aşırı keyifli.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "5",
      type: "Volleyball",
      rating: "1",
      commentor: "Çağlar Özsir",
      commentDate: "15/05/2024",
      commentPreview: "Daha manşet atmayı bilmiyor.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "6",
      type: "Table Tennis",
      rating: "5",
      commentor: "Emrecan Çuhadar",
      commentDate: "18/04/2024",
      commentPreview: "Yine bu adama yenildim.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "7",
      type: "Baseball",
      rating: "1",
      commentor: "Çağlar Özsir",
      commentDate: "12/05/2024",
      commentPreview: "Türkiyede beyzbol mu oynanır aq.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "8",
      type: "Football",
      rating: "4",
      commentor: "Kylian Mbappe",
      commentDate: "12/03/2024",
      commentPreview:
        "Ben de Sporzvous kullanıyorum, bu uygulama harika dostum.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
  ]);

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
