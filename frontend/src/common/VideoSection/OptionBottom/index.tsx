import React, { useCallback, useMemo } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAppDispatch } from "../../../hooks/reduxHookType"; // مسیر خود را چک کنید
import { updateLikeStatus } from "../../Slices/main"; // مسیر خود را چک کنید
import { addLike, removeLike } from "../../../services/dotNet"; // مسیر خود را چک کنید

const OptionBottom: React.FC<any> = ({
  handleToggleComments,
  video,
  endTime,
  result,
  showLiked,
  positionVideo,
  userIdLogin,
  socket,
}) => {
  const dispatch = useAppDispatch();

  const movieId = useMemo(() => {
    return positionVideo === 0
      ? video?.attachmentInserted?.attachmentId
      : video?.attachmentMatched?.attachmentId;
  }, [video, positionVideo]);

  const likeData = useMemo(() => {
    if (video?.likes && movieId) {
      return video.likes[movieId] || { isLiked: false, count: 0 };
    }
    return { isLiked: false, count: 0 };
  }, [video, movieId]);

  const { isLiked, count } = likeData;

  const handleLikeClick = useCallback(async () => {
    if (!movieId) return;

    const newLikeStatus = !isLiked;

    dispatch(
      updateLikeStatus({
        movieId,
        isLiked: newLikeStatus,
        positionVideo,
      })
    );

    const postData = {
      userId: userIdLogin || null,
      movieId: movieId,
    };

    try {
      if (newLikeStatus) {
        await addLike(postData);
        socket?.emit("add_liked", postData);
      } else {
        await removeLike(postData);
        socket?.emit("remove_liked", postData);
      }
    } catch (error) {
      console.error("Error in like operation:", error);
      dispatch(
        updateLikeStatus({
          movieId,
          isLiked: isLiked,
          positionVideo,
        })
      );
    }
  }, [isLiked, movieId, userIdLogin, socket, dispatch, positionVideo]);

  return (
    <div className="absolute w-full bottom-5 z-10">
      <div className="flex mb-4 justify-between mx-2">
        <div className="col-span-1 flex items-end justify-start">
          <ChatBubbleOutlineIcon
            onClick={() => handleToggleComments(video)}
            className="font25 text-white cursor-pointer"
          />
        </div>

        {!endTime && (
          <>
            {result === "Win" && (
              <div className="text-green col-span-1 flex items-center justify-center">
                <span className="font15 border-green px-2 rounded-lg border font-bold">
                  Win
                </span>
              </div>
            )}
            {result === "Loss" && (
              <div className="text-red col-span-1 flex items-center justify-center">
                <span className="font15 border-red px-2 rounded-lg border font-bold">
                  Loss
                </span>
              </div>
            )}
            {result === "Draw" && (
              <div className="text-yellow col-span-1 flex items-center justify-center">
                <span className="font15 border-yellow px-2 rounded-lg border font-bold">
                  Draw
                </span>
              </div>
            )}
          </>
        )}

        <div className="col-span-1 flex justify-end items-end gap-2">
          {showLiked &&
            movieId &&
            (isLiked ? (
              <ThumbUpIcon
                className="text-white font35 unlike_animation cursor-pointer"
                onClick={handleLikeClick}
              />
            ) : (
              <ThumbUpOffAltIcon
                className="text-white font35 cursor-pointer"
                onClick={handleLikeClick}
              />
            ))}
          {!endTime && movieId ? (
            <div className="text-gray-600 flex items-center gap-1 mb-1">
              <span className="font18 text-sm text-white font-bold">
                {count}
              </span>
              <ThumbUpIcon className="font20 text-gray-400" />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionBottom;
