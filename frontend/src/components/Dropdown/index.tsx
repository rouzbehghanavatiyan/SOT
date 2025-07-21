import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface DropdownItem<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick?: (data?: T) => void;
  href?: string | ((data?: T) => string);
  className?: string;
  divider?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  switchIcon?: boolean;
  label?: string;
  buttonIcon?: React.ReactNode;
  position?: "left" | "right";
  className?: string;
  iconOnly?: boolean;
  setIsOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenOptions?: boolean;
  itemData?: any;
  openDropdowns?: boolean;
  setOpenDropdowns?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  setIsOpenOptions,
  isOpenOptions,
  switchIcon = false,
  label,
  buttonIcon,
  position = "right",
  className = "",
  itemData,
  iconOnly = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick(itemData);
    }
    setIsOpenOptions(false);
  };

  const getHref = (item: DropdownItem) => {
    return typeof item.href === "function" ? item.href(itemData) : item.href;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenOptions(false);
      }
    };

    if (isOpenOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenOptions]);

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <div>
        <span
          aria-expanded={isOpenOptions}
          aria-haspopup="true"
          onClick={() => setIsOpenOptions(!isOpenOptions)}
          aria-label={label || "Dropdown menu"}
        >
          {buttonIcon && (
            <span className={label || iconOnly ? "mr-1" : ""}>
              {buttonIcon}
            </span>
          )}

          {!iconOnly && label}
        </span>
      </div>

      {isOpenOptions && (
        <div
          className={`absolute ${
            position === "right" ? "right-0" : "left-0"
          } z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1 " role="none">
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className=" my-1" />
                ) : item.href ? (
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      item.className || ""
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                      item.className || ""
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
