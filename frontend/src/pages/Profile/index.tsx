import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VideosProfile from "./VideosProfile";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { followerList, userAttachmentList } from "../../services/dotNet";
import EditProfile from "./EditProfile";
import { Link, useLocation } from "react-router-dom";
import StringHelpers from "../../utils/helpers/StringHelper";
import Loading from "../../components/Loading";
import ProfileHeader from "./ProfileHeader";
import ProfileAchievements from "./ProfileAchievements";
import ProfileBio from "./ProfileBio";

const Profile: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const socket = main.socketConfig;
  const userId = main?.userLogin?.user?.id;
  const [match, setMatch] = useState<any>([]);
  const [allFollower, setAllFollower] = useState<any>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string>("");
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({});
  const videosProfileRef = useRef<HTMLDivElement | null>(null);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 1,
    hasMore: true,
  });
  const userIdWhantToShow = location?.state?.userData;
  const findImg = !!userIdWhantToShow
    ? StringHelpers.getProfile(userIdWhantToShow?.profile)
    : StringHelpers.getProfile(main?.userLogin?.profile);

  const handleUserVideo = async () => {
    try {

      if (!pagination.hasMore || isLoading) return;
      setIsLoading(true);
      const res = await userAttachmentList({
        userId: userIdWhantToShow?.user?.id || main?.userLogin?.user?.id,
        skip: pagination.skip,
        take: pagination.take,
      });
      setIsLoading(false);
      const { data, status } = res?.data;
      if (status === 0) {
        console.log(data);
        setMatch(data);
        setVideoLikes((prev) => ({ ...prev, ...calculateInitialLikes(data) }));
        setPagination((prev) => ({
          ...prev,
          hasMore: data.length === prev.take,
          skip: prev.skip + prev.take,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAddLike = (data: { userId: number; movieId: number }) => {
    setVideoLikes((prev) => ({
      ...prev,
      [data.movieId]: (prev[data.movieId] || 0) + 1,
    }));
  };

  const handleGetRemoveLike = (data: { userId: number; movieId: number }) => {
    setVideoLikes((prev) => ({
      ...prev,
      [data.movieId]: (prev[data.movieId] || 0) - 1,
    }));
  };

  const calculateInitialLikes = (data: any[]) => {
    const initialLikes: Record<string, number> = {};
    data.forEach((match) => {
      if (match.likeInserted && match.attachmentInserted?.movieId) {
        initialLikes[match.attachmentInserted.movieId] = match.likeInserted;
      }
      if (match.likeMatched && match.attachmentMatched?.movieId) {
        initialLikes[match.attachmentMatched.movieId] = match.likeMatched;
      }
    });
    return initialLikes;
  };

  const handleGetFollower = async () => {
    const res = await followerList(userId);
    const { data, status } = res?.data;
    console.log(data);

    if (status === 0) {
      setAllFollower(data);
    }
  };

  const handleProgress = (score: number) => {
    let percentage;
    if (score <= 100) {
      percentage = score;
    } else {
      percentage = score % 100 || 100;
    }
    return Math.min(Math.max(percentage, 1), 100);
  };

  const scrollToFirstVideo = () => {
    const firstVideo = document.querySelector(".first-video");
    if (firstVideo) {
      firstVideo.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const itsMatchingWithTimer = useMemo(() => {
    return match?.some(
      (item: any) =>
        item?.inviteInserted?.insertDate !== -1 ||
        item?.inviteMatched?.insertDate !== -1
    );
  }, [match]);

  useEffect(() => {
    if (itsMatchingWithTimer) {
      scrollToFirstVideo();
      const timer = setTimeout(scrollToFirstVideo, 300);
      return () => clearTimeout(timer);
    }
  }, [match, isLoading]);

  useEffect(() => {
    if (socket) {
      socket.on("add_liked_response", handleGetAddLike);
      socket.on("remove_liked_response", handleGetRemoveLike);
    }
    return () => {
      if (socket) {
        socket.off("add_liked_response", handleGetAddLike);
        socket.off("remove_liked_response", handleGetRemoveLike);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (userId) {
      const calculatedPercentage = handleProgress(
        userIdWhantToShow?.score || main?.userLogin?.score || 0
      );
      setPercentage(calculatedPercentage);
      handleUserVideo();
      handleGetFollower();
    }
  }, [userId, main?.userLogin?.score, userIdWhantToShow?.user?.id]);

  return (
    <>
      <section className="lg:mt-3">
        <div className="w-screen pt-3 px-5 md:w-full md:h-full ">
          <div className="mb-1 border-b-[1px] ">
            <ProfileHeader
              userImage={findImg}
              userName={
                userIdWhantToShow?.user?.userName ||
                main?.userLogin?.user?.userName
              }
              setProfileImage={setProfileImage}
              score={userIdWhantToShow?.score || main?.userLogin?.score}
              followersCount={allFollower?.length}
              followingCount={main?.allFollingList?.getMapFollowingId?.length}
              ref={imageRef}
            />
            <ProfileBio
              bio={"This is me jenifer Im am the best"}
              location={"Tehran , Iran"}
              rankPercentage={percentage}
              website={"http://te.me/jenifer159"}
            />
            <ProfileAchievements />
          </div>
        </div>
        <VideosProfile
          loadingRef={loadingRef}
          isLoading={isLoading}
          ref={videosProfileRef}
          match={match}
          videoLikes={videoLikes}
        />
        {isLoading && <Loading isLoading={isLoading ? true : false} />}
        {showEditProfile && (
          <EditProfile
            showEditProfile={showEditProfile}
            setShowEditProfile={setShowEditProfile}
          />
        )}
      </section>
    </>
  );
};

export default Profile;
