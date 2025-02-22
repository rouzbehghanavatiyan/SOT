import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ImageRank from "../../../components/ImageRank";

const OptionHomes = ({ result, profile, useFollow }: any) => {
  return (
    <div className="w-full bg_profile ">
      <div className="grid grid-cols-3  items-center justify-between m-2">
        <span className="col-span-1">
          <ImageRank
            imgSrc={profile?.img}
            profileName="jackffffffffffffffffffff"
            profileFontColor="black"
            type={profile?.rank}
            level={2}
            rankWidth={45}
            starWidth={6}
            className="absolute bottom-0"
          />
        </span>

        {result ? (
          <div className="top-2 left-36 w-36 flex justify-center items-center">
            {profile.type.toLowerCase() === "success" ? (
              <>
                <VerifiedIcon
                  className={`flex items-center text-${profile.color} font-bold font35`}
                />
                <span className="text-green font18 font-bold">
                  {profile.type}
                </span>
              </>
            ) : (
              <>
                <DangerousIcon className="flex items-center text-red font-bold font35" />
                <span className="text-red font18 font-bold">
                  {profile.type}
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="top-2 left-36  w-36 flex justify-center items-center">
            <span className="p-1 flex px-3 bg-gray-100 justify-center text-dark border cursor-pointer">
              Follow
            </span>
          </div>
        )}

        <div className="flex  justify-end items-center col-span-1">
          <div className="gap-4 items-center">
            <div className="flex  items-center gap-1 text-gray-200">
              <ThumbUpOffAltIcon className="font35 font-bold text-gray-800" />
              <span className="text-gray-800">{profile.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionHomes;
