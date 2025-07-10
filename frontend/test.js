// import { useEffect, useState } from "react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   attachmentListByInviteId,
//   attachmentPlay,
// } from "../../services/dotNet";
// import asyncWrapper from "../../common/AsyncWrapper";
// import Video from "../../components/Video";
// import { useAppSelector } from "../../hooks/hook";

// const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

// const ShowWatch = () => {
//   const [videoSrc, setVideoSrc] = useState("");
//   const  main  = useAppSelector((state) => state?.main);
//   const [isPlayingBottom, setIsPlayingBottom] = useState(false);
//   const handleBinaryData = (binaryData: string) => {
//     const blob = new Blob([binaryData], { type: "video/mp4" });
//     const objectUrl = URL.createObjectURL(blob);
//     setVideoSrc(objectUrl);
//   };

//   const handleAttachmentListByInviteId = asyncWrapper(async () => {
//     const inviteId = main?.dobuleVideo?.child?.parentId;
//     const res = await attachmentListByInviteId(inviteId);
//     const { status, data } = res?.data;
//     if (status === 0 && data.length > 0) {
//       const fixVideo1 = `wwwroot/${data[0]?.attachmentType}/${data[0]?.fileName}${data[0]?.ext}`;

//       const binaryRes = await attachmentPlay(fixVideo1);
//       handleBinaryData(binaryRes.data);
//     }
//   });

//   useEffect(() => {
//     handleAttachmentListByInviteId();
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (videoSrc) {
//         URL.revokeObjectURL(videoSrc);
//       }
//     };
//   }, [videoSrc]);

//   return (
//     <>
//       <Swiper
//         direction={"vertical"}
//         slidesPerView={1}
//         mousewheel={true}
//         className="mySwiper h-screen"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white">
//           <div className="h-screen">
//             <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-white h-[80%]">
//               <SwiperSlide className="bg-black flex flex-col">
//                 <div className="w-[100%] h-[31vh]">
//                   <Video
//                     loop
//                     handleVideo={() => setIsPlayingTop(!isPlayingTop)}
//                     url={videoSrc} // استفاده از URL ساخته شده
//                     playing={isPlayingTop}
//                   />
//                   <video />
//                 </div>
//                 <div className="w-[100%] h-[31vh]">
//                   <Video
//                     loop
//                     handleVideo={() => setIsPlayingBottom(!isPlayingBottom)}
//                     url={videoSrc} // استفاده از URL ساخته شده
//                     playing={isPlayingBottom}
//                   />
//                 </div>
//               </SwiperSlide>
//             </div>
//           </div>
//         </div>
//       </Swiper>
//     </>
//   );
// };

// export default ShowWatch;

{
  /* <video id="videoPlayer" width="640" height="480" controls>
    Your browser does not support the video tag.
</video> */
}

{
  /* <script>
    const videoPlayer = document.getElementById('videoPlayer');

    // Fetch the video with custom headers
    fetch('http://localhost:5000/video/play/1', {
        headers: {
            'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
    })
    .then(response => response.blob())
    .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        videoPlayer.src = blobUrl;
        videoPlayer.play();
    })
    .catch(error => {
        console.error('Error fetching video:', error);
    });
</script> */
}
