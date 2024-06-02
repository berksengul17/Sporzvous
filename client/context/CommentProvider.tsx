import React, { createContext, useContext, useState } from "react";

type Comment = {};

type CommentProps = {
  comments: Comment[];
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/ratings";

const CommentContext = createContext<CommentProps | null>(null);

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const value = { comments };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a UserProvider");
  }
  return context;
};
