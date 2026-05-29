import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHookType";
import { setPaginationWatch } from "../../common/Slices/main";
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
      }),
    );
    handleGetAllMatch(id);
  };

  return (
    <>
      <MainTitle title="Filtered " />
      <div className="flex flex-row flex-wrap gap-4 px-2 pt-3 bg-white mb-2 max-w-full">
        {skills?.map((item: any) => {
          const isSelected = selectFiltered === item.id;
          return (
            <div key={item.id} className="grid justify-items-center gap-1">
              <span
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all
      ${isSelected ? "border-primary bg-gray-150" : "border-gray-200"}
    `}
                onClick={() => handleIconClick(item.id)}
              >
                {item?.icon && (
                  <Icon
                    name={item?.icon}
                    className={`font20 ${
                      isSelected ? "text-primary" : "text-gray-600"
                    }`}
                  />
                )}
              </span>

              <span
                className={`font11 font-thin ${
                  isSelected ? "text-primary" : "text-gray-600"
                }`}
              >
                {item?.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Filtered;
