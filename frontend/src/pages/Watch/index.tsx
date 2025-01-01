import ReactPlayer from "react-player";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import FlareIcon from "@mui/icons-material/Flare";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Watch = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [canLike, setCanLike] = useState(false);

  const handleLikeClick = () => {
    setIsAnimating(true);
    setIsLiked(!isLiked);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanLike(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const pro2 =
    "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png";
  const saraProfile =
    "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg";
  const rankDimond =
    "https://static1.millenium.org/articles/7/23/24/27/@/132471-hots-ligues2-article_m-1.jpeg";
  const rank5 =
    "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp";
  const rankPink = "https://cdn-icons-png.flaticon.com/512/2248/2248967.png";
  const rankGreen =
    "https://png.pngtree.com/element_pic/17/04/21/3cf2bd43dfe0f8ac2e5154b23f74d457.jpg";
  const rank3 =
    "https://t3.ftcdn.net/jpg/06/96/78/00/360_F_696780039_AY7AJ1yNRkiJCwF1K8cEMKq5Q45Q12Rd.jpg";
  const aidaProfile =
    "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8";
  const victoryProfile =
    "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png";
  const jackProfile =
    "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg";

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12">
        <div className="grid grid-cols-4 gap-12">
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="flex justify-between items-center my-2 text-2xl"></div>
            <div className="relative w-[325px] h-[360px]">
              <div className="w-full h-full bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center ">
                  <iframe
                    className="w-96 h-1/2 "
                    src="https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd"
                    title="clipsho-video"
                  ></iframe>
                </div>
              </div>
              <div className="w-full h-full  bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src="https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour"
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="flex justify-between items-center my-2 text-2xl"></div>
            <div className="relative w-[325px] h-[360px]">
              <div className="w-full h-full bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center ">
                  <iframe
                    className="w-96 h-1/2 "
                    src="https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd"
                    title="clipsho-video"
                  ></iframe>
                </div>
              </div>
              <div className="w-full h-full  bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src="https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour"
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="flex justify-between items-center my-2 text-2xl"></div>
            <div className="relative w-[325px] h-[360px]">
              <div className="w-full h-full bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center ">
                  <iframe
                    className="w-96 h-1/2 "
                    src="https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd"
                    title="clipsho-video"
                  ></iframe>
                </div>
              </div>
              <div className="w-full h-full  bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src="https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour"
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="flex justify-between items-center my-2 text-2xl"></div>
            <div className="relative w-[325px] h-[360px]">
              <div className="w-full h-full bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center ">
                  <iframe
                    className="w-96 h-1/2 "
                    src="https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd"
                    title="clipsho-video"
                  ></iframe>
                </div>
              </div>
              <div className="w-full h-full  bg-black">
                <div className="flex  justify-between pt-5 px-4">
                  <span className="top-2 space-e-4">
                    <ThumbUpIcon className="text-white cursor-pointer" />
                    <FlareIcon className="text-white ms-4 cursor-pointer" />
                  </span>
                  <div>
                    <span className="p-2 text-white border cursor-pointer">
                      Fallow
                    </span>
                    <MoreVertIcon className="text-white m-1 cursor-pointer" />
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src="https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour"
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;

// import ReactPlayer from "react-player";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import AudiotrackIcon from "@mui/icons-material/Audiotrack";
// import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
// import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
// import { useEffect, useState } from "react";

// const Watch = () => {
//   const [isAnimating, setIsAnimating] = useState<boolean>(false);
//   const [likedVideos, setLikedVideos] = useState<{ [key: number]: boolean }>({});
//   const [canLike, setCanLike] = useState(false);

//   const handleLikeClick = (index: number) => {
//     setIsAnimating(true);
//     setLikedVideos((prev) => ({ ...prev, [index]: !prev[index] }));
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 300);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCanLike(true);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   // لیست ویدیوها
//   const videoData = [
//     {
//       category: "Music / Guitar",
//       icon: <AudiotrackIcon className="text-2xl" />,
//       videos: [
//         { url: "git3", title: "My Favorite Guitar Solo" },
//         { url: "git2", title: "Guitar Tutorial" },
//       ],
//     },
//     {
//       category: "Music / Sing",
//       icon: <AudiotrackIcon className="text-2xl" />,
//       videos: [
//         { url: "sing1", title: "Singing Cover" },
//         { url: "sing2", title: "Live Performance" },
//       ],
//     },
//     {
//       category: "Cook / Food",
//       icon: <OutdoorGrillIcon className="text-2xl" />,
//       videos: [
//         { url: "cook1", title: "Cooking Tutorial" },
//         { url: "cook2", title: "Recipe Sharing" },
//       ],
//     },
//     {
//       category: "Inventor",
//       icon: <PrecisionManufacturingIcon className="text-2xl" />,
//       videos: [
//         { url: "inventor1", title: "Invention Process" },
//         { url: "inventor2", title: "Innovative Designs" },
//       ],
//     },
//   ];

//   return (
//     <div className="col-span-12 md:col-span-12 lg:col-span-12">
//       <div className="grid grid-cols-4 gap-12">
//         {videoData.map((categoryData, categoryIndex) => (
//           <div key={categoryIndex}>
//             <div className="border-b-2 my-2 flex items-center">
//               {categoryData.icon}
//               <span className="text-2xl ml-2">{categoryData.category}</span>
//             </div>
//             {categoryData.videos.map((video, videoIndex) => (
//               <div key={videoIndex} className="relative w-[325px] bg-black h-[360px] mb-4">
//                 <ReactPlayer
//                   url={video.url} // Uncomment and provide the actual URL
//                   controls={true}
//                   width="100%"
//                   height="100%"
//                 />
//                 <span
//                   className={`absolute top-2 left-2 transition-transform duration-300 ${isAnimating ? "scale-110" : "scale-100"} flex space-x-4`}
//                   onClick={() => handleLikeClick(videoIndex + categoryIndex * 10)} // Unique index for each video
//                 >
//                   <ThumbUpIcon
//                     className={`m-1 cursor-pointer transition-colors duration-300 ${likedVideos[videoIndex + categoryIndex * 10] ? "text-blue" : "text-white"}`}
//                   />
//                 </span>
//                 <span className="absolute text-white border p-2 top-2 right-5">Follow</span>
//               </div>
//             ))}
//             {!canLike && (
//               <span className="absolute text-red bottom-2 left-2">
//                 You can like in 5 seconds
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Watch;
