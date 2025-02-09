import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { attachmentListByInviteId } from "../../services/dotNet";
import asyncWrapper from "../../common/AsyncWrapper";
import Video from "../../components/Video";
import { useAppSelector } from "../../hooks/hook";
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

const ShowWatch = ({}) => {
  const [videoSrc, setVideoSrc] = useState([]);
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
      setVideoSrc(res?.data?.data);
      // const getBlob = await res?.data?.blob();
      // const objectUrl = URL.createObjectURL(getBlob);
      // console.log(getBlob);
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
        {videoSrc?.map((src: any, index: number) => {
          console.log(src);
          const fixVideo1 = `${baseURL}/${src?.[0]?.attachmentType}/${src?.[0]?.fileName}${src?.[0]?.ext}`;
          const fixVideo2 = `${baseURL}/${src?.[1].attachmentType}/${src?.[1].fileName}${src?.[1].ext}`;
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center  bg-white">
              <div className="h-screen">
                <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
                  <SwiperSlide key={index} className="bg-black flex flex-col">
                    {/* <OptionHomes result profile={profile} /> */}
                    <div className="w-[100%] h-[31vh]">
                      <Video
                        loop
                        handleVideo={handleVideoTop}
                        url={fixVideo1}
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
          );
        })}
      </Swiper>
    </>
  );
};

export default ShowWatch;
{
  /* 
//   <script>
//   // Fetch the video list from the API
//   fetch("http://localhost:5000/api/video") // Adjust the port as necessary
//       .then(response => response.json())
//       .then(videos => {
//           const videoList = document.getElementById("videoList");
//           videos.forEach(video => {
//               const listItem = document.createElement("li");
//               listItem.innerHTML = `<button onclick="playVideo(${video.id})">${video.title}</button>`;
//               videoList.appendChild(listItem);
//           });
//       });

//   // Function to play the selected video
//   function playVideo(videoId) {
//       const videoPlayer = document.getElementById("videoPlayer");
//       const videoSource = document.getElementById("videoSource");

//       // Update the source of the video player to the selected video
//       videoSource.src = `http://localhost:5000/api/video/play/${videoId}`; // Adjust the URL to match your API
//       videoPlayer.load(); // Load the new video
//       videoPlayer.play(); // Automatically play the video
//   }
// </script> */
}
