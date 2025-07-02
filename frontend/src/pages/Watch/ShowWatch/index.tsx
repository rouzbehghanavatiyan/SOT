import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addFollower,
  addLike,
  attachmentListByInviteId,
  removeFollower,
  removeLike,
} from "../../../services/dotNet";
import asyncWrapper from "../../../common/AsyncWrapper";
import Video from "../../../components/Video";
import { useAppSelector } from "../../../hooks/hook";
import Comments from "../../../common/Comments";
import ImageRank from "../../../components/ImageRank";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Mousewheel } from "swiper/modules";
import Follows from "../../../components/Fallows";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import StringHelpers from "../../../utils/helpers/StringHelper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../../../components/Dropdown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

const userIdFromSStorage = Number(sessionStorage.getItem("userId"));

const ShowWatch: React.FC = ({}) => {
  const { main } = useAppSelector((state: any) => state);
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);
  const location = useLocation();
  const chunkedVideos: any = [];
  const getInvitedId = location?.search?.split("id=")?.[1];
  const socket = main?.socketConfig;
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null
  );
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showComments, setShowComments] = useState<boolean>(false);
  // const fixTitle = isFollowed === null ? "Unfollow" : isFollowed === null ? "Follow"
  const [closingComments, setClosingComments] = useState<boolean>(false);
  const [videos, setVideos] = useState<
    Array<{
      url: string;
      videoUser: number;
      like: number;
      score: number;
      id: string;
      userName: string;
      isLikedFromMe: boolean;
      isFollowedFromMe: boolean;
      followerId: number | null;
      profile: string;
    }>
  >([]);

  const handleSlideChange = (swiper: any) => {
    setOpenDropdowns({});
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
    setCurrentlyPlayingId(null);
    if (chunkedVideos[realIndex] && chunkedVideos[realIndex].length > 0) {
      const topVideo = chunkedVideos[realIndex][0];
      setCurrentlyPlayingId(topVideo.id);
    }
  };

  const handleShowCMT = () => {
    if (showComments) {
      setClosingComments(true);
      setTimeout(() => {
        setShowComments(false);
        setClosingComments(false);
      }, 300);
    } else {
      setShowComments(true);
    }
  };

  console.log(main?.allFollowerList);

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const res = await attachmentListByInviteId(getInvitedId);
    const { status, data } = res?.data;

    if (status === 0 && data?.length >= 2) {
      const currentUserId =
        Number(userIdFromSStorage) || main?.userLogin?.userId;

      const processedVideos = data.map((video: any) => {
        const isFollowedFromMeTop = main?.allFollowerList?.some((following) => {
          return following === video?.userInserted?.id;
        });
        console.log(isFollowedFromMeTop);

        const isFollowedFromMeBott = main?.allFollowerList?.some(
          (follower: any) => follower === video?.userMatched?.id
        );

        console.log();

        return {
          ...video,
          isFollowedFromMeTop,
          isFollowedFromMeBott,
          urlTop: `${baseURL}/${video?.attachmentInserted?.attachmentType}/${video?.attachmentInserted?.fileName}${video?.attachmentInserted?.ext}`,
          urlBott: `${baseURL}/${video?.attachmentMatched?.attachmentType}/${video?.attachmentMatched?.fileName}${video?.attachmentMatched?.ext}`,
          profileTop: `${baseURL}/${video?.profileInserted?.attachmentType}/${video?.profileInserted?.fileName}${video?.profileInserted?.ext}`,
          profileBott: `${baseURL}/${video?.profileMatched?.attachmentType}/${video?.profileMatched?.fileName}${video?.profileMatched?.ext}`,
          userInfoTop: video?.userInserted,
          userInfoBott: video?.userMatched,
          isLikedInserted: video?.isLikedInserted || false,
          isLikedMatched: video?.isLikedMatched || false,
        };
      });

      setVideos(processedVideos);
    }
  });
  const handleVideoPlay = (videoId: string) => {
    setOpenDropdowns({});
    setIsOpenOptions(false);
    setCurrentlyPlayingId((prevId) => {
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  const handleLikeClick = asyncWrapper(async (video: any) => {
    const postData = {
      userId: Number(userIdFromSStorage) || main?.userLogin?.userId || null,
      movieId: video.id,
    };
    try {
      if (video.isLikedFromMe) {
        await removeLike(postData);
        socket.emit("remove_liked", postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isLikedFromMe: false, like: v.like - 1 }
              : v
          )
        );
      } else {
        await addLike(postData);
        socket.emit("add_liked", postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isLikedFromMe: true, like: v.like + 1 }
              : v
          )
        );
      }
    } catch (error) {
      console.error("Error in like operation:", error);
    }
  });

  const handleFallowClickTop = asyncWrapper(async (video, videoUserId: any) => {
    const postData = {
      userId: Number(main?.userLogin?.userId),
      followerId: videoUserId,
    };
    console.log(video);

    try {
      if (video.isFollowedFromMeTop) {
        await removeFollower(postData);
        setVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id
              ? { ...v, isFollowedFromMeTop: false, followerId: null }
              : v
          )
        );
      } else {
        const res = await addFollower(postData);
        if (res.data.status === 0) {
          setVideos((prevVideos) =>
            prevVideos.map((v) =>
              v.id === video.id
                ? {
                    ...v,
                    isFollowedFromMeTop: true,
                    followerId: postData.userId,
                  }
                : v
            )
          );
        }
      }
    } catch (error) {
      console.error("Error in follow operation:", error);
    }
  });

  const handleFallowClickBott = asyncWrapper(
    async (video, videoUserId: any) => {
      const postData = {
        userId: Number(main?.userLogin?.userId),
        followerId: videoUserId,
      };
      console.log(video);

      try {
        if (video.isFollowedFromMeBott) {
          await removeFollower(postData);
          setVideos((prevVideos) =>
            prevVideos.map((v) =>
              v.id === video.id
                ? { ...v, isFollowedFromMeBott: false, followerId: null }
                : v
            )
          );
        } else {
          const res = await addFollower(postData);
          if (res.data.status === 0) {
            setVideos((prevVideos) =>
              prevVideos.map((v) =>
                v.id === video.id
                  ? {
                      ...v,
                      isFollowedFromMeBott: true,
                      followerId: postData.userId,
                    }
                  : v
              )
            );
          }
        }
      } catch (error) {
        console.error("Error in follow operation:", error);
      }
    }
  );

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, [getInvitedId]);

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentlyPlayingId(videos[0].id);
    }
  }, [videos]);

  const dropdownItems = (data: any) => [
    {
      label: "Save",
      icon: <NotificationsIcon className="h-5 w-5" />,
      onClick: () => console.log(data),
    },
    {
      label: "Send message",
      icon: <EmailIcon className="text-gray-800 font20" />,
      onClick: () =>
        navigate(`/privateMessage?id=${data?.userId}`, {
          state: {
            userInfo: data,
          },
        }),
    },
    {
      label: "Notification",
      icon: <NotificationsIcon className="h-5 w-5" />,
      onClick: () => alert("اعلان‌ها"),
    },
    { divider: true },
  ];

  const toggleDropdown = (video: any, index: string) => {
    setOpenDropdowns((prev) => {
      if (index === "0" || index === "1") {
        return {
          ...prev,
          [index]: !prev[index],
        };
      }
      return prev;
    });
  };

  // useEffect(() => {
  //   if (videos.length > 0 && main?.allFollowerList) {
  //     const currentUserId =
  //       Number(userIdFromSStorage) || main?.userLogin?.userId;
  //     setVideos((prevVideos) =>
  //       prevVideos.map((video) => {
  //         const isFollowing = main.allFollowerList.some(
  //           (follower: any) =>
  //             follower.followerId === currentUserId &&
  //             follower.userId === video.videoUser
  //         );
  //         return {
  //           ...video,
  //           isFollowedFromMe: isFollowing,
  //           followerId: isFollowing ? currentUserId : null,
  //         };
  //       })
  //     );
  //   }
  // }, [main?.allFollowerList]);
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      mousewheel={true}
      onSlideChange={handleSlideChange}
      modules={[Mousewheel]}
      onInit={() => {
        if (videos.length > 0) {
          setCurrentlyPlayingId(videos[0].id);
        }
      }}
      className="mySwiper md:mt-20 md:h-[calc(100vh-100px)] h-[calc(100vh-43px)]"
    >
      {videos.map((video: any, subIndex: any) => {
        const isPlaying = currentlyPlayingId === video.id;
        const profileTop = `${baseURL}/${video?.profileInserted?.attachmentType}/${video?.profileInserted?.fileName}${video?.profileInserted?.ext}`;
        const profileBott = `${baseURL}/${video?.profileMatched?.attachmentType}/${video?.profileMatched?.fileName}${video?.profileMatched?.ext}`;
        const videoTop = `${baseURL}/${video?.attachmentInserted?.attachmentType}/${video?.attachmentInserted?.fileName}${video?.attachmentInserted?.ext}`;
        const videoBott = `${baseURL}/${video?.attachmentMatched?.attachmentType}/${video?.attachmentMatched?.fileName}${video?.attachmentMatched?.ext}`;
        const userInfoTop = video?.userInserted;
        const userInfoBott = video?.userMatched;

        const checkMyVideoTop =
          userInfoTop?.id !== Number(main?.userLogin?.userId);
        const checkMyVideoBott =
          userInfoBott?.id !== Number(main?.userLogin?.userId);
        console.log(video);

        return (
          <SwiperSlide className="h-full w-full bg-black flex flex-col">
            <div
              className="h-1/2 w-full relative flex flex-col border-b border-gray-800"
              key={`top-${subIndex}`}
            >
              <div className="flex-shrink-0 p-2 z-10 absolute top-0 left-0 right-0 bg_profile_watch">
                <div className="grid grid-cols-3 items-center w-full ">
                  <div className="flex justify-start">
                    <ImageRank
                      rankStyle="w-8 h-8"
                      classUserName="text-white"
                      iconProfileStyle="font50"
                      userName={userInfoTop?.userName}
                      imgSize={50}
                      imgSrc={profileTop}
                      // score={group?.score || 0}
                    />
                  </div>
                  <div className="flex justify-center">
                    {checkMyVideoTop && (
                      <Follows
                        bgColor="bg-white"
                        title={
                          video.isFollowedFromMeTop ? "Unfollow" : "Follow"
                        }
                        onClick={() =>
                          handleFallowClickTop(video, video?.userInserted?.id)
                        }
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    {checkMyVideoTop && (
                      <Dropdown
                        isOpenOptions={openDropdowns[subIndex]}
                        setIsOpenOptions={(isOpen) => {
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [subIndex]: isOpen,
                          }));
                        }}
                        buttonIcon={
                          <MoreVertIcon
                            className="text-white font35 cursor-pointer"
                            onClick={() =>
                              toggleDropdown(video, subIndex.toString())
                            }
                          />
                        }
                        items={dropdownItems(video)}
                        position="right"
                        className="ml-4"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <Video
                  key={`video-top-${video?.attachmentInserted?.id}`}
                  videoId={video?.attachmentInserted?.id}
                  className="max-w-full max-h-[35vh] min-h-[430px] w-auto h-[70vh] object-contain"
                  loop
                  playing={isPlaying}
                  handleVideo={() =>
                    handleVideoPlay(video?.attachmentInserted?.id)
                  }
                  url={videoTop}
                />
                <div className="absolute left-0 right-0 bottom-10 z-50">
                  <div className="flex justify-between items-center w-full px-4">
                    <ChatBubbleOutlineIcon
                      onClick={() => setShowComments(true)}
                      className="font30 text-white"
                    />
                    {video?.isLikedInserted ? (
                      // isLikedFromMe?.
                      <ThumbUpIcon
                        className="text-white font35 unlike_animation cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-1/2 w-full relative flex flex-col"
              key={`bottom-${subIndex}`}
            >
              <div className="flex-shrink-0 p-2 z-10 absolute top-0 left-0 right-0 bg_profile_watch">
                <div className="grid grid-cols-3 items-center w-full ">
                  <div className="flex justify-start">
                    <ImageRank
                      rankStyle="w-8 h-8"
                      classUserName="text-white"
                      iconProfileStyle="font50"
                      userName={userInfoBott?.userName}
                      imgSize={50}
                      imgSrc={profileBott}
                      // score={group?.score || 0}
                    />
                  </div>
                  <div className="flex justify-center">
                    {checkMyVideoBott && (
                      <Follows
                        bgColor="bg-white"
                        title={
                          video.isFollowedFromMeBott ? "Unfollow" : "Follow"
                        }
                        onClick={() =>
                          handleFallowClickBott(video, video?.userMatched?.id)
                        }
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    {checkMyVideoBott && (
                      <Dropdown
                        isOpenOptions={openDropdowns[subIndex]}
                        setIsOpenOptions={(isOpen) => {
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [subIndex]: isOpen,
                          }));
                        }}
                        buttonIcon={
                          <MoreVertIcon
                            className="text-white font35 cursor-pointer"
                            onClick={() =>
                              toggleDropdown(video, subIndex.toString())
                            }
                          />
                        }
                        items={dropdownItems(video)}
                        position="right"
                        className="ml-4"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <Video
                  key={video?.attachmentMatched?.id}
                  videoId={video?.attachmentMatched?.id}
                  className="max-w-full max-h-[35vh] min-h-[430px] w-auto h-[70vh] object-contain"
                  loop
                  playing={isPlaying}
                  handleVideo={() =>
                    handleVideoPlay(video?.attachmentMatched?.id)
                  }
                  url={videoBott}
                />
                <div className="absolute left-0 right-0 bottom-10 z-50">
                  <div className="flex justify-between items-center w-full px-4">
                    <ChatBubbleOutlineIcon
                      onClick={() => setShowComments(true)}
                      className="font30 text-white"
                    />
                    {video?.isLikedMatched ? (
                      // isLikedFromMe?.
                      <ThumbUpIcon
                        className="text-white font35 unlike_animation cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        className="text-white font35 cursor-pointer"
                        onClick={() => handleLikeClick(video)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      {showComments && (
        <Comments
          handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </Swiper>
  );
};

export default ShowWatch;
