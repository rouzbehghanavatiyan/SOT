import ImageRank from "../../../components/ImageRank";
import Cup from "../../../assets/img/cupLevel.webp";

const ChatHeader: React.FC<{
  score: number;
  userName: string;
  userProfile: string;
}> = ({ userName, userProfile, score }) => (
  <div className="w-full flex justify-between bg-white border-b-[1px] border-gray-200 py-3 px-4 sticky top-0 z-10">
    <ImageRank
      className="w-80 h-80"
      imgSize={60}
      rankStyle="w-10 h-10"
      score={score}
      iconProfileStyle="font60 text-gray-800"
      classUserName="text-black"
      userName={userName || "Unknown User"}
      imgSrc={userProfile || "default-profile-image.png"}
    />
    <div className=" flex items-center">
      <img src={Cup} width={50} height={50} />
    </div>
    <div className=" flex items-center">
      <img src={Cup} width={50} height={50} />
    </div>
    <div className=" flex items-center">
      <img src={Cup} width={50} height={50} />
    </div>
  </div>
);

export default ChatHeader;
