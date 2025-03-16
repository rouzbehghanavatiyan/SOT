import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactPlayer from "react-player";
import CropFreeIcon from "@mui/icons-material/CropFree";
import demoVid from "../../../../../../24973359cdff3b2ea4d251b3dc1a919611425919-360p.mp4";
import Comments from "../../../common/Comments";
import userProfile from "../../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";

const profiles = [
  {
    img: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    rank: "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp",
    username: "sara596-1",
    type: "Loss",
    color: "red",
    comments: "4,683",
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

const VideosProfile = () => {
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
    <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
      <div className=" grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {profiles.map((profile, index) => (
          <section
            key={index}
            className={`${expandedVideo === index ? "col-span-full" : ""}`}
          >
            <div
              className={`relative ${
                expandedVideo === index
                  ? "w-full h-screen"
                  : "w-full sm:w-[100%] md:w-[100%] lg:w-[325px] h-[650px]"
              }transition-all duration-500`}
            >
              <div className="ms-1 absolute justify-between items-center m-1 text-2xl">
                <div className="grid grid-cols-5  gap-2 my-1 items-center">
                  <div className="relative mb-2  col-span-1">
                    <img
                      className="rounded-full relative"
                      src={userProfile}
                      width={60}
                      height={60}
                      alt="Profile"
                    />
                    <img
                      className="absolute bottom-0"
                      src={profile.rank}
                      width={25}
                      height={25}
                      alt="Rank"
                    />
                  </div>
                  <div className="flex col-span-2 items-start justify-start align-top ">
                    <span className="font-bold flex items-start  text-white">
                      {profile.username}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    {profile?.type?.toLowerCase() === "success" ? (
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
                        <DangerousIcon
                          className={`flex items-center text-red font35`}
                        />
                        <span className="text-red font18 font-bold">
                          {profile.type}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex text-black items-center gap-1">
                    <ThumbUpOffAltIcon className=" font20 font-bold" />
                    <span>{profile.comments}</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-full bg-white flex flex-col justify-center items-center">
                <div className="w-full h-[250px] flex justify-center items-center mb-2">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={demoVid}
                  />
                </div>
                <div className="w-full h-[250px] flex justify-center items-center">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={demoVid}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 m-2">
                <span onClick={handleShowCMT}>
                  <ChatBubbleOutlineIcon className="text-black font20  cursor-pointer" />
                </span>
                <span className="text-black"> 1,529 </span>
              </div>
              <p className="mx-2 text-black">
                this is ganna be best video in the world that u can whole your
                country. dont forget to be best
              </p>
            </div>
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
  );
};

export default VideosProfile;
