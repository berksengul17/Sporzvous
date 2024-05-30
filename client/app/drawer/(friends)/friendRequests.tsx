import CustomText from "@/components/CustomText";
import { FriendRequest, useFriendContext } from "@/context/FriendProvider";
import { useUserContext } from "@/context/UserProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const FriendRequestItem = ({
  friendRequest,
  onRespondHandled,
}: {
  friendRequest: FriendRequest;
  onRespondHandled: (requestId: number) => void;
}) => {
  const handleRespond = async (status: string) => {
    try {
      const formData = new FormData();
      formData.append("requestId", friendRequest.friendRequestId.toString());
      formData.append("status", status);
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/friendrequests/respond`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onRespondHandled(friendRequest.friendRequestId);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
    }
  };

  const handleAccept = async () => await handleRespond("APPROVED");
  const handleReject = async () => await handleRespond("REJECTED");

  return (
    <View style={styles.requestItem}>
      <TouchableOpacity
        style={styles.picAndName}
        onPress={() => console.log("Profile clicked!")}
      >
        {/* <Image source={user.profilePicUrl} style={styles.profilePic} /> */}
        <CustomText
          customStyle={styles.name}
          text={friendRequest.senderFullName}
          isBold={true}
        />
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handleAccept}
          style={[styles.button, styles.acceptButton]}
        >
          <MaterialCommunityIcons
            name="check"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReject}
          style={[styles.button, styles.rejectButton]}
        >
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FriendsRequestsScreen = () => {
  const { user } = useUserContext();
  const { fetchFriends } = useFriendContext();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/friendrequests/get/${user.userId}`
      );
      setFriendRequests(
        response.data.map(
          ({
            friendRequestId,
            senderId,
            senderFullName,
            friendRequestStatus,
          }: FriendRequest) => ({
            friendRequestId,
            senderId,
            senderFullName,
            friendRequestStatus,
          })
        )
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
    }
  };

  const handleResponseHandled = async (requestId: number) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.friendRequestId !== requestId)
    );
    await fetchFriends();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <FriendRequestItem
            friendRequest={item}
            onRespondHandled={handleResponseHandled}
          />
        )}
        keyExtractor={(item) => item.friendRequestId.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default FriendsRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  requestItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
  },
  picAndName: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingTop: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 40,
    height: 40,
  },
  acceptButton: {
    backgroundColor: "#FF5C00", // Orange
    shadowColor: "#FF5C00",
  },
  rejectButton: {
    backgroundColor: "#6F6F6F", // Grey
    shadowColor: "#6F6F6F",
  },
  icon: {
    textAlign: "center",
  },
});
