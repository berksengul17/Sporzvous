import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";

const normalizeTypeName = (type) => type.replace(/\s+/g, "").toLowerCase();

const iconMapping = {
  organisation: { name: "briefcase", library: FontAwesome },
  football: { name: "soccer-ball-o", library: FontAwesome },
  basketball: { name: "basketball", library: MaterialCommunityIcons },
  tennis: { name: "tennis", library: MaterialCommunityIcons },
  volleyball: { name: "volleyball-ball", library: FontAwesome5 },
  baseball: { name: "baseball-bat-ball", library: FontAwesome6 },
  tabletennis: { name: "table-tennis", library: FontAwesome5 },
  badminton: { name: "badminton", library: MaterialCommunityIcons },
  fitness: { name: "fitness-center", library: MaterialIcons },
};

const getIcon = (type) => {
  const normalizedType = normalizeTypeName(type);
  const { name, library } = iconMapping[normalizedType] || {
    name: "question-circle",
    library: FontAwesome,
  };
  return React.createElement(library, {
    name: name,
    size: 24,
    color: "#FF5C00",
  });
};

const CommentItem = ({ comment }) => (
  <View style={styles.commentContainer}>
    <TouchableOpacity
      style={styles.picAndName}
      onPress={() => console.log("Profile clicked!")} //buraya router.push(commentor.profile) tarzı bi şey yazılcak sanırım
    >
      <Image
        source={{
          uri: comment.profilePicUrl || "https://via.placeholder.com/48",
        }} // Placeholder URL for profile picture
        style={styles.profilePic}
      />
      <Text style={styles.commentor}>{comment.commentor}</Text>
    </TouchableOpacity>
    <View style={styles.commentDetails}>
      <View style={styles.commentHeader}>
        {getIcon(comment.type)}
        <Text style={styles.typeRating}>
          {comment.type}: {comment.rating}
        </Text>
      </View>
      <Text style={styles.commentPreview}>{comment.commentPreview}</Text>
      <Text style={styles.commentInfo}>{comment.commentDate}</Text>
    </View>
  </View>
);

const Page = () => {
  const [selectedType, setSelectedType] = useState("All");

  const commentData = [
    {
      id: "1",
      type: "Organisation",
      rating: "5",
      commentor: "Çağan Özsir",
      commentDate: "Today",
      commentPreview: "Harika bir organizasyondu eline sağlık.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "2",
      type: "Football",
      rating: "4",
      commentor: "Emre Erol",
      commentDate: "2 days ago",
      commentPreview: "Çok iyi futbol oynuyorsun.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "3",
      type: "Basketball",
      rating: "2",
      commentor: "Berk Şengül",
      commentDate: "Today",
      commentPreview: "Adam bütün maç leş attı.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "4",
      type: "Tennis",
      rating: "5",
      commentor: "Emrecan Çuhadar",
      commentDate: "1 week ago",
      commentPreview: "Bu adamla oynaması aşırı keyifli.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "5",
      type: "Volleyball",
      rating: "1",
      commentor: "Çağlar Özsir",
      commentDate: "5 days ago",
      commentPreview: "Daha manşet atmayı bilmiyor.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "6",
      type: "Table Tennis",
      rating: "5",
      commentor: "Emrecan Çuhadar",
      commentDate: "5 days ago",
      commentPreview: "Yine bu adama yenildim.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "7",
      type: "Baseball",
      rating: "1",
      commentor: "Çağlar Özsir",
      commentDate: "5 days ago",
      commentPreview: "Türkiyede beyzbol mu oynanır aq.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
    {
      id: "8",
      type: "Football",
      rating: "4",
      commentor: "Kylian Mbappe",
      commentDate: "2 days ago",
      commentPreview:
        "Ben de Sporzvous kullanıyorum, bu uygulama harika dostum.",
      profilePicUrl: "https://via.placeholder.com/48",
    },
  ];

  const filterCounts = useMemo(() => {
    const countMap = { All: commentData.length };
    commentData.forEach((comment) => {
      countMap[comment.type] = (countMap[comment.type] || 0) + 1;
    });
    return countMap;
  }, [commentData]);

  const filters = useMemo(() => {
    const types = new Set(commentData.map((comment) => comment.type));
    return ["All", ...types];
  }, [commentData]);

  const filteredComments =
    selectedType === "All"
      ? commentData
      : commentData.filter((comment) => comment.type === selectedType);

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
              <Text
                style={styles.filterText}
              >{`${filter} (${filterCounts[filter]})`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.filterIcon}>
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
  commentContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 5,
  },
  picAndName: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "20%",
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  commentor: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
  commentDetails: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  typeRating: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#FF5C00",
  },
  commentPreview: {
    color: "#333",
    marginBottom: 5,
  },
  commentInfo: {
    fontSize: 12,
    color: "#999",
  },
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
  filterIcon: {
    marginLeft: "auto",
    padding: 10,
  },
});
