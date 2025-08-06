import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { topScoreList } from "../../services/dotNet";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import ImageRank from "../../components/ImageRank";
import StringHelpers from "../../utils/helpers/StringHelper";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  users: any[];
}

const Notification: React.FC = () => {
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

  return (
    <div className="fixed inset-0 flex flex-col bg-white px-2">
      <h1 className="text-2xl font-bold mb-6">News</h1>
      <div className="flex-1">
        {categories.map((category) => (
          <div key={category.id} className="">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                {category.icon}
              </div>
              <h2 className="font-bold">{category.title}</h2>
            </div>
            <div className="relative h-40">
              <div className="absolute inset-0 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 mx-3 items-center">
                  {category.users.map((userTop) => (
                    <div
                      key={`${category.id}-${userTop.id}`}
                      className="flex-shrink-0 w-24 text-center"
                    >
                      <ImageRank
                        imgSize={85}
                        score={userTop.score}
                        imgSrc={StringHelpers.getProfile(userTop?.profile)}
                      />
                      <p className="text-sm text-gray-600 truncate">
                        {userTop.message}
                      </p>
                      <span className="text-xs text-gray-400">
                        {userTop.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
};

export default Notification;
{
  /* <span className="font-bold text-gray-200 px-4">All</span>
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <SportsKabaddiIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <PrecisionManufacturingIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <OutdoorGrillIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <LocalSeeIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <ArchitectureIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <SportsEsportsIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <InsertEmoticonIcon className="my-3 mx-3 text-gray-200  font25" />
            </span>
            <span className="rounded-full border-2  flex-shrink-0">
              <ColorLensIcon className="my-3 mx-3 text-gray-200  font25" /> */
}
