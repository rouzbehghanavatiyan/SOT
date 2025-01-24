import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactPlayer from "react-player";
import CropFreeIcon from "@mui/icons-material/CropFree";
import demoVid from "../../../../../VID_20230630_182952.mp4";
const profiles = [
  {
    img: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    rank: "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp",
    username: "sara596-1",
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

  const handleExpand = (index: any) => {
    setExpandedVideo((prev) => (prev === index ? null : index));
  };

  return (
    <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
      <div className=" grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {profiles.map((profile, index) => (
          <section
            key={index}
            className={` mb-8 ${expandedVideo === index ? "col-span-full" : ""}`}>
            <div
              className={`relative ${
                expandedVideo === index
                  ? "w-full h-screen "
                  : "w-full sm:w-[100%] md:w-[100%] lg:w-[325px] h-[650px]"
              }transition-all duration-500`}>
              <div className="ms-1 absolute justify-between items-center text-2xl">
                <div className="flex gap-2 my-1 items-center">
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
                      width={25}
                      height={25}
                      alt="Rank"
                    />
                  </div>
                  <div className="flex col-span-2 justify-center">
                    <span className="font-bold text-white">
                      {profile.username}
                    </span>
                    {!!profile.cupPro && (
                      <div className="flex items-end mx-2">
                        <img width={25} height={25} src={profile.cupPro} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  {profile?.type?.toLowerCase() === "success" ? (
                    <>
                      <VerifiedIcon
                        className={`flex items-center text-${profile.color} font35`}
                      />
                      <span className="text-green">{profile.type}</span>
                    </>
                  ) : (
                    <>
                      <DangerousIcon
                        className={`flex items-center text-red font35`}
                      />
                      <span className="text-red">{profile.type}</span>
                    </>
                  )}
                  {/* <div
                    className="flex justify-end  items-center "
                    onClick={() => handleExpand(index)}>
                    <CropFreeIcon
                      className={` ${
                        expandedVideo === index
                          ? "text-green-500"
                          : "text-white"
                      } font35 cursor-pointer`}
                    />
                  </div> */}
                </div>
              </div>
              <div className="w-full h-full bg-black flex flex-col justify-center items-center">
                <div className="w-full h-[450px] flex justify-center items-center mb-2">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={demoVid}
                  />
                </div>
                <div className="w-full h-[450px] flex justify-center items-center">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={demoVid}
                  />
                </div>
              </div>
              <div className="flex gap-2 m-2">
                <ChatBubbleOutlineIcon className="text-black  cursor-pointer" />
                <p className="text-black">
                  <div className="flex items-center gap-2">
                    <ThumbUpOffAltIcon />
                    <span>{profile.comments}</span>
                  </div>
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
