import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PropsType {
  section?: "itsShowWatch" | "itsHome" | "itsProfile" | "justPic" | "filteredWatch" | "singleCircle";
}

const VideoItemSkeleton: React.FC<PropsType> = ({ section }) => {
  const commonProps = {
    baseColor: "#5252523a",
    borderRadius: 10,
    className: "w-full",
  };

  switch (section) {
    case "itsShowWatch":
    case "itsHome":
    case "itsProfile":
      const heights = ["6vh", "37vh", "6vh", "37vh"];
      return (
        <div className="mx-1 mt-2">
          {heights.map((h, i) => (
            <Skeleton key={i} {...commonProps} height={h} />
          ))}
        </div>
      );

    case "justPic":
      return (
        <div className="flex flex-col gap-1 w-full">
          <Skeleton height={175} className="rounded-tr-lg" />
          <Skeleton height={175} className="rounded-bl-xl" />
        </div>
      );

    case "singleCircle": 
      return <Skeleton circle width={60} height={60} />;

    default:
      return null;
  }
};

export default VideoItemSkeleton;