import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";

const normalizeTypeName = (type) => type.replace(/\s+/g, "").toLowerCase();

const iconMapping = {
  organization: { name: "briefcase", library: FontAwesome },
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
      <Text style={styles.commentInfo}>{comment.readableDate}</Text>
    </View>
  </View>
);

export default CommentItem;

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
});
