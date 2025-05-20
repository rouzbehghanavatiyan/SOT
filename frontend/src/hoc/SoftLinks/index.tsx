import React, { FC } from "react";
import Loading from "../../components/Loading";

import PersonIcon from "@mui/icons-material/Person";

interface Category {
  id: string;
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
  handleAcceptCategory?:(data: Category) => void;
  iconMap?: Record<string, JSX.Element>;
}

const SoftLink: FC<TalentModeProps> = ({
  iconMap = {},
  categories = [],
  handleAcceptCategory = () => {},
  isLoading = false,
  defaultIcon = <PersonIcon className="text-2xl mx-3" />,
  containerClass = "w-screen md:w-full bg-orange-ghost mt-2 h-screen md:h-full",
  itemClass = "bg-orange-hover rounded-lg md:min-w-52 m-3 flex justify-start items-center text-white cursor-pointer",
  textClass = "font20 py-2",
}) => {
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="grid justify-center mt-12">
        <div className={containerClass}>
          {categories.map((category) => (
            <span
              key={category.id}
              onClick={() => handleAcceptCategory(category)}
              className={itemClass}
            >
              {category.icon
                ? iconMap[category.icon.toLowerCase()] || defaultIcon
                : defaultIcon}
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
