import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PropsType {
  justPic?: boolean;
  itsShowWatch?: boolean;
  itsHome?: boolean;
  itsProfile?: boolean;
}

const VideoItemSkeleton: React.FC<PropsType> = ({
  justPic,
  itsShowWatch,
  itsHome,
  itsProfile,
}) => {
  console.log(itsShowWatch);

  return (
    <div className="video-skeleton">
      {itsShowWatch && (
        <div className="mx-1">
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="40vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="40vh"
            borderRadius={10}
            baseColor="#525252"
          />
        </div>
      )}
      {itsHome && (
        <div className="mx-1 mt-2">
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="37vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="36vh"
            borderRadius={10}
            baseColor="#525252"
          />
        </div>
      )}
      {itsProfile && (
        <div className="m-1">
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="37vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="6vh"
            borderRadius={10}
            baseColor="#525252"
          />
          <Skeleton
            className="w-full"
            height="37vh"
            borderRadius={10}
            baseColor="#525252"
          />
        </div>
      )}

      {justPic && <Skeleton height={350} />}
    </div>
  );
};

export default VideoItemSkeleton;
