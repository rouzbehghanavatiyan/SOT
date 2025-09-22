import React, { useState } from "react";

import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useAppDispatch } from "../../hooks/reduxHookType";
import { setPaginationWatch } from "../../common/Slices/main";

interface PropsTyles {
  handleGetAllMatch: any;
  skills: { id: number; name: string };
  selectFiltered: number | null;
  setSelectFiltered: React.Dispatch<React.SetStateAction<number | null>>;
}

const Filtered: React.FC<PropsTyles> = ({
  skills,
  handleGetAllMatch,
  selectFiltered,
  setSelectFiltered,
}) => {
  const dispatch = useAppDispatch();

  const iconsMap: { [key: number]: React.ComponentType } = {
    1: AudiotrackIcon,
    2: SportsKabaddiIcon,
    3: PrecisionManufacturingIcon,
    4: OutdoorGrillIcon,
    5: SportsEsportsIcon,
    6: LocalSeeIcon,
    7: ArchitectureIcon,
    8: InsertEmoticonIcon,
    9: ColorLensIcon,
    10: ColorLensIcon,
    11: ColorLensIcon,
    12: ColorLensIcon,
    13: ColorLensIcon,
  };

  const handleIconClick = (id: number) => {
    setSelectFiltered(id);
    dispatch(
      setPaginationWatch({
        take: 6,
        skip: 0,
        hasMore: true,
      })
    );
    handleGetAllMatch(id);
  };

  return (
    <div className="scrollable-container md:mt-12 flex gap-4 px-2 pt-3 pb-2 bg-white whitespace-nowrap">
      {skills?.map((item: any) => {
        const IconComponent = iconsMap[item.id] || null;
        const isSelected = selectFiltered === item.id;
        if (item?.id === 0) {
          return (
            <div key={item.id} className="grid grid-flow-row">
              <span
                className={`rounded-full p-6 border-2 flex-shrink-0 cursor-pointer ${
                  isSelected ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => handleIconClick(item.id)}
              />
              <span
                className={`flex font10 font-bold justify-center ${
                  isSelected ? "text-primary" : "text-gray-200"
                }`}
              >
                {item?.name}
              </span>
            </div>
          );
        } else {
          return (
            <div key={item.id} className="grid grid-flow-row">
              <span
                className={`rounded-full border-2 flex-shrink-0 cursor-pointer ${
                  isSelected ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => handleIconClick(item.id)}
              >
                {IconComponent && (
                  <IconComponent
                    className={`my-3 mx-3 font25 ${
                      isSelected ? "text-primary" : "text-gray-200"
                    }`}
                  />
                )}
              </span>
              <span
                className={`flex font10 font-bold justify-center ${
                  isSelected ? "text-primary" : "text-gray-200"
                }`}
              >
                {item?.name}
              </span>
            </div>
          );
        }
      })}
    </div>
  );
};
export default Filtered;
