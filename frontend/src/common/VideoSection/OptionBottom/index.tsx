import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { updateLikeStatus } from "../../Slices/main";
import { useAppDispatch } from "../../../hooks/reduxHookType";
import { addLike, removeLike } from "../../../services/dotNet";

const OptionBottom: React.FC<any> = ({
  handleToggleComments,
  video,
  endTime,
  result,
  showLiked,
  positionVideo,
  userIdLogin,
  countLiked,
  externalIsLiked,
  socket,
}) => {
  const dispatch = useAppDispatch();
  const movieId =
    positionVideo === 0
      ? video?.attachmentInserted?.attachmentId
      : video?.attachmentMatched?.attachmentId;

  const likeInfo = video?.likes?.[movieId] || { isLiked: false, count: 0 };
  const finalIsLiked =
    externalIsLiked !== undefined ? externalIsLiked : likeInfo.isLiked;

  const handleLikeClick = async (video: any, position: number) => {
    const currentLikeStatus = video.likes?.[movieId]?.isLiked || false;
    const newLikeStatus = !currentLikeStatus;

    dispatch(updateLikeStatus({ movieId, isLiked: newLikeStatus }));

    const postData = {
      userId: userIdLogin || null,
      movieId: movieId,
    };

    try {
      if (currentLikeStatus) {
        await removeLike(postData);
        socket.emit("remove_liked", postData);
      } else {
        await addLike(postData);
        socket.emit("add_liked", postData);
      }
    } catch (error) {
      console.error("Error in like operation:", error);
      dispatch(updateLikeStatus({ movieId, isLiked: currentLikeStatus }));
    }
  };

  return (
    <div className="absolute w-full bottom-5 z-10">
      <div className="flex mb-4 justify-between mx-2">
        <div className="col-span-1  flex items-end justify-start">
          <ChatBubbleOutlineIcon
            onClick={() => handleToggleComments(video)}
            className="font25  text-white"
          />
        </div>
        {endTime ? null : result === "Win" ? (
          <div className="text-green col-span-1 flex items-center justify-center">
            <span className="font15 border-green px-2 rounded-lg border font-bold">
              Win
            </span>
          </div>
        ) : result === "Loss" ? (
          <div className="text-red col-span-1 flex items-center justify-center">
            <span className="font15 border-red px-2 rounded-lg border font-bold">
              Loss
            </span>
          </div>
        ) : result === "Draw" ? (
          <div className="text-yellow col-span-1 flex items-center justify-center">
            <span className="font15 border-yellow px-2 rounded-lg border font-bold">
              Draw
            </span>
          </div>
        ) : null}
        <div className="col-span-1 flex justify-end">
          {showLiked && (
            <>
              {finalIsLiked ? (
                <ThumbUpIcon
                  className="text-white font35  unlike_animation cursor-pointer"
                  onClick={() => handleLikeClick(video, positionVideo)}
                />
              ) : (
                <ThumbUpOffAltIcon
                  className="text-white font35  cursor-pointer"
                  onClick={() => handleLikeClick(video, positionVideo)}
                />
              )}
            </>
          )}
          {!endTime && countLiked !== undefined ? (
            <div className="text-gray-600 flex items-end justify-end gap-2">
              <span className="font18 text-sm">{countLiked}</span>
              <span className=" pb-1">
                <ThumbUpIcon className=" font25 unlike_animation cursor-pointer" />
              </span>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionBottom;
