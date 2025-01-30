import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactPlayer from "react-player";
import CropFreeIcon from "@mui/icons-material/CropFree";
import demoVid from "../../../../../c67709a90da30368a6affd37061b576443636818-480p.mp4";
import demoVid2 from "../../../../../u-65320-1736910450676.mp4";
import Comments from "../../common/Comments";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import rank1 from "../../assets/img/rank10.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../assets/img/rank5.webp";
import OptionHomes from "./OptionHomes";
import cook3 from "../../assets/img/cook3.jpg";
import cook4 from "../../assets/img/cook4.jpg";
import inv5 from "../../assets/img/inv5.jpg";

const dubleVideos = [
  {
    img: cook3,
    rank: rank1,
    username: "sara5-132321312312",
    type: "Loss",
    color: "red",
    comments: "4,683",
    cupPro: null,
  },
  {
    img: cook4,
    rank: rank2,
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: inv5,
    rank: rank3,
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "120k",
    cupPro: null,
  },
  {
    img: cook3,
    rank: rank3,
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: inv5,
    rank: rank3,
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "20k",
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
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        className="mySwiper h-screen"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  bg-white">
          <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
              {dubleVideos.map((profile, index) => (
                <SwiperSlide key={index} className="bg-black flex flex-col">
                  <OptionHomes result profile={profile} />
                  <div className="w-[100%] h-[31vh]">
                    <ReactPlayer
                      controls
                      width="100%"
                      height="100%"
                      url={demoVid}
                    />
                  </div>
                  <OptionHomes profile={profile}/>
                  <div className="w-[100%] h-[31vh]">
                    <ReactPlayer
                      controls
                      width="100%"
                      height="100%"
                      url={demoVid2}
                    />
                  </div>
                  <div className="flex items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-white font20 cursor-pointer" />
                    </span>
                    <span className="text-white"> 1,529 </span>
                  </div>
                </SwiperSlide>
              ))}
            </div>
            {showComments && (
              <Comments
                handleShowCMT={handleShowCMT}
                closingComments={closingComments}
              />
            )}
          </div>
        </div>
      </Swiper>
      {showComments && (
        <Comments
          handleShowCMT={handleShowCMT}
          closingComments={closingComments}
        />
      )}
    </>
  );
};

export default Home;
