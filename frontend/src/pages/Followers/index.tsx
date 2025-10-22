import React, { useEffect, useState } from "react";
import { followerList } from "../../services/dotNet";
import { redirect } from "react-router-dom";
import ImageRank from "../../components/ImageRank";
import Loading from "../../components/Loading";
import StringHelpers from "../../utils/helpers/StringHelper";
import { useAppSelector } from "../../hooks/reduxHookType";
import MainTitle from "../../components/MainTitle";

const Followers: React.FC<any> = () => {
  const main = useAppSelector((state) => state.main);
  const userId = main?.userLogin?.user?.id;
  const [allFollower, setAllFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAllFollower = async () => {
    try {
      setIsLoading(true);
      const res = await followerList(userId);
      console.log(res);
      const { status, data } = res?.data;
      if (status === 0) {
        setIsLoading(false);
        redirect("/followers");
        setAllFollower(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAllFollower();
  }, []);

  return (
    <div>
      {isLoading && <Loading isLoading={isLoading} />}
      <MainTitle title="Follower" />
      {allFollower?.map((follower: any) => {
        const image = StringHelpers.getProfile(follower?.attachment);
        return (
          <section className="mt-1">
            <div className="w-full bg-gray-100 border-b-[1px] border-gray-150 py-2 px-4 sticky top-0 z-10">
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

export default Followers;
