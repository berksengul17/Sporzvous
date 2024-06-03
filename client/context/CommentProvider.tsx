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
  fetchComments: () => Promise<void>;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/ratings";

const CommentContext = createContext<CommentProps | null>(null);

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUserContext();
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

  useEffect(() => {
    fetchComments();
  }, []);

  const value = { comments, fetchComments };

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
