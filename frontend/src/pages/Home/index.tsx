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
import cupLvl1 from "../../assets/img/cupLevel.webp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import roberto from "../../assets/img/roberto.avif";
import Story from "./Story";

const profiles = [
  {
    img: roberto,
    rank: "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp",
    username: "rabero159",
    type: "Success",
    color: "orange-hover",
    comments: "120k",
    cupPro: cupLvl1,
  },
  {
    img: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    rank: "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp",
    username: "sara596-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Success",
    color: "orange-hover",
    comments: "20k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
  {
    img: "https://img.freepik.com/premium-photo/professional-linkedin-profile-photo-young-man-suit-tie-smiling-confidently_1141323-1549.jpg",
    rank: "https://cdn-icons-png.flaticon.com/512/2248/2248967.png",
    username: "jackrooo-1",
    type: "Loss",
    color: "red",
    comments: "120k",
    cupPro: null,
  },
];

const Home = () => {
  return (
    <div className="col-span-12 md:col-span-12 lg:col-span-12">
      {/* <Story /> */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {profiles.map((profile, index) => (
          <section key={index} className="mb-8">
            <div className="flex justify-between items-center text-2xl">
              <div className="flex gap-2 my-1 items-center">
                <div className="relative mb-2 col-span-1">
                  <img
                    className="rounded-full relative"
                    src={profile.img}
                    width={60}
                    height={60}
                    alt="Profile"
                  />
                  <img
                    className="absolute bottom-0"
                    src={profile.rank}
                    width={25}
                    height={25}
                    alt="Rank"
                  />
                </div>
                <div className="flex col-span-2 justify-center">
                  <span className="font-bold">{profile.username}</span>
                  {!!profile.cupPro && (
                    <div className="flex items-end mx-2">
                      <img width={25} height={25} src={profile.cupPro} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative w-[325px] bg-black h-[450px]">
              <div className="absolute top-2 left-2 flex space-x-4">
                <div className="flex-col col-auto gap-2">
                  <CommentIcon className="text-white cursor-pointer" />
                  <p className="text-white">
                    <div className="flex items-center gap-2">
                      <ThumbUpIcon />
                      <span>{profile.comments}</span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="absolute font35 top-2 right-4">
                <div className="flex items-center">
                  {profile?.type?.toLowerCase() === "success" ? (
                    <VerifiedIcon
                      className={`flex items-center text-${profile.color} font35`}
                    />
                  ) : (
                    <DangerousIcon
                      className={`flex items-center text-red font35`}
                      // className={`flex items-center text-${profile.color} font35`}
                    />
                  )}
                  <span className="text-white">{profile.type}</span>
                </div>
              </div>
              <div className="w-full h-full bg-black flex flex-col justify-center items-center">
                <div className="w-full h-1/2 flex justify-center items-center mb-2">
                  <iframe
                    src="https://www.clipsho.com/share/video/play/u3v411on1mm4cfwour"
                    title="clipsho-video"
                    className="w-96 h-full"
                  ></iframe>
                </div>
                <div className="w-full h-1/2 flex justify-center items-center">
                  <iframe
                    className="w-96 h-full"
                    src="https://www.clipsho.com/share/video/play/u3v411u56bm4mnd14y"
                    title="clipsho-video"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
