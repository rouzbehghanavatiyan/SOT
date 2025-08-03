import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PropsType {
  justPic: boolean;
}

const VideoItemSkeleton: React.FC<PropsType> = ({ justPic }) => {
  return (
    <div className="video-skeleton">
      {justPic && <Skeleton height={350} />}
      {!justPic && (
        <Skeleton width={150} height={20} style={{ marginBottom: "6px" }} />
      )}
      {!justPic && <Skeleton count={2} />}
    </div>
  );
};

export default VideoItemSkeleton;
