import React, { useEffect, useState } from "react";
import { topScoreList } from "../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import ImageRank from "../../components/ImageRank";
import StringHelpers from "../../utils/helpers/StringHelper";
import MainTitle from "../../components/MainTitle";
import { useAppSelector } from "../../hooks/reduxHookType";
import LoadingChild from "../../components/Loading/LoadingChild";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  users: any[];
}

const Notification: React.FC = () => {
  const main = useAppSelector((state) => state.main);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "music",
      title: "Music",
      icon: <AudiotrackIcon className="text-black text-2xl" />,
      users: [],
    },
    {
      id: "sport",
      title: "Sport",
      icon: <SportsKabaddiIcon className="text-black text-2xl" />,
      users: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetAllScore = async () => {
    setIsLoading(true);
    try {
      const res = await topScoreList();
      const { data, status } = res?.data;

      if (status === 0) {
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            users: data,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllScore();
  }, []);
  console.log(main?.lastMatch);

  return (
    <section className="w-full h-[calc(100svh-98px)] md:h-[calc(100vh-65px)]">
      <div className="flex flex-col h-full">
        <header className="">
          <MainTitle title="News" />
          <div className="m-2 bg-white p-4 rounded-xl">
            <span className="flex items-center justify-start">Last match:</span>
            <div className="flex justify-center mb-10">
              <ImageRank
                iconClass="font60 text-gray-200"
                imgSize={60}
                imgSrc={StringHelpers.getProfile(
                  main?.lastMatch?.profileInserted
                )}
                score={main?.lastMatch?.scoreInserted}
              />
              <div className="flex items-center mx-5 font-bold ">
                <span className="text-white border-2 rounded-xl px-2 border-red bg-red">
                  Loss
                </span>
              </div>
              <ImageRank
                iconClass="font60 text-gray-200"
                imgSize={60}
                imgSrc={StringHelpers.getProfile(
                  main?.lastMatch?.profileMatched
                )}
                score={main?.lastMatch?.scoreMatched}
              />
            </div>
            <p className="font-bold flex text-center justify-center">
              “Winning isn’t everything, but the courage to try and the strength
              to persevere are what truly define success.”
            </p>
          </div>
        </header>
        <MainTitle title="Top score" />
        <div className="flex-1 overflow-y-auto px-1 py-6">
          {categories?.map((category) => (
            <div key={category.id} className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-gray-200 p-2 px-3 rounded-full mr-3">
                  {category.icon}
                </div>
                <h2 className="font-bold">{category.title}</h2>
              </div>
              <div className="relative h-40">
                <div className="absolute inset-0 overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-4 mx-3 items-center">
                    {category?.users?.map((userTop) => {
                      console.log(userTop);
                      const userInfo = {
                        userProfile: userTop?.profile,
                        user: {
                          userName: userTop?.userName,
                          id: userTop?.userId,
                        },
                        score: userTop?.score,
                      };
                      return (
                        <div
                          key={`${category.id}-${userTop.id}`}
                          className="flex-shrink-0 w-24 text-center"
                        >
                          <ImageRank
                            userInfo={userInfo}
                            imgSize={85}
                            score={userTop.score}
                            imgSrc={StringHelpers.getProfile(userTop?.profile)}
                          />
                          <p className="text-sm mt-2 text-gray-600 truncate">
                            {userTop.userName}
                          </p>
                          <span className="text-xs text-gray-400">
                            {userTop.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <LoadingChild isLoading={isLoading} />}
        </div>
      </div>
    </section>
  );
};

export default Notification;
