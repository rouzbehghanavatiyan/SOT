import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import myRank from "../../assets/img/gold1.jpg";
import goldStar from "../../assets/img/goldStar.webp";
import cupLevel from "../../assets/img/cupLevel.webp";
import cup3 from "../../assets/img/cup5.png";
import cup4 from "../../assets/img/cup3.png";
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
            <div className="px-3  m-2 grid grid-cols-3 border-b-2">
              <div className="col-span-2 relative  right-2 rounded-full p-1">
                <div className="flex h-32">
                  <img className="  rounded-full h-24 w-24" src={userProfile} />
                  <span className="absolute  left-0 bottom-4 ">
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
                  <div className="flex flex-col ms-2">
                    <span className="font20 font-bold"> jenifer240_2 </span>
                    <div className="">
                      <span className="text-lg"> 15k </span>
                      <span className="bg-gray-200 py-1 px-2 rounded-md">
                        Fallower
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex col-span-1  flex-col m-2 ">
                <span className=" gap-2 px-2 py-1 flex rounded-md">
                  <img className="halo w-8" src={cupLevel} />
                  <img className="w-8" src={cup3} />
                  <img className="w-8" src={cup4} />
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
