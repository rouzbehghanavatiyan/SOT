import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactPlayer from "react-player";
import CropFreeIcon from "@mui/icons-material/CropFree";
import demoVid from "../../../../../u-35446-1731760254601.mp4";
import Comments from "../../common/Comments";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import rank1 from "../../assets/img/rank10.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../assets/img/rank5.webp";

const dubleVideos = [
  {
    img: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    rank: rank1,
    username: "sara596-1",
    type: "Loss",
    color: "red",
    comments: "4,683",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: rank2,
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: rank3,
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "20k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
];

const Home = () => {
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);

  const handleExpand = (index: any) => {
    setExpandedVideo((prev) => (prev === index ? null : index));
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

  return (
    <>
      <div className=" ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-center  ">
          {dubleVideos.map((profile, index) => (
            <section key={index} className="">
              <div className="ms-1 absolute justify-between items-center m-1 text-2xl  ">
                <div className="grid grid-cols-5 gap-2 my-1 items-center">
                  <div className="relative mb-2 col-span-1">
                    <img
                      className="rounded-full relative"
                      src={profile.img}
                      width={50}
                      height={50}
                      alt="Profile"
                    />
                    <img
                      className="absolute right-0 bottom-0"
                      src={profile.rank}
                      width={30}
                      height={30}
                      alt="Rank"
                    />
                  </div>
                  <div className="flex col-span-2 items-start justify-start align-top">
                    <span className="font-bold flex items-start text-white">
                      {profile.username}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    {profile.type.toLowerCase() === "success" ? (
                      <>
                        <VerifiedIcon
                          className={`flex items-center text-${profile.color} font35`}
                        />
                        <span className="text-green font18 font-bold">
                          {profile.type}
                        </span>
                      </>
                    ) : (
                      <>
                        <DangerousIcon className="flex items-center text-red font35" />
                        <span className="text-red font18 font-bold">
                          {profile.type}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <ThumbUpOffAltIcon className="font20 font-bold" />
                    <span>{profile.comments}</span>
                  </div>
                </div>
              </div>
              <div className="w-screen lg:w-full min-h-10 max-h-full flex flex-col justify-center   items-center p-2">
                <div className="w-full flex flex-col justify-between items-center mb-2">
                  <div>
                    <ReactPlayer
                      controls
                      width="100%"
                      height="100%"
                      // url={demoVid1}
                    />
                  </div>
                  <div>
                    <ReactPlayer
                      controls
                      width="100%"
                      height="100%"
                      // url={demoVid2}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 m-2">
                <span onClick={handleShowCMT}>
                  <ChatBubbleOutlineIcon className="text-black font20 cursor-pointer" />
                </span>
                <span> 1,529 </span>
              </div>
              <p className="mx-2 text-white">
                this is gonna be the best video in the world that you can show
                your country. Don't forget to be the best!
              </p>
            </section>
          ))}
        </div>
        {showComments && (
          <Comments
            handleShowCMT={handleShowCMT}
            closingComments={closingComments}
          />
        )}
      </div>
      <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Mousewheel]}
          className="mySwiper h-screen"
        >
          <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {dubleVideos.map((profile, index) => (
                <SwiperSlide
                  key={index}
                  className="flex flex-col w-full h-[50vh] bg-black"
                >
                  <div className="ms-1 absolute justify-between items-center m-1 text-2xl">
                    <div className="grid grid-cols-5 gap-2 my-1 items-center">
                      <div className="relative mb-2 col-span-1">
                        <img
                          className="rounded-full relative"
                          src={profile.img}
                          width={60}
                          height={60}
                          alt="Profile"
                        />
                        <img
                          className="absolute bottom-0"
                          src={profile.rank}
                          width={35}
                          height={35}
                          alt="Rank"
                        />
                      </div>
                      <div className="flex col-span-2 items-start justify-start align-top">
                        <span className="font-bold flex items-start text-white">
                          {profile.username}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute font35 top-2 right-4">
                    <div className="flex flex-col gap-4 items-center">
                      <div>
                        {profile.type.toLowerCase() === "success" ? (
                          <>
                            <VerifiedIcon
                              className={`flex items-center text-${profile.color} font35`}
                            />
                            <span className="text-green font18 font-bold">
                              {profile.type}
                            </span>
                          </>
                        ) : (
                          <>
                            <DangerousIcon className="flex items-center text-red font35" />
                            <span className="text-red font18 font-bold">
                              {profile.type}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <ThumbUpOffAltIcon className="font20 font-bold" />
                        <span>{profile.comments}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full h-full p-2">
                    <div className="flex flex-col justify-center items-center h-full">
                      <ReactPlayer
                        controls
                        width="100%"
                        height="100%"
                        // url={demoVid1}
                        className="mb-2"
                      />
                      <ReactPlayer
                        controls
                        width="100%"
                        height="100%"
                        // url={demoVid2}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-white font20 cursor-pointer" />
                    </span>
                    <span>1,529</span>
                  </div>
                  <p className="mx-2 text-white">
                    this is gonna be the best video in the world that you can
                    show your country. Don't forget to be the best!
                  </p>
                </SwiperSlide>
              ))}
            </div>
          </div>
          {showComments && (
            <Comments
              handleShowCMT={handleShowCMT}
              closingComments={closingComments}
            />
          )}
        </Swiper>
      </ResponsiveMaker>
    </>
  );
};

export default Home;
