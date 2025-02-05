import "swiper/css";
import "swiper/css/pagination";
import { Swiper } from "swiper/react";

const ShowWatch = ({}) => {
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
              {/* {dubleVideos.map((profile, index) => (
                <SwiperSlide key={index} className="bg-black flex flex-col">
                  <OptionHomes result profile={profile} />
                  <div className="w-[100%] h-[31vh]">
                    <Video
                      loop
                      handleVideo={handleVideoTop}
                      url={demoVid}
                      playing={isPlayingTop}
                    />
                  </div>
                  <OptionHomes profile={profile} />
                  <div className="w-[100%] h-[31vh]">
                    <Video
                      loop
                      handleVideo={handleVideoBottom}
                      url={demoVid2}
                      playing={isPlayingBottom}
                    />
                  </div>
                  <div className="flex items-center gap-1 m-2">
                    <span onClick={handleShowCMT}>
                      <ChatBubbleOutlineIcon className="text-white font20 cursor-pointer" />
                    </span>
                    <span className="text-white"> 1,529 </span>
                  </div>
                </SwiperSlide>
              ))} */}
            </div>
            {/* {showComments && (
              <Comments
                handleShowCMT={handleShowCMT}
                closingComments={closingComments}
              />
            )} */}
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default ShowWatch;
