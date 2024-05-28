import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";

export type User = {
  userId: number;
  image?: string;
  email: string;
  username: string;
  fullName: string;
  age: number;
  gender: string;
  favoriteSport: string;
};

export type UpdateUser = {
  username: string;
  fullName: string;
  image?: string;
  age: number;
  gender: string;
  favoriteSport: string;
};

type UserProps = {
  user: User;
  isProfileEditable: boolean;
  setProfileEditable: React.Dispatch<React.SetStateAction<boolean>>;
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
  });
  const [isProfileEditable, setProfileEditable] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState("");

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
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          errorMessage = err.response.data.error;
        } else if (err instanceof Error) {
          // Handle other types of errors (non-Axios errors)
          errorMessage = err.response?.data;
        }
      }
      setErrorRegister(errorMessage);
      throw new Error(errorMessage); // Throw the error so it can be caught in the component
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
      });

      successCallback(response);
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage = error.response.data.error;
          } else if (error instanceof Error) {
            // Handle other types of errors (non-Axios errors)
            errorMessage = error.response?.data;
          }
        }
        throw new Error(errorMessage); // Throw the error so it can be caught in the component
      }
    }
  };

  const updateProfile = async (newUserInfo: UpdateUser) => {
    try {
      console.log("newUserInfo", newUserInfo);

      await axios.put(`${API_URL}/${user.userId}/edit-profile`, {
        username: newUserInfo.username,
        fullName: newUserInfo.fullName,
        age: newUserInfo.age,
        gender: newUserInfo.gender,
        favoriteSport: newUserInfo.favoriteSport,
      });
      setUser((prevUser) => ({ ...prevUser, ...newUserInfo }));
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

  const value = {
    user,
    setUser,
    isProfileEditable,
    setProfileEditable,
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
