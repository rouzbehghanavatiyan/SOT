import React from "react";
import StringHelpers from "../../utils/helpers/StringHelper";
import { Icon } from "../../components/Icon";

const VideoGroup: React.FC<{
  group: any;
  index: number;
  iconFiltered: string;
  onClick: (item: any) => void;
}> = ({ group, index, onClick, iconFiltered }) => {
  const { parent, child } = group;
  const fixImg1 = StringHelpers.getProfile(group?.attachmentInserted);
  const fixImg2 = StringHelpers.getProfile(group?.attachmentMatched);

  return (
    <div
      key={index}
      onClick={() => onClick({ group, index })}
      className="flex-1 relative flex  flex-col col-span-1 row-span-1"
    >
      {iconFiltered && (
        <span className="text-white z-40 absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full border-white">
          <Icon name={iconFiltered} className="font20 m-1" />
        </span>
      )}
      <div className="flex-1">
        <span className=" relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
          <img
            src={fixImg1}
            alt={parent?.alt || "Parent Image"}
            className="w-full rounded-tr-lg min-h-44 max-h-44 object-cover"
          />
        </span>
      </div>
      <div className="flex-1 bg-white">
        <div className="flex-1">
          <figure className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
            <img
              src={fixImg2}
              alt={child?.alt || "Profile image"}
              className="w-full rounded-bl-xl  min-h-44 max-h-44 object-cover"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default VideoGroup;
