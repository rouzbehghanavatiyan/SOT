import ImageRank from "../../../components/ImageRank";
import Cup from "../../../assets/img/cupLevel.webp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ChatHeader: React.FC<{
  score: number;
  userName: string;
  userProfile: string;
}> = ({ userName, userProfile, score }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full grid grid-cols-12 justify-between shadow-card bg-white  py-2 px-4 top-0 z-10">
      <div className="col-span-1 flex items-center">
        <ArrowBackIcon
          onClick={handleBack}
          className="text-primary  flex font25"
        />
      </div>
      <span className="col-span-5">
        <ImageRank
          userNameStyle="text-gray-800"
          imgSize={60}
          rankStyle="w-10 h-10"
          score={score}
          iconProfileStyle="font60 text-gray-800"
          classUserName="text-black"
          userName={userName || "Unknown User"}
          imgSrc={userProfile || "default-profile-image.png"}
        />
      </span>
      <div className="col-span-5 flex items-center">
        <img src={Cup} width={50} height={50} />
      </div>
    </div>
  );
};

export default ChatHeader;
