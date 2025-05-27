import React, { useCallback, useRef, useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import myRank from "../../assets/img/rank6.webp";
import goldStar from "../../assets/img/goldStar.webp";
import cupLevel from "../../assets/img/cupLevel.webp";
import cup3 from "../../assets/img/cup5.png";
import cup4 from "../../assets/img/cup3.png";
import VideosProfile from "./VideosProfile";
import asyncWrapper from "../../common/AsyncWrapper";
import { useAppSelector } from "../../hooks/hook";
import { addAttachment } from "../../services/dotNet";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Profile: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const userId = sessionStorage.getItem("userId");
  const { main } = useAppSelector((state) => state);
  const [profileImage, setProfileImage] = useState(userProfile);

  const handleImageProfileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.[0]) return;

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append(
          "attachmentId",
          userId || main?.userLogin?.userId || ""
        );
        formData.append("attachmentType", "pf");
        formData.append("attachmentName", "profile");

        const resAttachment = await addAttachment(formData);
        const { status: attachmentStatus, data: attachmentData } =
          resAttachment?.data;
        if (attachmentStatus === 0) {
          console.log("Profile image uploaded successfully", attachmentData);
        }

        return { attachmentStatus, attachmentData };
      } catch (error) {
        console.error("Error uploading profile image:", error);
        // Revert to previous image if upload fails
        setProfileImage(userProfile);
        throw error;
      }
    },
    [userId, main?.userLogin?.userId]
  );

  const handleProfile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) =>
      handleImageProfileUpload(
        e as unknown as React.ChangeEvent<HTMLInputElement>
      );
    input.click();
  };

  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid  justify-center">
          <div className="w-screen md:w-full md:h-full bg-gray-100">
            <div className="m-3 border-b-2">
              <div className=" grid grid-cols-6 relative">
                <div className="col-span-5 flex h-32">
                  <span
                    ref={imageRef}
                    onClick={handleProfile}
                    className="cursor-pointer"
                  >
                    <img
                      className="rounded-full h-24 w-24 object-cover border-2 border-green shadow-md"
                      src={profileImage}
                      alt="Profile"
                    />
                  </span>
                  <span className="absolute left-0 bottom-6">
                    <img
                      className="rounded-full w-8"
                      src={myRank}
                      alt="My Rank"
                    />
                    <div className="flex mt-1 justify-around gap-1">
                      {[1, 2, 3].map((star) => (
                        <img
                          key={star}
                          className="rounded-full shadow-lg w-4 h-4"
                          src={goldStar}
                          alt="Star"
                        />
                      ))}
                    </div>
                  </span>
                  <div className=" flex flex-col ms-2">
                    <span className="font20 font-bold">jenifer240_2</span>
                    <div className="">
                      <span className="text-lg text-gray-800">15k</span>
                      <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded text-xs ml-2">
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" items-start flex justify-end col-span-1">
                  <ModeEditIcon className="text-gray-800 font25" />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-gray-800">
                  This is me jenifer Im am the best
                </span>
              </div>
              <div className="mb-4">
                <span className="text-gray-800">Tehran , Iran</span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-dark_blue">
                  http://te.me/jenifer159
                </span>
              </div>
              <div className="flex my-2 items-center">
                <span className="flex gap-3 justify-start py-1 rounded-md">
                  {[
                    { img: cupLevel, label: "City" },
                    { img: cup3, label: "Country" },
                    { img: cup4, label: "Region" },
                  ].map((cup, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end"
                    >
                      <img
                        className="w-14"
                        src={cup.img}
                        alt={`Cup ${cup.label}`}
                      />
                      <span className="font-bold text-gray-800">
                        {cup.label}
                      </span>
                    </div>
                  ))}
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
