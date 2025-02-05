import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import myRank from "../../assets/img/rank6.webp";
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
            <div className="px-3  m-2 border-b-2">
              <div className="col-span-3 relative right-2 p-1">
                <div className="flex h-32">
                  <img className="  rounded-full h-24 w-24" src={userProfile} />
                  <span className="absolute  left-0 bottom-6 ">
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
                  <div className="flex  flex-col ms-2">
                    <span className="font20 font-bold"> jenifer240_2 </span>
                    <div className="">
                      <span className="text-lg text-gray-800"> 15k </span>
                      <span className="bg-gray-200 text-white py-1 px-2 ">
                        Fallower
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex my-2 items-center">
                <span className="flex gap-3 justify-start py-1 rounded-md">
                  <div className="  flex flex-col items-center justify-end">
                    <img className="w-14" src={cupLevel} alt="Cup City" />
                    <span className="font-bold text-gray-800">City</span>
                  </div>
                  <div className="  flex flex-col items-center justify-end">
                    <img className="w-14" src={cup3} alt="Cup Country" />
                    <span className="font-bold text-gray-800">Country</span>
                  </div>

                  <div className="flex flex-col items-center justify-end">
                    <img className="w-14" src={cup4} alt="Cup Region" />
                    <span className="font-bold text-gray-800">Region</span>
                  </div>
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
