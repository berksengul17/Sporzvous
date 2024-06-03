import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserProvider";

export type Comment = {
  id: number;
  type: string;
  sportField: string;
  rating: number;
  commentPreview: string;
  commentDate: string;
  event: Event;
  commentor: User;
  receiver: User;
};

type CommentProps = {
  comments: Comment[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  fetchComments: () => Promise<void>;
  filterComments: () => Promise<void>;
};

type Filter = {
  sport: string;
  locationCity: string;
  locationDistrict: string;
  date: string;
  isEventOver: boolean;
  userId: number;
  minRating: number;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/ratings";

const CommentContext = createContext<CommentProps | null>(null);

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUserContext();
  const [filter, setFilter] = useState<Filter>({
    sport: "",
    locationCity: "",
    locationDistrict: "",
    date: "",
    isEventOver: false,
    userId: 0,
    minRating: 0,
  });
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get-all-comments/${user.userId}`
      );
      console.log("RESPONSE", response.data);

      if (response.data.length > 0) {
        setComments(
          response.data.map(
            (comment: {
              ratingId: number;
              category: string;
              sportField: string;
              rating: number;
              content: string;
              publishDate: string;
              event: Event;
              sender: User;
              receiver: User;
            }) => {
              return {
                id: comment.ratingId,
                type: comment.category,
                sportField: comment.sportField,
                rating: comment.rating,
                commentPreview: comment.content,
                commentDate: comment.publishDate,
                event: comment.event,
                commentor: comment.sender,
                receiver: comment.receiver,
              };
            }
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
      console.log("Failed to fetch comments", error.request);
      console.log("Failed to fetch comments", error.response);
    }
  };

  const filterComments = async () => {
    try {
      let startDate;
      let endDate;
      let currDate: Date = new Date();
      switch (filter.date) {
        case "All":
          startDate = null;
          endDate = null;
          break;
        case "Today":
          startDate = currDate.toISOString().split("T")[0];
          endDate = currDate.toISOString().split("T")[0];
          break;
        case "This Week":
          const first = currDate.getDate() - currDate.getDay();
          const last = first + 6;
          startDate = currDate.toISOString().split("T")[0];
          endDate = new Date(currDate.setDate(last))
            .toISOString()
            .split("T")[0];
          break;
        case "This Month":
          const year = currDate.getFullYear();
          const month = currDate.getMonth() + 1;
          endDate = new Date(year, month, 0).toISOString().split("T")[0];
          break;
      }

      const filteredComments = await axios.get(`${API_URL}/filter`, {
        params: {
          sport: filter.sport.toUpperCase(),
          locationCity: filter.locationCity,
          locationDistrict: filter.locationDistrict,
          startDate,
          endDate,
          isEventOver: filter.isEventOver,
          userId: filter.userId,
          minRating: filter.minRating,
        },
      });

      setComments(
        filteredComments.data.map((comment: Comment) => {
          return {
            ...comment,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const value = { comments, filter, setFilter, fetchComments, filterComments };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};
