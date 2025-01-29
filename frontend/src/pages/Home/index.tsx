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

const dubleVideos = [
  {
    img: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    rank: rank1,
    username: "sara5-132321312312",
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
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white">
          <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
              {dubleVideos.map((profile, index) => (
                <section key={index} className="flex flex-col h-full">
                  <div className="w-screen lg:w-full min-h-10 max-h-full flex flex-col justify-center items-center h-full">
                    <div className="w-full flex flex-col gap-1 justify-between items-center h-full">
                      <div className="relative flex-grow">
                        <OptionHomes result profile={profile} />
                        <div className="flex-shrink-0 w-[100%] h-[31vh] mx-auto">
                          <ReactPlayer
                            controls
                            width="100%"
                            height="100%"
                            url={demoVid}
                          />
                        </div>
                      </div>
                      <div className="relative flex-grow">
                        <OptionHomes profile={profile} />
                        <div className="flex-shrink-0 w-[100%] h-[35vh] mx-auto ">
                          <ReactPlayer
                            controls
                            width="100%"
                            height="100%"
                            url={demoVid}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex   items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-black font20 cursor-pointer" />
                    </span>
                    <span> 1,529 </span>
                  </div>
                  <p className="mx-2 text-dark mb-2">
                    this is gonna be the best video in the world that you can
                    show your country. Don't forget to be the best!
                  </p>
                  <hr className="mx-2 text-dark mb-2" />
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
        </div>
        {showComments && (
          <Comments
            handleShowCMT={handleShowCMT}
            closingComments={closingComments}
          />
        )}
      </div>
    </>
  );
};

export default Home;
