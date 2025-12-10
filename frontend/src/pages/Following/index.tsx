import React, { useEffect, useState } from "react";
import {
  addFollower,
  followerList,
  followingList,
  removeFollower,
} from "../../services/dotNet";
import { redirect, useLocation } from "react-router-dom";
import ImageRank from "../../components/ImageRank";
import Loading from "../../components/Loading";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import MainTitle from "../../components/MainTitle";
import Follows from "../../components/Fallows";
import {
  RsetAllFollingList,
} from "../../common/Slices/main";

const Following = () => {
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const main = useAppSelector((state) => state.main);
  const [isLoading, setIsLoading] = useState(false);
  const userIdLogin = main?.userLogin?.user?.id;
  const location = useLocation();
  const [localIsFollowed, setLocalIsFollowed] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const dispatch = useAppDispatch();
  const userIdFromLocation = location.state?.userInfo?.id;

  const handleFallowClick = async (video: any, position: number) => {
    if (isLoadingFollow) return; 
    const userIdFollow =
      position === 0 ? video?.userInserted?.id : video?.userMatched?.id;
    const postData = {
      userId: userIdLogin || null,
      followerId: userIdFollow || null,
    };

    const newFollowStatus = !localIsFollowed;

    try {
      setIsLoadingFollow(true);

      // اول API را صدا بزن
      if (localIsFollowed) {
        await removeFollower(postData);
        console.log("Unfollow successful");
      } else {
        await addFollower(postData);
        console.log("Follow successful");
      }

      setLocalIsFollowed(newFollowStatus);
      
    } catch (error) {
      console.error("Error in follow operation:", error);
      setLocalIsFollowed(localIsFollowed);
      
    } finally {
      setIsLoadingFollow(false);
    }
  };

  const handleAllFollowing = async () => {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFF");

    try {
      const targetUserId = userIdFromLocation || main?.userLogin?.user?.id;
      if (!targetUserId) return;

      const res = await followingList(targetUserId);
      const { status, data } = res?.data;

      if (status === 0) {
        const followingIds = data?.map(
          (item: any) => item?.attachment?.attachmentId
        );
        dispatch(
          RsetAllFollingList({
            getMapFollowingId: followingIds,
            allFollowing: data,
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch following list:", error);
    }
  };

  useEffect(() => {
    handleAllFollowing();
  }, []);

  return (
    <div className="w-full">
      {isLoading && <Loading isLoading={isLoading} />}
      <MainTitle title="Following" />
      {!isLoading && !!main?.allFollingList?.allFollowing?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              There are no following.
            </h3>
          </div>
        </div>
      )}
      {main?.allFollingList?.allFollowing?.map((follower: any) => {
        const image = StringHelpers.getProfile(follower?.attachment);
        return (
          <section className="mt-1">
            <div className="w-full bg-gray-100 border-b-[1px] border-white py-3 px-4 sticky flex justify-between top-0 z-10">
              <ImageRank
                score={0}
                imgSize={60}
                userName={follower?.userName || "Unknown User"}
                imgSrc={image || "default-profile-image.png"}
              />
              <div className="flex col-span-3 justify-center">
                <Follows
                  bgColor="text-gray-800"
                  title={"Unfollow"}
                  onFollowClick={() => handleFallowClick()}
                  // isLoading={isLoadingFollow}
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Following;
