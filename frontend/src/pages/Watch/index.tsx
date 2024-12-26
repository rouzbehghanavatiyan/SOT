// import git2 from "../../assets/videos/git2.mp4";
// import git3 from "../../assets/videos/git3.mp4";
// import git5 from "../../assets/videos/git5.mp4";
// import git6 from "../../assets/videos/git6.mp4";
// import sing1 from "../../assets/videos/sing1.mp4";
// import sing2 from "../../assets/videos/sing2.mp4";
// import cook1 from "../../assets/videos/cook1.mp4";
// import cook2 from "../../assets/videos/cook2.mp4";
// import inventor1 from "../../assets/videos/inventor1.mp4";
// import inventor2 from "../../assets/videos/inventor2.mp4";

import ReactPlayer from "react-player";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import { useEffect, useState } from "react";

const Watch = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false); // وضعیت برای تعیین رنگ آیکون
  const [canLike, setCanLike] = useState(false); // وضعیت برای تعیین اینکه کاربر می‌تواند لایک کند یا خیر

  const handleLikeClick = () => {
    setIsAnimating(true);
    setIsLiked(!isLiked); // تغییر وضعیت لایک
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // فعال کردن لایک بعد از 5 ثانیه
    const timer = setTimeout(() => {
      setCanLike(true);
    }, 5000);
    return () => clearTimeout(timer); // پاکسازی تایمر در صورت نیاز
  }, []);

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12">
        <div className="grid grid-cols-4 gap-12">
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={git3}
                controls={true}
                width="100%"
                height="100%"
              />
              <span
                className={`absolute top-2 left-2 transition-transform duration-300 ${isAnimating ? "scale-110" : "scale-100"} flex space-x-4`}
                onClick={handleLikeClick}
              >
                <ThumbUpIcon
                  className={`m-1 cursor-pointer transition-colors duration-300 ${isLiked ? "text-blue" : "text-white"}`}
                />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Follow
              </span>
              {!canLike && (
                <span className="absolute text-red bottom-2 left-2">
                  You can like in 5 seconds
                </span>
              )}
            </div>

            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={git2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Guitar</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={git6}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={git5}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className="">
            <div className="border-b-2 my-2">
              <AudiotrackIcon className="text-2xl" />
              <span className="text-2xl">Music / Sing</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={sing1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={sing2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <OutdoorGrillIcon className="text-2xl" />
              <span className="text-2xl">Cook / Food</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={cook1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <ReactPlayer
                // url={cook2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <PrecisionManufacturingIcon className="text-2xl" />
              <span className="text-2xl">Invntor</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <PrecisionManufacturingIcon className="text-2xl" />
              <span className="text-2xl">Invntor</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <PrecisionManufacturingIcon className="text-2xl" />
              <span className="text-2xl">Invntor</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <PrecisionManufacturingIcon className="text-2xl" />
              <span className="text-2xl">Invntor</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
          <div className=" ">
            <div className="border-b-2 my-2">
              <PrecisionManufacturingIcon className="text-2xl" />
              <span className="text-2xl">Invntor</span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor1}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
            <div className="relative w-[325px] bg-black h-[360px] ">
              <ReactPlayer
                // url={inventor2}
                controls={true}
                width="100%"
                height="100%"
              />
              <span className="absolute top-2 left-2 space-x-4">
                <ThumbUpIcon className="text-white m-1 cursor-pointer" />
              </span>
              <span className="absolute text-white border p-2 top-2 right-5 space-x-4">
                Fallow
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;

// import git1 from "../../assets/videos/git1.mp4";
// import git2 from "../../assets/videos/git2.mp4";
// import git3 from "../../assets/videos/git3.mp4";

// import ReactPlayer from "react-player";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import CommentIcon from "@mui/icons-material/Comment";
// const Watch = () => {
//   return (
//     <>
//       <div className="col-span-12 md:col-span-12 lg:col-span-12">
//         <div className="grid grid-cols-10 gap-2">
//           {[...Array(24)].map((_) => (
//             <div className="col-span-2 md:col-span-2 lg:col-span-2">
//               <div className="relative">
//                 <ReactPlayer
// url = { git3 }
//                   controls={true}
//                   width="100%"
//                   height="100%"
//                 />
//                 <div className="absolute top-2 left-2 flex space-x-4">
//                   <ThumbUpIcon className="text-white m-1 cursor-pointer" />
//                   <CommentIcon className="text-white m-1 cursor-pointer" />
//                 </div>
//               </div>
//               <div className="relative">
//                 <ReactPlayer
// url = { git2 }
//                   controls={true}
//                   width="100%"
//                   height="100%"
//                 />
//                 <div className="absolute top-2 left-2 flex space-x-4">
//                   <ThumbUpIcon className="text-white m-1 cursor-pointer" />
//                   <CommentIcon className="text-white m-1 cursor-pointer" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Watch;
