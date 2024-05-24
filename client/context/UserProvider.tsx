import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  image: string;
  username: string;
  fullName: string;
  age: string;
  gender: string;
  favoriteSport: string;
};

type UserProps = {
  user: User;
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
  updateProfile: (newUserInfo: User) => Promise<void>;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const UserContext = createContext<UserProps | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: "",
    image: "",
    username: "",
    fullName: "",
    age: "",
    gender: "",
    favoriteSport: "",
  });

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

  const login = async (
    { email, password }: { email: string; password: string },
    successCallback: (response: AxiosResponse) => void
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { userId, image, username, fullName, age, gender, favoriteSport } =
        response.data;

      setUser({
        id: userId,
        image,
        username,
        fullName,
        age: age.toString(),
        gender,
        favoriteSport,
      });

      successCallback(response);
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

  const updateProfile = async (newUserInfo: User) => {
    try {
      console.log("newUserInfo", newUserInfo);

      await axios.put(`${API_URL}/${user.id}/edit-profile`, {
        username: newUserInfo.username,
        fullName: newUserInfo.fullName,
        age: newUserInfo.age,
        gender: newUserInfo.gender,
        favoriteSport: newUserInfo.favoriteSport,
      });
      setUser(newUserInfo);
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

  const value = { user, setUser, login, signUp, updateProfile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
