import git2 from "../../assets/videos/git2.mp4";
import git3 from "../../assets/videos/git3.mp4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReactPlayer from "react-player";
import pro1 from "../../assets/img/1-intro-photo-final.jpg";
import rank1 from "../../assets/img/rank1.avif";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarRateIcon from "@mui/icons-material/StarRate";
import DangerousIcon from "@mui/icons-material/Dangerous";
import git5 from "../../assets/videos/git5.mp4";
import git6 from "../../assets/videos/git6.mp4";
import sing1 from "../../assets/videos/sing1.mp4";
import sing2 from "../../assets/videos/sing2.mp4";
import cook1 from "../../assets/videos/cook1.mp4";
import cook2 from "../../assets/videos/cook2.mp4";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

const Home = () => {
  const pro2 = "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
  const saraProfile = "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg"
  const rankDimond = "https://static1.millenium.org/articles/7/23/24/27/@/132471-hots-ligues2-article_m-1.jpeg"
  const rank5 = "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp"
  const rankPink = "https://cdn-icons-png.flaticon.com/512/2248/2248967.png"
  const rankGreen = "https://png.pngtree.com/element_pic/17/04/21/3cf2bd43dfe0f8ac2e5154b23f74d457.jpg"
  const rank3 = "https://t3.ftcdn.net/jpg/06/96/78/00/360_F_696780039_AY7AJ1yNRkiJCwF1K8cEMKq5Q45Q12Rd.jpg"
  const aidaProfile = "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
  const victoryProfile = "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
  const jackProfile = "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg"

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12">
        <section className="grid grid-cols-12 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          <div className="">
            <div className="flex justify-between items-center my-2 text-2xl">
              <div className="flex items-center ">
                <img src={pro2} width={50} className="my-2 rounded-full" height={50} />
                <div className="flex ms-2 flex-col" >
                  <span className=" font-bold"> Jhon wins </span>
                  <span className="">
                    <span className="relative">
                      <img
                        src={rankPink}
                        width={40}
                        className="rounded-full"
                        height={40}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <div className="absolute top-2  left-2 flex space-x-4">
                <div className="flex-col col-auto gap-2" >
                  <CommentIcon className="text-white cursor-pointer" />
                  <p className="text-white" >
                    <div className="flex items-center gap-2" >
                      <ThumbUpIcon />
                      <span>
                        120k
                      </span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  <VerifiedIcon className="flex items-center text-orange-hover font35" />
                  <span className="text-white"> Success </span>
                </div>
              </div>
              <div className="w-full h-full bg-black">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src='https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour'
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  >
                  </iframe>
                </div>
              </div>
              <div className="w-full h-full bg-black">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe className="w-96 h-1/2" src='https://www.clipsho.com/share/video/play/u3v411u56bm4mnd14y' title="clipsho-video"></iframe>
                </div>
              </div>
            </div>
          </div >
          <div className="">
            <div className="flex justify-between items-center my-2 text-2xl">
              <div className="flex items-center ">
                <img src={saraProfile} width={50} className="my-2 rounded-full" height={50} />
                <div className="flex ms-2 flex-col" >
                  <span className=" font-bold"> Sara1409 </span>
                  <span className="">
                    <span className="relative">
                      <img
                        src={rank5}
                        width={40}
                        className="rounded-full"
                        height={40}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <div className="absolute top-2  left-2 flex space-x-4">
                <div className="flex-col col-auto gap-2" >
                  <CommentIcon className="text-white cursor-pointer" />
                  <p className="text-white" >
                    <div className="flex items-center gap-2" >
                      <ThumbUpIcon />
                      <span>
                        864
                      </span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  <DangerousIcon className="flex items-center text-red font35" />
                  <span className="text-white"> Loss </span>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe className="w-96 h-1/2" src='https://www.clipsho.com/share/video/play/u3v411o56nm36lzinh'></iframe>
                </div>
              </div>
              <div className="w-full h-full bg-black">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe className="w-96 h-1/2" src='https://www.clipsho.com/share/video/play/u3v412g5hplwwdy0hx'></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center my-2 text-2xl">
              <div className="flex items-center ">
                <img src={aidaProfile} width={50} className="my-2 rounded-full" height={50} />
                <div className="flex ms-2 flex-col" >
                  <span className=" font-bold"> aidafee </span>
                  <span className="">
                    <span className="relative">
                      <img
                        src={rankPink}
                        width={40}
                        className="rounded-full"
                        height={40}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <div className="absolute top-2  left-2 flex space-x-4">
                <div className="flex-col col-auto gap-2" >
                  <CommentIcon className="text-white cursor-pointer" />
                  <p className="text-white" >
                    <div className="flex items-center gap-2" >
                      <ThumbUpIcon />
                      <span>
                        1.5m
                      </span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  <VerifiedIcon className="flex items-center text-orange-hover font35" />
                  <span className="text-white"> Success </span>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src='https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour'
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  >
                  </iframe>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center bg-black">
                  <iframe className="w-96 h-1/2" src='https://www.clipsho.com/share/video/play/u3v411s2hylya938du' title="clipsho-video"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center my-2 text-2xl">
              <div className="flex items-center ">
                <img src={jackProfile} width={50} className="my-2 rounded-full" height={50} />
                <div className="flex ms-2 flex-col" >
                  <span className=" font-bold"> jack_5316 </span>
                  <span className="">
                    <span className="relative">
                      <img
                        src={rank3}
                        width={30}
                        className="rounded-full"
                        height={30}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-[325px] bg-black h-[360px]">
              <div className="absolute top-2  left-2 flex space-x-4">
                <div className="flex-col col-auto gap-2" >
                  <CommentIcon className="text-white cursor-pointer" />
                  <p className="text-white" >
                    <div className="flex items-center gap-2" >
                      <ThumbUpIcon />
                      <span>
                        5.9k
                      </span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  <VerifiedIcon className="flex items-center text-orange-hover font35" />
                  <span className="text-white"> Success </span>
                </div>
              </div>
              <div className="w-full h-full bg-black">
                <div className="w-full h-full flex justify-center items-center ">
                  <iframe className="w-96 h-1/2" src='https://www.clipsho.com/share/video/play/u3v411u56bm4fcd7yd' title="clipsho-video"></iframe>
                </div>
              </div>
              <div className="w-full h-full bg-black">
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    src='https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour'
                    title="clipsho-video"
                    className="w-96 h-1/2"
                  >
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section >
      </div >
    </>
  );
};

export default Home;




































// import rank1 from "../../assets/img/rank1.avif";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import DangerousIcon from "@mui/icons-material/Dangerous";
// import CommentIcon from "@mui/icons-material/Comment";

// const Home = () => {
//   const pro2 = "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png";
//   const saraProfile = "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg";

//   return (
//     <>
//       <div className="col-span-12 md:col-span-12 lg:col-span-12 flex justify-center items-center">
//         <section className="grid grid-cols-12 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
//           <div className="flex flex-col items-center bg-red">
//             <div className="flex justify-between items-center my-2 text-2xl">
//               <div className="flex items-center ">
//                 <img src={saraProfile} width={50} className="my-2 rounded-full" height={50} />
//                 <div className="flex ms-2 flex-col">
//                   <span className="font-bold"> Jhon wins </span>
//                   <span className="">
//                     <span className="relative">
//                       <img
//                         src={rank1}
//                         width={40}
//                         className="rounded-full"
//                         height={40}
//                       />
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="relative w-[325px] bg-black h-[360px] flex flex-col justify-center items-center">
//               <div className="absolute top-2 left-2 flex space-x-4">
//                 <CommentIcon className="text-white m-1 cursor-pointer" />
//               </div>
//               <div className="absolute font35 top-2 right-4">
//                 <div className="flex items-center">
//                   <DangerousIcon className="flex items-center text-red font35" />
//                   <span className="text-white"> Loss </span>
//                 </div>
//               </div>
//               <div className="w-full h-full">
//                 <iframe
//                   src='https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour'
//                   title="clipsho-video"
//                   className="w-full h-full"
//                   style={{ border: 0 }}
//                 ></iframe>
//               </div>
//             </div>
//             <div className="relative w-[325px] bg-black h-[360px] flex flex-col justify-center items-center">
//               <div className="w-full h-full">
//                 <iframe
//                   src='https://www.clipsho.com/share/video/play/u3v411g4o1m47qku76'
//                   title="clipsho-video"
//                   className="w-full h-full"
//                   style={{ border: 0 }}
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="flex justify-between items-center my-2 text-2xl">
//               <div className="flex items-center ">
//                 <img src={pro2} width={50} className="my-2 rounded-full" height={50} />
//                 <div className="flex ms-2 flex-col">
//                   <span className="font-bold"> Jhon wins </span>
//                   <span className="">
//                     <span className="relative">
//                       <img
//                         src={rank1}
//                         width={40}
//                         className="rounded-full"
//                         height={40}
//                       />
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="relative w-[325px] bg-black h-[360px] flex flex-col justify-center items-center">
//               <div className="absolute top-2 left-2 flex space-x-4">
//                 <CommentIcon className="text-white m-1 cursor-pointer" />
//               </div>
//               <div className="absolute font35 top-2 right-4">
//                 <div className="flex items-center">
//                   <VerifiedIcon className="flex items-center text-orange-hover font35" />
//                   <span className="text-white"> Success </span>
//                 </div>
//               </div>
//               <div className="w-full h-full">
//                 <iframe
//                   src='https://www.clipsho.com/share/video/play/u3v412g5hplwwdy0hx'
//                   title="clipsho-video"
//                   className="w-full h-full"
//                   style={{ border: 0 }}
//                 ></iframe>
//               </div>
//             </div>
//             <div className="relative w-[325px] bg-black h-[360px] flex flex-col justify-center items-center">
//               <div className="w-full h-full">
//                 <iframe
//                   src='https://www.clipsho.com/share/video/play/u3v411u56bm4mnd14y'
//                   title="clipsho-video"
//                   className="w-full h-full"
//                   style={{ border: 0 }}
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Home;