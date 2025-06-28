import { useState } from "react";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  divider?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  switchIcon: boolean;
  label?: string;
  buttonIcon?: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  switchIcon = false,
  label = "Options",
  buttonIcon,
  position = "right",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {buttonIcon && <span className="mr-1">{buttonIcon}</span>}
          {label}

          {!!switchIcon && (
            <svg
              className={`-mr-1 size-5 text-gray-400 transition-transform bg-red ${isOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute ${position === "right" ? "right-0" : "left-0"} z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className=" my-1" />
                ) : item.href ? (
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.className || ""}`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={(e) => {
                      item.onClick?.();
                      closeDropdown();
                    }}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={`flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${item.className || ""}`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      item.onClick?.();
                      closeDropdown();
                    }}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </button>
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
