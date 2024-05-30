import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserProvider";

export type Friend = Omit<User, "receivedFriendRequests" | "image">;

export type FriendRequest = {
  friendRequestId: number;
  friendRequestStatus: string;
  senderId: number;
  senderFullName: string;
};

type FriendProps = {
  friends: Friend[];
  fetchFriends: () => Promise<void>;
};

const USER_API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/user";
const FRIEND_REQUEST_API_URL =
  process.env.EXPO_PUBLIC_API_URL + "/api/friendrequests";

const FriendContext = createContext<FriendProps | null>(null);

export const FriendProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    console.log("FRIENDS", friends);
  }, [friends]);

  useEffect(() => {
    (async () => {
      await fetchFriends();
    })();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        `${USER_API_URL}/friends/${user.userId}`
      );
      setFriends(
        response.data.map(
          ({
            userId,
            email,
            username,
            fullName,
            age,
            gender,
            favoriteSport,
          }: Friend) => ({
            userId,
            email,
            username,
            fullName,
            age,
            gender,
            favoriteSport,
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

  const value = { friends, fetchFriends };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};

export const useFriendContext = () => {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
