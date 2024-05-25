import axios, { AxiosResponse } from "axios";

const API_URL = "http://192.168.1.103:8082/api/user";

export const signUp = async (
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

export const login = async (
  { email, password }: { email: string; password: string },
  successCallback: (response: AxiosResponse) => void
) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
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
