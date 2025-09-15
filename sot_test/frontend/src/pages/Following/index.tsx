import React, { useEffect, useState } from "react";
import { followerList } from "../../services/dotNet";
import { redirect } from "react-router-dom";
import ImageRank from "../../components/ImageRank";
import Loading from "../../components/Loading";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppSelector } from "../../hooks/reduxHookType";

const Following = () => {
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const main = useAppSelector((state) => state.main);
  const [isLoading, setIsLoading] = useState(false);

  //   const handleAllFollowing = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await followerList(userId);
  //       console.log(res);
  //       const { status, data } = res?.data;
  //       if (status === 0) {
  //         setIsLoading(false);
  //         redirect("/following");
  //         setAllFollower(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     handleAllFollowing();
  //   }, []);

  return (
    <div>
      {isLoading && <Loading isLoading={isLoading} />}

      {main?.allFollingList?.allFollowing?.map((follower: any, index) => {
        console.log(follower);
        const image = StringHelpers.getProfile(follower?.attachment);

        return (
          <div className="w-full bg-gray-100 border-b-[1px] border-white py-3 px-4 sticky top-0 z-10">
            <ImageRank
              score={0}
              imgSize={60}
              userName={follower?.userName || "Unknown User"}
              imgSrc={image || "default-profile-image.png"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Following;
