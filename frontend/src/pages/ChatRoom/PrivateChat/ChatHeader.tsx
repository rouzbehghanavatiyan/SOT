import ImageRank from "../../../components/ImageRank";

const ChatHeader: React.FC<{
  score: number;
  userName: string;
  userProfile: string;
}> = ({ userName, userProfile, score }) => (
  <div className="w-full bg-white border-b-[1px] border-gray-200 py-3 px-4 sticky top-0 z-10">
    <ImageRank
      className="w-80 h-80"
      imgSize={60}
      rankStyle="w-9 h-9"
      score={score}
      classUserName="text-black"
      userName={userName || "Unknown User"}
      imgSrc={userProfile || "default-profile-image.png"}
    />
  </div>
);
export default ChatHeader;
