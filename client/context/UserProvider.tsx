import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export type FriendRequest = {
  friendRequestId: number;
  friendRequestStatus: string;
  senderId: number;
  senderFullName: string;
};

export type Rating = {
  [sportId: string]: number;
};

export type User = {
  userId: number;
  image?: string;
  email: string;
  username: string;
  fullName: string;
  age: number;
  gender: string;
  favoriteSport: string;
  friends: User[];
  receivedFriendRequests: FriendRequest[];
  rating: Rating[];
};

export type UpdateUser = {
  username: string;
  fullName: string;
  image?: string;
  age: number;
  gender: string;
  favoriteSport: string;
  rating: Rating;
};

type UserProps = {
  user: User;
  isProfileEditable: boolean;
  setProfileEditable: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserById: (userId: number) => Promise<User>;
  refetchUser: () => Promise<void>;
  signUp: (
    {
      username,
      email,
      password,
      country,
    }: { username: string; email: string; password: string; country: string },
    successCallback: (response: AxiosResponse) => void
  ) => Promise<void>;
  login: (
    { email, password }: { email: string; password: string },
    successCallback: (response: AxiosResponse) => void
  ) => Promise<void>;
  updateProfile: (newUserInfo: UpdateUser) => Promise<void>;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/user";

const UserContext = createContext<UserProps | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    userId: 0,
    image: "",
    email: "",
    username: "",
    fullName: "",
    age: 0,
    gender: "",
    favoriteSport: "",
    friends: [],
    receivedFriendRequests: [],
    rating: [],
  });
  const [isProfileEditable, setProfileEditable] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState("");

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  const fetchUserById = async (userId: number): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/get/${userId}`);
      const fetchedUser: User = {
        userId: response.data.userId,
        image: response.data.image,
        email: response.data.userEmail,
        username: response.data.username,
        fullName: response.data.fullName,
        age: response.data.age,
        gender: response.data.gender,
        favoriteSport: response.data.favoriteSport,
        friends: response.data.friends,
        receivedFriendRequests: response.data.receivedFriendRequests,
        rating: response.data.ratings,
      };

      return fetchedUser;
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
      }

      throw Error(errorMessage);
    }
  };

  const refetchUser = async () => {
    try {
      setUser(await fetchUserById(user.userId));
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
      }

      throw Error(errorMessage);
    }
  };

  const signUp = async (
    {
      username,
      email,
      password,
      country,
    }: { username: string; email: string; password: string; country: string },
    successCallback: (response: AxiosResponse) => void
  ) => {
    try {
      const response = await axios.post(`${API_URL}/signUp`, {
        username,
        email,
        password,
        country,
      });
      successCallback(response);
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
      }
      setErrorRegister(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (
    { email, password }: { email: string; password: string },
    successCallback: (response: AxiosResponse) => void
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const {
        userId,
        image,
        email: userEmail,
        username,
        fullName,
        age,
        gender,
        favoriteSport,
        friends,
        receivedFriendRequests,
        ratings,
      } = response.data;

      setUser({
        userId,
        image,
        email: userEmail,
        username,
        fullName,
        age,
        gender,
        favoriteSport,
        friends,
        receivedFriendRequests,
        ratings,
      });

      successCallback(response);
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
      }
      throw new Error(errorMessage);
    }
  };

  const updateProfile = async (newUserInfo: UpdateUser) => {
    try {
      await axios.put(`${API_URL}/${user.userId}/edit-profile`, {
        username: newUserInfo.username,
        fullName: newUserInfo.fullName,
        age: newUserInfo.age,
        image: newUserInfo.image,
        gender: newUserInfo.gender,
        favoriteSport: newUserInfo.favoriteSport,
        ratings: newUserInfo.rating,
      });
      setUser((prevUser) => ({ ...prevUser, ...newUserInfo }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  const value = {
    user,
    setUser,
    isProfileEditable,
    setProfileEditable,
    fetchUserById,
    refetchUser,
    login,
    signUp,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
