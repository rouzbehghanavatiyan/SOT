import React from "react";
import { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FlareIcon from "@mui/icons-material/Flare";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Input from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";

const Watch = () => {
  const [searching, setSearching] = useState("");

  const allVideo = [
    {
      srcUp: "https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd",
      srcDown: "https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour",
    },
    {
      srcUp: "https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd",
      srcDown: "https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour",
    },
    {
      srcUp: "https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd",
      srcDown: "https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour",
    },
    {
      srcUp: "https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd",
      srcDown: "https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour",
    },
    {
      srcUp: "https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd",
      srcDown: "https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour",
    },
  ];

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12">
        <div className="flex m-4 mb-2 items-center">
          <Input
            className="xxl:w-[1200px]  xl:w-[1100px] xs:w-[600px] "
            value={searching}
            onChange={(e: any) => setSearching(e.target.value)}
            placeholder="Search . . ."
          />
          <span>
            <SearchIcon className="text-gray-800 ms-2" />
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 p-4">
          {allVideo.map((video, index) => (
            <section key={index} className="bg-gray-100 rounded-md p-2">
              <div className="border-b-2 my-2">
                <AudiotrackIcon className="text-2xl" />
                <span className="text-2xl">Music / Guitar</span>
              </div>
              <div className="relative">
                <div className="bg-black p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="space-x-4">
                      <ThumbUpIcon className="text-white cursor-pointer" />
                      <FlareIcon className="text-white cursor-pointer" />
                    </div>
                    <div>
                      <span className="p-2 text-white border cursor-pointer">
                        Follow
                      </span>
                      <MoreVertIcon className="text-white m-1 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center mb-2">
                    <iframe
                      className="w-full h-48"
                      src={video.srcUp}
                      title="clipsho-video"
                    ></iframe>
                  </div>
                </div>
                <div className="bg-black p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="space-x-4">
                      <ThumbUpIcon className="text-white cursor-pointer" />
                      <FlareIcon className="text-white cursor-pointer" />
                    </div>
                    <div>
                      <span className="p-2 text-white border cursor-pointer">
                        Follow
                      </span>
                      <MoreVertIcon className="text-white m-1 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center mb-2">
                    <iframe
                      src={video.srcDown}
                      title="clipsho-video"
                      className="w-full h-48"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Watch;
