import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ImageRank from "../../../components/ImageRank";
import Follows from "../../../components/Fallows";

const OptionHomes = ({ result, profile, useFollow }: any) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 mx-2 gap-4 items-center">
        <div className="col-span-1">
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
        </div>
        <div className="col-span-1">
          {result ? (
            <div className="flex justify-center items-center">
              {profile.type.toLowerCase() === "success" ? (
                <>
                  <VerifiedIcon
                    className={`text-${profile.color} font-bold font25`}
                  />
                  <span className="text-green font-bold">{profile.type}</span>
                </>
              ) : (
                <>
                  <DangerousIcon className="text-red font-bold font25" />
                  <span className="text-red font-bold">{profile.type}</span>
                </>
              )}
            </div>
          ) : (
            <Follows title="Fallow" />
          )}
        </div>
        <div className="col-span-1 flex justify-end items-center">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1 text-gray-200">
              <ThumbUpOffAltIcon className="font30 font-bold text-gray-800" />
              <span className="text-gray-800">{profile.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionHomes;
