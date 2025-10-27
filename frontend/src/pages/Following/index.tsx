import React, { useEffect, useState } from "react";
import { followerList } from "../../services/dotNet";
import { redirect } from "react-router-dom";
import ImageRank from "../../components/ImageRank";
import Loading from "../../components/Loading";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppSelector } from "../../hooks/reduxHookType";
import MainTitle from "../../components/MainTitle";

const Following = () => {
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const main = useAppSelector((state) => state.main);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && <Loading isLoading={isLoading} />}
      <MainTitle title="Following" />
      {!isLoading && main?.allFollingList?.allFollowing.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              There are no following.
            </h3>
          </div>
        </div>
      )}
      {main?.allFollingList?.allFollowing?.map((follower: any) => {
        console.log(follower);
        const image = StringHelpers.getProfile(follower?.attachment);
        return (
          <section className="mt-1">
            <div className="w-full bg-gray-100 border-b-[1px] border-white py-3 px-4 sticky top-0 z-10">
              <ImageRank
                score={0}
                imgSize={60}
                userName={follower?.userName || "Unknown User"}
                imgSrc={image || "default-profile-image.png"}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Following;
