// components/ChatAlert/ChatAlert.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../hooks/store";
import { hideAlert, removeAlert } from "../common/Slices/alertSlice";

const ChatAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisible, currentAlert } = useSelector(
    (state: RootState) => state.alert
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isVisible && currentAlert) {
      const timer = setTimeout(() => {
        handleClose();
      }, currentAlert.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentAlert]);

  const handleClose = () => {
    if (currentAlert) {
      dispatch(removeAlert(currentAlert.id));
    }
    dispatch(hideAlert());
  };

  const handleActionClick = () => {
    if (currentAlert?.action) {
      currentAlert.action.onClick();
    }
    handleClose();
  };

  if (!isVisible || !currentAlert) {
    return null;
  }

  // استایل‌های مختلف بر اساس نوع آلرت
  const getAlertStyles = () => {
    const baseStyles =
      "rounded-lg shadow-lg transition-all duration-300 ease-in-out transform";

    const typeStyles = {
      success: "bg-green-500 border-green-600",
      error: "bg-red-500 border-red-600",
      warning: "bg-yellow-500 border-yellow-600",
      info: "bg-blue-500 border-blue-600",
      message: "bg-purple-500 border-purple-600",
    };

    const positionStyles =
      currentAlert.position === "bottom" ? "bottom-4" : "top-4";

    return `${baseStyles} ${typeStyles[currentAlert.type]} ${positionStyles}`;
  };

  // موبایل - نوار پایین صفحه
  if (isMobile) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
        <div className={`${getAlertStyles()} mx-4 mb-4 p-4 border-l-4`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm mb-1">
                {currentAlert.title}
              </h3>
              <p className="text-white text-xs opacity-90">
                {currentAlert.message}
              </p>
            </div>

            <div className="flex items-center space-x-2 ml-3">
              {currentAlert.action && (
                <button
                  onClick={handleActionClick}
                  className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full hover:bg-opacity-30 transition-colors"
                >
                  {currentAlert.action.label}
                </button>
              )}
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // دسکتاپ - Toast در گوشه بالا راست
  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className={`${getAlertStyles()} w-80 p-4 border-l-4`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              {/* آیکون بر اساس نوع */}
              {currentAlert.type === "message" && (
                <svg
                  className="w-5 h-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              )}
              <h3 className="font-bold text-white text-sm">
                {currentAlert.title}
              </h3>
            </div>
            <p className="text-white text-sm opacity-90 mb-3">
              {currentAlert.message}
            </p>

            {currentAlert.action && (
              <button
                onClick={handleActionClick}
                className="px-4 py-2 bg-white bg-opacity-20 text-white text-xs rounded-lg hover:bg-opacity-30 transition-colors"
              >
                {currentAlert.action.label}
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors ml-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-1 mt-2">
          <div
            className="bg-white h-1 rounded-full transition-all duration-100 ease-linear"
            style={{
              width: "100%",
              animation: `shrink ${currentAlert.duration || 5000}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAlert;
