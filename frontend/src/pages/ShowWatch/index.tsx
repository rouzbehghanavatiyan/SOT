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
import OptionHomes from "../Home/OptionHomes";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

const ShowWatch = ({}) => {
  const [dataBineryTop, setDataBineryTop] = useState({});
  const [dataBineryBottom, setDataBineryBottom] = useState({});
  const { main } = useAppSelector((state) => state);
  const [isPlayingBottom, setIsPlayingBottom] = useState(false);
  const [isPlayingTop, setIsPlayingTop] = useState(true);

  const handleAttachmentListByInviteId = asyncWrapper(async () => {
    const inviteId = main?.dobuleVideo?.child?.parentId;
    const res = await attachmentListByInviteId(inviteId);
    const { status, data } = res?.data;
    const allDataMap = data?.map((item: any) => {
      return item;
    });
    const videoPlayer = document.getElementById("videoPlayer");
    if (status === 0 && allDataMap.length >= 2) {
      const fixVideo1 = `wwwroot/${allDataMap[0]?.attachmentType}/${allDataMap[0]?.fileName}${allDataMap[0]?.ext}`;
      const fixVideo2 = `wwwroot/${allDataMap[1]?.attachmentType}/${allDataMap[1]?.fileName}${allDataMap[1]?.ext}`;

      const res1 = await attachmentPlay(fixVideo1);
      console.log(res1);
      const res2 = await attachmentPlay(fixVideo2);

      setDataBineryTop(res1);
      setDataBineryBottom(res2);
    }
  });

  useEffect(() => {
    handleAttachmentListByInviteId();
  }, []);

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
              <SwiperSlide className="bg-gray-900 flex flex-col">
                <div className="w-[100%] h-[31vh] ">
                  <Video
                    loop
                    handleVideo={() => setIsPlayingTop(!isPlayingTop)}
                    url={dataBineryTop}
                    playing={isPlayingTop}
                  />
                </div>
                {/* <OptionHomes profile={profile} />s */}
                <div className="w-[100%] h-[31vh] my-4">
                  <Video
                    loop
                    handleVideo={() => setIsPlayingBottom(!isPlayingBottom)}
                    url={dataBineryBottom}
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
