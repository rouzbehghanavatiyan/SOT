import React, { FC } from "react";
import Loading from "../../components/Loading";
import { TalentModeProps } from "./softLinkType";
import { Icon } from "../../components/Icon";

const SoftLink: FC<TalentModeProps> = ({
  categories = [],
  handleAcceptCategory = () => {},
  isLoading = false,
  containerClass = " w-screen md:w-[500px] md:h-full",
  itemClass = " rounded-lg md:min-w-52 m-1 flex justify-start items-center text-primary cursor-pointer",
  textClass = "py-2",
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <div className="grid justify-start min-h-[76vh]">
        <div className={containerClass}>
          {categories.map((category) => (
            <span
              key={category.id}
              onClick={() => handleAcceptCategory(category)}
              className={` ${itemClass}`}
            >
              <div className="min-w-8 flex justify-center mx-3">
                {category.icon && (
                  <Icon name={category.icon} className="font25" />
                )}
              </div>
              <span className={textClass}>
                {category.label || category.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SoftLink;
