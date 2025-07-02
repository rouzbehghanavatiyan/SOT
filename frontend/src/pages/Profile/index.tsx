import React, { useCallback, useEffect, useRef, useState } from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import userProfile from "../../assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg";
import cupLevel from "../../assets/img/cupLevel.webp";
import cup3 from "../../assets/img/cup5.png";
import cup4 from "../../assets/img/cup3.png";
import VideosProfile from "./VideosProfile";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  addAttachment,
  followerList,
  profileAttachmentList,
  userAttachmentList,
} from "../../services/dotNet";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditImage from "../../components/EditImage";
import { RsetGetImageProfile } from "../../common/Slices/main";
import ImageRank from "../../components/ImageRank";
import EditProfile from "./EditProfile";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const userId = sessionStorage.getItem("userId");
  const { main } = useAppSelector((state) => state);
  const [match, setMatch] = useState<any>([]);

  const [profileImage, setProfileImage] = useState(userProfile);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);

  const [editingImage, setEditingImage] = useState(false);
  const [allFollower, setAllFollower] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useAppDispatch();
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  const uploadProfileImage = useCallback(
    async (croppedImage: string) => {
      setProfileImage(croppedImage);
      setEditingImage(false);

      try {
        const base64Data = croppedImage.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const file = new File([byteArray], "profile.jpg", {
          type: "image/jpeg",
        });

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
          const resProfileAttachmentList = await profileAttachmentList(userId);
          const { status, data } = resProfileAttachmentList?.data;
          if (status === 0) {
            dispatch(RsetGetImageProfile(data));
          }
        }
        return { attachmentStatus, attachmentData };
      } catch (error) {
        console.error("Error uploading profile image:", error);
        setProfileImage(userProfile);
        throw error;
      }
    },
    [userId, main?.userLogin?.userId]
  );

  const handleImageProfileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.[0]) return;

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const imageData = e.target.result as string;
          setProfileImage(imageData);
          setSelectedImage(imageData);
          setEditingImage(true);
        }
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleProfile = () => {
    const input: any = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageProfileUpload;
    input.click();
  };

  const handleUserVideo = async () => {
    try {
      const res = await userAttachmentList(main?.userLogin?.userId);
      const { data, status } = res?.data;
      if (status === 0) {
        setMatch(data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!main?.userLogin?.userId) handleUserVideo();
  }, [main?.userLogin?.userId]);

  return (
    <>
      {editingImage && (
        <EditImage
          src={selectedImage}
          onCropComplete={uploadProfileImage}
          onCancel={() => setEditingImage(false)}
          circularCrop={true}
        />
      )}
      <ResponsiveMaker hiddenWidth={975}>
        <section className="mt-2 grid justify-center ">
          <div className="w-screen p-3 md:w-full md:h-full bg-gray-100">
            <div className="mb-1 border-b-[1px] ">
              <div className="grid grid-cols-6 relative ">
                <div className="col-span-5 flex h-32">
                  <span
                    ref={imageRef}
                    onClick={handleProfile}
                    className="cursor-pointer"
                  >
                    <ImageRank
                      imgSrc={findImg}
                      imgSize={100}
                      score={0}
                      rankStyle="w-14 h-14 d-none"
                      iconProfileStyle="font100 rounded-full text-gray-800"
                      classUserName="text-gray-800 font-bold"
                      className="rounded-full object-cover border-2 shadow-md"
                    />
                  </span>
                  <div className="flex flex-col ms-2">
                    <span className="font20 font-bold">
                      {main?.userLogin?.userName}
                    </span>
                    <div className="m-2">
                      <Link to={"/followers"}>
                        <span className="bg-gray-800 text-white py-1 px-2 rounded text-xs ml-2">
                          Followers
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="items-start flex justify-end  col-span-1">
                  <ModeEditIcon
                    onClick={() => {
                      setShowEditProfile(true);
                    }}
                    className="text-gray-800 font25"
                  />
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
          <VideosProfile match={match} />
          {showEditProfile && (
            <EditProfile
              showEditProfile={showEditProfile}
              setShowEditProfile={setShowEditProfile}
            />
          )}
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Profile;
