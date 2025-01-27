import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import myRank from "../../assets/img/gold1.jpg";
import goldStar from "../../assets/img/goldStar.webp";
import cup from "../../assets/img/cupLevel.webp";
import VideosProfile from "./VideosProfile";

const Profile: React.FC = () => {
  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid  justify-center">
          <div className="w-screen md:w-full md:h-full bg-gray-100">
            <span className="border-b-2 font-bold text-2xl flex  justify-center">
              Profile
            </span>
            <div className="px-3 m-2 flex border-b-2">
              <div className="right-2 rounded-full p-1">
                <div className="relative h-32">
                  <img className="rounded-full  w-24" src={userProfile} />
                  <span className="absolute left-0 bottom-2 ">
                    <img
                      className="rounded-full  w-8"
                      src={myRank}
                      alt="My Rank"
                    />
                    <div className="flex mt-1 justify-around gap-1">
                      <img
                        className="rounded-full shadow-lg"
                        width={6}
                        height={6}
                        src={goldStar}
                        alt="My Rank"
                      />
                      <img
                        className="rounded-full shadow-lg"
                        width={6}
                        height={6}
                        src={goldStar}
                        alt="My Rank"
                      />
                      <img
                        className="rounded-full shadow-lg"
                        width={8}
                        height={8}
                        src={goldStar}
                        alt="My Rank"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex flex-col m-2 ">
                <span className="font20 font-bold"> jenifer240_2 </span>
                <div className="">
                  <span className="text-lg"> 15k </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-md">
                    Fallower
                  </span>
                </div>
                <span className=" px-2 py-1 rounded-md">
                  <img className="w-8" src={cup} />
                </span>
              </div>
            </div>
          </div>
          <VideosProfile />
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Profile;
