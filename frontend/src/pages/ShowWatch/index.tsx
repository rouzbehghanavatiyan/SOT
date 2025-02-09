import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  attachmentListByInviteId,
  attachmentPlay,
} from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import Video from "../../components/Video";
import { useAppSelector } from "../../hooks/hook";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

const ShowWatch = ({}) => {
  const [videoSrc, setVideoSrc] = useState([]);
  const [dataBinery, setDataBinery] = useState(null);
  const { main } = useAppSelector((state) => state);
  const [isPlayingBottom, setIsPlayingBottom] = useState(false);
  const [isPlayingTop, setIsPlayingTop] = useState(false);

  const handleVideoBottom = () => {
    setIsPlayingBottom(!isPlayingBottom);
  };

  const handleVideoTop = () => {
    setIsPlayingTop(!isPlayingTop);
  };
  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const inviteId = main?.dobuleVideo?.child?.parentId;
    const res = await attachmentListByInviteId(inviteId);
    const { status, data } = res?.data;
    if (status === 0) {
      const fixVideo1 = `wwwroot/${data[0]?.attachmentType}/${data[0]?.fileName}${data[0]?.ext}`;
      console.log("1", data);
      setVideoSrc(data);
      console.log("2", fixVideo1);
      const res = await attachmentPlay(fixVideo1);
      console.log(res);
      setDataBinery(res?.data);

      // const getBlob = await res?.data?.blob();
      // const objectUrl = URL.createObjectURL(getBlob);
      // console.log(getBlob);
    }
  });

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, []);

  const fixVideo1 = `${baseURL}/${videoSrc[0]?.attachmentType}/${videoSrc[0]?.fileName}${videoSrc[0]?.ext}`;
  const fixVideo2 = `${baseURL}/${videoSrc[1]?.attachmentType}/${videoSrc[1]?.fileName}${videoSrc[1]?.ext}`;

  console.log(fixVideo1);

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
              <SwiperSlide className="bg-black flex flex-col">
                {/* <OptionHomes result profile={profile} /> */}
                <div className="w-[100%] h-[31vh]">
                  <Video
                    loop
                    handleVideo={handleVideoTop}
                    url={dataBinery}
                    playing={isPlayingTop}
                  />
                </div>
                {/* <OptionHomes profile={profile} /> */}
                <div className="w-[100%] h-[31vh]">
                  <Video
                    loop
                    handleVideo={handleVideoBottom}
                    url={fixVideo2}
                    playing={isPlayingBottom}
                  />
                </div>
              </SwiperSlide>
            </div>
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default ShowWatch;
