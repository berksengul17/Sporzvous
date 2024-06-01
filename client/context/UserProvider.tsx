import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Event } from "./EventProvider";
import { FriendRequest } from "./FriendProvider";

export type Rating = {
  sportName: string;
  rating: number;
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
  receivedFriendRequests: FriendRequest[];
  ratings: Rating[];
};

export type UpdateUser = {
  username?: string;
  fullName?: string;
  image?: string;
  age?: number;
  gender?: string;
  favoriteSport?: string;
  ratings?: Rating[];
};

type UserProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isProfileEditable: boolean;
  setProfileEditable: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserById: (userId: number) => Promise<User>;
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
  joinEvent: (event: Event) => Promise<AxiosResponse>;
  logout: () => void;
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
    receivedFriendRequests: [],
    ratings: [],
  });
  const [isProfileEditable, setProfileEditable] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState("");

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  const fetchUserById = async (userId: number): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/get/${userId}`);
      console.log("fetchUser", response);
      const fetchedUser: User = {
        userId: response.data.userId,
        image: response.data.image,
        email: response.data.userEmail,
        username: response.data.username,
        fullName: response.data.fullName,
        age: response.data.age,
        gender: response.data.gender,
        favoriteSport: response.data.favoriteSport,
        receivedFriendRequests: response.data.receivedFriendRequests,
        ratings: response.data.ratings,
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

      setUser({
        ...user,
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
      });
      successCallback(response);
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          errorMessage = err.response?.data;
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
        base64Img,
        email: userEmail,
        username,
        fullName,
        age,
        gender,
        favoriteSport,
        receivedFriendRequests,
        sportRatings,
      } = response.data;

      setUser({
        userId,
        image: `data:image/jpeg;base64,${base64Img}`, // add the base64 prefix
        email: userEmail,
        username,
        fullName,
        age,
        gender,
        favoriteSport,
        receivedFriendRequests,
        ratings: sportRatings,
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
          errorMessage = error.response?.data;
        }
      }
      throw new Error(errorMessage);
    }
  };

  const updateProfile = async (newUserInfo: UpdateUser) => {
    try {
      console.log(`${API_URL}/${user.userId}/edit-profile`);
      await axios.put(`${API_URL}/${user.userId}/edit-profile`, {
        username: newUserInfo.username,
        fullName: newUserInfo.fullName,
        age: newUserInfo.age,
        image: newUserInfo.image?.split(",")[1], // only get the base64 string
        gender: newUserInfo.gender,
        favoriteSport: newUserInfo.favoriteSport,
        ratings: newUserInfo.ratings,
      });
      setUser((prevUser) => ({ ...prevUser, ...newUserInfo }));
    } catch (err: unknown) {
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
  const joinEvent = async (event: Event) => {
    try {
      return await axios.post(
        `${API_URL}/${user.userId}/join/${event.eventId}`
      );
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser({
      userId: 0,
      image: "",
      email: "",
      username: "",
      fullName: "",
      age: 0,
      gender: "",
      favoriteSport: "",
      receivedFriendRequests: [],
      ratings: [],
    });
  };

  const value = {
    user,
    setUser,
    isProfileEditable,
    setProfileEditable,
    fetchUserById,
    login,
    signUp,
    updateProfile,
    joinEvent,
    logout,
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
