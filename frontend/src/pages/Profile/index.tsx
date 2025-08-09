import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import cupLevel from "../../assets/img/cupLevel.webp";
import cup3 from "../../assets/img/cup5.png";
import cup4 from "../../assets/img/cup3.png";
import VideosProfile from "./VideosProfile";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  addAttachment,
  followerList,
  profileAttachment,
  userAttachmentList,
} from "../../services/dotNet";
import EditImage from "../../components/EditImage";
import { RsetGetImageProfile } from "../../common/Slices/main";
import ImageRank from "../../components/ImageRank";
import EditProfile from "./EditProfile";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import StringHelpers from "../../utils/helpers/StringHelper";
import Loading from "../../components/Loading";

const Profile: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const main = useAppSelector((state) => state?.main);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const socket = main.socketConfig;
  const userId = main?.userLogin?.user?.id;
  const [match, setMatch] = useState<any>([]);
  const [allFollower, setAllFollower] = useState<any>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [profileImage, setProfileImage] = useState(userProfile);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({});
  const videosProfileRef = useRef<HTMLDivElement | null>(null);
  const userIdWhantToShow = location?.state?.userData;
  const findImg = !!userIdWhantToShow
    ? StringHelpers.getProfile(userIdWhantToShow?.profile)
    : StringHelpers.getProfile(main?.userLogin?.profile);

  const uploadProfileImage = useCallback(
    async (croppedImage: string) => {
      setProfileImage(croppedImage);
      setEditingImage(false);
      try {
        const base64Data = croppedImage.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new File([byteArray], "profile.jpg", {
          type: "image/jpeg",
        });

        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("attachmentId", userId);
        formData.append("attachmentType", "pf");
        formData.append("attachmentName", "profile");
        const resAttachment = await addAttachment(formData);
        const { status: attachmentStatus, data: attachmentData } =
          resAttachment?.data;
        if (attachmentStatus === 0) {
          const resProfileAttachment = await profileAttachment(userId);
          const { status, data } = resProfileAttachment?.data;
          if (status === 0) {
            dispatch(RsetGetImageProfile(data));
          }
        }
        return { attachmentStatus, attachmentData };
      } catch (error) {
        console.error("Error uploading profile image:", error);
        setProfileImage(userProfile);
        throw error;
      }
    },
    [userId, main?.userLogin?.user?.id]
  );

  const handleImageProfileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.[0]) return;

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const imageData = e.target.result as string;
          setProfileImage(imageData);
          setSelectedImage(imageData);
          setEditingImage(true);
        }
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleProfile = () => {
    const input: any = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageProfileUpload;
    input.click();
  };

  const handleUserVideo = async () => {
    try {
      setIsLoading(true);
      const res = await userAttachmentList(
        userIdWhantToShow?.user?.id || main?.userLogin?.user?.id
      );
      setIsLoading(false);
      const { data, status } = res?.data;
      if (status === 0) {
        setMatch(data);
        setVideoLikes((prev) => ({ ...prev, ...calculateInitialLikes(data) }));
      }
      console.log(res);
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
      {editingImage && (
        <EditImage
          src={selectedImage}
          onCropComplete={uploadProfileImage}
          onCancel={() => setEditingImage(false)}
          circularCrop={true}
        />
      )}
      <ResponsiveMaker hiddenWidth={1024}>
        <section className="grid justify-center ">
          <div className="w-screen pt-3 px-5 md:w-full md:h-full ">
            <div className="mb-1 border-b-[1px] ">
              <div className="grid grid-cols-6 mt-1  relative ">
                <div className="col-span-5  flex h-32">
                  <span
                    ref={imageRef}
                    onClick={handleProfile}
                    className="cursor-pointer"
                  >
                    <ImageRank
                      imgSrc={findImg}
                      imgSize={100}
                      score={main?.userLogin?.score}
                    />
                  </span>
                  <div className="flex flex-col gap-2 ms-2">
                    <span className="font20 font-bold">
                      {userIdWhantToShow?.user?.userName ||
                        main?.userLogin?.user?.userName}
                    </span>
                    {!userIdWhantToShow && (
                      <div className="flex">
                        <div className="mx-2 bg-gray-150 py-1 px-2 rounded-2xl">
                          <Link to={"/followers"}>
                            <span className="font-bold text-gray-800">
                              {allFollower?.length}
                            </span>
                            <span className="font-bold text-gray-800 py-1 rounded text-xs ml-1">
                              Followers
                            </span>
                          </Link>
                        </div>
                        <div className="mx-2 bg-gray-150 py-1 px-2 rounded-2xl">
                          <Link to={"/following"}>
                            <span className="font-bold text-gray-800">
                              {main?.allFollingList?.getMapFollowingId?.length}
                            </span>
                            <span className="font-bold text-gray-800 py-1 rounded text-xs ml-1">
                              Following
                            </span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mb-5">
                <div className="font-bold mb-2 text-gray-800">Rank score</div>
                <div className="w-full relative h-4 bg-gray-200 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold font10 text-white text-xs z-10">
                      <span className="font10  me-1">{percentage}</span>
                      <span className="font10">%</span>
                    </span>
                  </div>
                  <ProgressBar percentage={percentage} />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-gray-800">
                  This is me jenifer Im am the best
                </span>
              </div>
              <div className="mb-4">
                <span className="text-gray-800">Tehran , Iran</span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-dark_blue">
                  http://te.me/jenifer159
                </span>
              </div>
              <div className="flex my-2 items-center">
                <span className="flex gap-3 justify-start py-1 rounded-md">
                  {[
                    { img: cupLevel, label: "City" },
                    { img: cup3, label: "Country" },
                    { img: cup4, label: "Region" },
                  ].map((cup, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end"
                    >
                      <img
                        className="w-14"
                        src={cup.img}
                        alt={`Cup ${cup.label}`}
                      />
                      <span className="font-bold text-gray-800">
                        {cup.label}
                      </span>
                    </div>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <VideosProfile
            isLoading={isLoading}
            videosProfileRef={videosProfileRef}
            match={match}
            videoLikes={videoLikes}
            setVideoLikes={setVideoLikes}
          />
          {isLoading && <Loading isLoading={isLoading ? true : false} />}
          {showEditProfile && (
            <EditProfile
              showEditProfile={showEditProfile}
              setShowEditProfile={setShowEditProfile}
            />
          )}
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Profile;
