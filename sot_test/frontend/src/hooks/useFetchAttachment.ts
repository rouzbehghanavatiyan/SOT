import { useMemo, useEffect, useState } from "react";
import usePagination from "./usePagination";
import { attachmentList } from "../services/dotNet";

const useFetchAttachments = (socket: any) => {
  const {
    data: allDableWatch,
    isLoading,
    hasMore,
    fetchNextPage,
  } = usePagination(attachmentList, { take: 6 });

  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!socket) return;
    const handleGetAddLike = (data: { movieId: number }) =>
      setVideoLikes((prev) => ({
        ...prev,
        [data.movieId]: (prev[data.movieId] || 0) + 1,
      }));
    const handleGetRemoveLike = (data: { movieId: number }) =>
      setVideoLikes((prev) => ({
        ...prev,
        [data.movieId]: (prev[data.movieId] || 0) - 1,
      }));
    socket.on("add_liked_response", handleGetAddLike);
    socket.on("remove_liked_response", handleGetRemoveLike);
    return () => {
      socket.off("add_liked_response", handleGetAddLike);
      socket.off("remove_liked_response", handleGetRemoveLike);
    };
  }, [socket]);

  const videoGroupsWithLikes = useMemo(() => {
    const videoGroups = allDableWatch
      .map(
        ({
          attachmentInserted,
          attachmentMatched,
          inviteInserted,
          inviteMatched,
          likeInserted,
          likeMatched,
          userInserted,
          userMatched,
        }) => ({
          parent: attachmentInserted,
          child: attachmentMatched,
          inviteInserted,
          inviteMatched,
          likeInserted,
          likeMatched,
          userInfoParent: userInserted,
          userInfoChild: userMatched,
        })
      )
      .filter((group) => group.child !== null);
    return videoGroups.map((group) => ({
      ...group,
      parentLikes:
        (videoLikes[group.parent?.movieId] || 0) + (group.likeInserted || 0),
      childLikes: group.child
        ? (videoLikes[group.child?.movieId] || 0) + (group.likeMatched || 0)
        : 0,
    }));
  }, [allDableWatch, videoLikes]);

  return {
    loadingVideo: isLoading,
    isLoading,
    videoGroupsWithLikes,
    fetchNextPage,
    hasMore,
  };
};

export default useFetchAttachments;
