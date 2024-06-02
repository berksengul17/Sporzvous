import axios from "axios";
import { useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/ratings";

export const useRatingsByOtherUsers = (userId: number) => {
  const [otherUsersRatings, setOtherUsersRatings] = useState<
    Map<string, number>
  >(new Map());

  const getRatingsByOthers = async () => {
    const response = await axios.get(`${API_URL}/getRatingByOthers/${userId}`);
    console.log("Ratings by Others Response:", response.data); // Debugging output
    const ratingsMap = new Map(Object.entries(response.data)) as Map<
      string,
      number
    >;
    setOtherUsersRatings(ratingsMap);
  };

  return {
    otherUsersRatings,
    getRatingsByOthers,
  };
};

export const useOverallRatings = (userId: number) => {
  const [overallRatings, setOverallRatings] = useState<Map<string, number>>(
    new Map()
  );

  const getOverallRating = async () => {
    const response = await axios.get(`${API_URL}/getOverallRating/${userId}`);
    console.log("Overall Ratings Response:", response.data); // Debugging output
    const ratingsMap = new Map(Object.entries(response.data)) as Map<
      string,
      number
    >;
    setOverallRatings(ratingsMap);
  };

  return {
    overallRatings,
    getOverallRating,
  };
};

export const useOrganizationRatings = (userId: number) => {
  const [organizationRatings, setOrganizationRatings] = useState<
    Map<string, number>
  >(new Map());

  const getOrganizationRatings = async () => {
    const response = await axios.get(
      `${API_URL}/getOrganizationRating/${userId}`
    );
    console.log("Organization Ratings Response:", response.data); // Debugging output
    const ratingsMap = new Map(Object.entries(response.data)) as Map<
      string,
      number
    >; // Explicitly cast ratingsMap to Map<string, number>
    setOrganizationRatings(ratingsMap);
  };

  return {
    organizationRatings,
    getOrganizationRatings,
  };
};
