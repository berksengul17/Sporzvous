import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, useUserContext } from "./UserProvider";

type Comment = {
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
  fetchComments: () => Promise<Comment[]>;
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

      const comments = response.data.map((comment: Comment) => {
        console.log("Processing event:", comment);
        return {
          ...comment,
          commentDate: comment.commentDate.slice(0, 5),
        };
      });

      return comments;
    } catch (error) {
      console.error("Failed to fetch comments", error);
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
