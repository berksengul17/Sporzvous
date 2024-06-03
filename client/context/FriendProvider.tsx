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
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        // err is an AxiosError here
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error; // Use the error message from the backend
        } else if (err instanceof Error) {
          // Handle other types of errors (non-Axios errors)
          errorMessage = err.response?.data;
        }
      }
      throw new Error(errorMessage); // Throw the error so it can be caught in the component
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
