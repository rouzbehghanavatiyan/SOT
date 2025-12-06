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
          iconClass="text-gray-200 font60 w-full h-full rounded-full"
          userNameStyle="text-gray-800"
          imgSize={60}
          score={score}
          userName={userName || "Unknown User"}
          imgSrc={userProfile}
        />
      </span>
      <div className="col-span-5 flex items-center">
        <img src={Cup} width={50} height={50} />
      </div>
    </div>
  );
};

export default ChatHeader;
