import { useState, useCallback } from "react";
import { addComment, commentList, removeComment } from "../../services/dotNet";
import { Comment } from "./types";

export const useCommentsAPI = ({
  movieInfo,
  positionVideo,
  userId,
}: {
  movieInfo: any;
  positionVideo: number;
  userId?: string;
}) => {
  const [title, setTitle] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerInfo, setAnswerInfo] = useState<Comment | null>(null);
  const [answerData, setAnswerData] = useState<Comment | null>(null);

  const getMovieId = useCallback(
    () =>
      positionVideo === 0
        ? movieInfo?.attachmentInserted?.attachmentId
        : movieInfo?.attachmentMatched?.attachmentId,
    [movieInfo, positionVideo]
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && userId) {
      const postData = {
        userId,
        movieId: getMovieId(),
        desc: title.trim(),
        parentId: answerData?.id || null,
      };

      try {
        const res = await addComment(postData);
        if (res.data.status === 0) {
          setTitle("");
          handleGetAllList();
          setAnswerInfo(null);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleGetAllList = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await commentList(getMovieId());
      const { data, status } = res.data;

      if (status === 0) {
        const commentsHierarchy = buildCommentsHierarchy(data);
        setAllComments(commentsHierarchy);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getMovieId]);

  const buildCommentsHierarchy = (comments: Comment[]): Comment[] => {
    return comments.reduce((acc: Comment[], comment: Comment) => {
      if (!comment.parentId) {
        acc.push({ ...comment, replies: [] });
      } else {
        const parentComment = acc.find((c) => c.id === comment.parentId);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
      return acc;
    }, []);
  };

  const handleRemoveComment = async (comment: Comment) => {
    try {
      const res = await removeComment(comment.id);
      if (res.data.status === 0) {
        handleGetAllList();
      }
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  const handleAnswerComment = (comment: Comment | null) => {
    setAnswerInfo(comment);
    setAnswerData(comment);
  };

  return {
    title,
    setTitle,
    allComments,
    isLoading,
    answerInfo,
    answerData,
    handleSendMessage,
    handleGetAllList,
    handleRemoveComment,
    handleAnswerComment,
  };
};
