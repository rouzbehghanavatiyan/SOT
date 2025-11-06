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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MainTitle from "../../components/MainTitle";
import { Icon } from "../../components/Icon";

interface PropsTyles {
  handleGetAllMatch: any;
  skills?: [{ id: number; name: string }];
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

  const handleIconClick = (id: number) => {
    if (selectFiltered === id) {
      return;
    }

    console.log("handleIconClick", id);
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
    <>
      <MainTitle title="Filtered" />
      <div className="flex flex-row flex-wrap gap-4 px-2 pt-3 bg-white mb-2 max-w-full">
        {skills?.map((item: any) => {
          const isSelected = selectFiltered === item.id;
          if (item?.id === 0) {
            return (
              <div key={item.id} className="grid grid-flow-row">
                <span
                  className={`rounded-full p-6 border-2 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-gray-150"
                      : "border-gray-200"
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
              <div key={item.id} className="grid  grid-flow-row">
                <span
                  className={`rounded-full border-2 flex-shrink-0 cursor-pointer ${
                    isSelected ? "border-primary" : "border-gray-200"
                  }`}
                  onClick={() => handleIconClick(item.id)}
                >
                  {item?.icon && (
                    <Icon
                      name={item?.icon}
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
    </>
  );
};
export default Filtered;
