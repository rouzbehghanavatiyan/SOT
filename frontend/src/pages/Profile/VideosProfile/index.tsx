import React, { useState } from "react";
import Video from "../../../components/Video";
import ImageRank from "../../../components/ImageRank";

const VideosProfile: React.FC<any> = ({ match }) => {
  const [expandedVideo, setExpandedVideo] = useState(null);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleVideoPlay = (videoId: string) => {
    setPlayingId((prevId) => {
      if (prevId === videoId) {
        return null;
      }
      return videoId;
    });
  };

  return (
    <div className="col-span-12 justify-center flex md:col-span-12 lg:col-span-12">
      <div className="grid grid-cols-1 gap-2 w-full">
        {match.map((video: any, index: number) => {
          const videoUrl1 = `${baseURL}/${video?.attachmentInserted?.attachmentType}/${video?.attachmentInserted?.fileName}${video?.attachmentInserted?.ext}`;
          const videoUrl2 = `${baseURL}/${video?.attachmentMatched?.attachmentType}/${video?.attachmentMatched?.fileName}${video?.attachmentMatched?.ext}`;
          const fixProfileImageParent = `${baseURL}/${video?.profileInserted?.attachmentType}/${video?.profileInserted?.fileName}${video?.profileInserted?.ext}`;
          const fixProfileImageChild = `${baseURL}/${video?.profileMatched?.attachmentType}/${video?.profileMatched?.fileName}${video?.profileMatched?.ext}`;

          return (
            <section key={index} className="w-full">
              <div
                className="relative w-full bg-black"
                style={{
                  height: "calc(100vh - 100px)", // ارتفاع دلخواه
                  minHeight: "500px", // حداقل ارتفاع
                  maxHeight: "800px", // حداکثر ارتفاع
                }}
              >
                <div className="flex flex-col h-full">
                  {/* ویدیوی بالایی */}
                  <div className="flex-1 relative h-1/2">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex bg_profile_watch absolute w-full top-0 justify-between items-center p-2 bg-red z-10">
                        <ImageRank
                          classUserName="text-white font-bold"
                          iconProfileStyle="font50"
                          userName={video?.userInserted?.userName}
                          imgSize={50}
                          imgSrc={fixProfileImageParent}
                          rankWidth={40}
                          starWidth={5}
                        />
                      </div>
                      <div className="flex-1">
                        <Video
                          url={videoUrl1}
                          playing={playingId === `${index}-top`}
                          loop={true}
                          muted={false}
                          handleVideo={() => handleVideoPlay(`${index}-top`)}
                          width="100%"
                          height="100%"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ویدیوی پایینی */}
                  <div className="flex-1 relative h-1/2">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex bg_profile_watch absolute w-full top-0 justify-between items-center p-2 bg-red z-10">
                        <ImageRank
                          userName={video?.userMatched?.userName}
                          classUserName="text-white font-bold"
                          imgSize={50}
                          imgSrc={fixProfileImageChild}
                          rankWidth={40}
                          starWidth={5}
                        />
                      </div>
                      <div className="flex-1">
                        <Video
                          url={videoUrl2}
                          playing={playingId === `${index}-bottom`}
                          loop={true}
                          muted={false}
                          className="absolute inset-0 w-full h-full object-cover"
                          handleVideo={() => handleVideoPlay(`${index}-bottom`)}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default VideosProfile;
