import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import demoVid from "../../../../../00b16493dc977a745b7207f06d8a159a59064958-480p.mp4";
import demoVid2 from "../../../../../24973359cdff3b2ea4d251b3dc1a919611425919-360p.mp4";
import Comments from "../../common/Comments";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import rank1 from "../../assets/img/rank10.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../assets/img/rank5.webp";
import OptionHomes from "./OptionHomes";
import cook3 from "../../assets/img/cook3.jpg";
import cook4 from "../../assets/img/cook4.jpg";
import inv5 from "../../assets/img/inv5.jpg";
import Video from "../../components/Video";
import { userAttachmentList } from "../../services/dotNet";
import { useAppSelector } from "../../hooks/hook";

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

const Home: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [closingComments, setClosingComments] = useState(false);
  const [isPlayingBottom, setIsPlayingBottom] = useState(false);
  const [isPlayingTop, setIsPlayingTop] = useState(false);

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

  const handleVideoBottom = () => {
    setIsPlayingBottom(!isPlayingBottom);
  };

  const handleVideoTop = () => {
    setIsPlayingTop(!isPlayingTop);
  };

  const handleGiveVideos = async () => {
    try {
      const res = await userAttachmentList(main?.userLogin?.userId);
      const { status, data } = res?.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGiveVideos();
  }, [main?.userLogin?.userId]);

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        className="mySwiper h-screen"
      >
        <div className="grid grid-cols-1  md:grid-cols-3 justify-centerbg-white">
          <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
              {dubleVideos.map((profile, index) => (
                <SwiperSlide
                  key={index}
                  className="bg-white relative flex flex-col"
                >
                  <OptionHomes result profile={profile} />
                  <div className="w-[100%] h-[30vh]">
                    <Video
                      loop
                      handleVideo={handleVideoTop}
                      url={demoVid}
                      playing={isPlayingTop}
                    />
                  </div>
                  <OptionHomes useFollow profile={profile} />
                  <div className="w-[100%] h-[30vh]">
                    <Video
                      loop
                      handleVideo={handleVideoBottom}
                      url={demoVid2}
                      playing={isPlayingBottom}
                    />
                  </div>
                  <div className="flex  items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-black font20 cursor-pointer" />
                    </span>
                    <span className="text-black"> 1,529 </span>
                  </div>
                  <div className="flex bg-white items-center gap-1 m-2 max-h-[50px] overflow-hidden text-ellipsis line-clamp-2">
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test this is a test
                    this is a test this is a test this is a test
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
