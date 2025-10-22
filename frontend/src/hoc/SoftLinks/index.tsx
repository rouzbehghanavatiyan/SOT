import React, { FC } from "react";
import Loading from "../../components/Loading";
import PersonIcon from "@mui/icons-material/Person";

interface Category {
  id: string | number;
  name: string;
  icon?: string;
  label?: string;
}

interface TalentModeProps {
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    label?: string;
  }>;
  isLoading?: boolean;
  defaultIcon?: JSX.Element;
  containerClass?: string;
  itemClass?: string;
  iconClass?: string;
  textClass?: string;
  handleAcceptCategory?: (data: Category) => void;
  iconMap?: Record<string, JSX.Element>;
}

const SoftLink: FC<TalentModeProps> = ({
  iconMap = {},
  categories = [],

  handleAcceptCategory = () => {},
  isLoading = false,
  defaultIcon = <PersonIcon className="font25 mx-3" />,
  containerClass = " w-screen md:w-[500px] md:h-full",
  itemClass = " rounded-lg md:min-w-52 m-1 flex justify-start items-center text-primary cursor-pointer",
  textClass = "py-2",
}) => {
  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <div className="grid  justify-start min-h-[76vh]">
        <div className={containerClass}>
          {categories.map((category) => (
            <span
              key={category.id}
              onClick={() => handleAcceptCategory(category)}
              className={` ${itemClass}`}
            >
              {(category.icon && iconMap[category.icon.toLowerCase()]) ||
                defaultIcon}
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
