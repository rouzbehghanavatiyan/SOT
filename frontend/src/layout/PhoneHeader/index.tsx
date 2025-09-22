import React, { useEffect, useState } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppSelector } from "../../hooks/reduxHookType";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PhoneHeader = () => {
  const location = useLocation();
  const userIdWhantToShow = location?.state?.userData;
  const socket = useAppSelector((state) => state.main.socketConfig);
  const main = useAppSelector((state) => state.main);
  const navigate = useNavigate();
  const itsWatchRoute = location?.pathname?.toLocaleLowerCase() === "/watch";
  const itsMessageRoute =
    location?.pathname?.toLocaleLowerCase() === "/privateMessage";
  const itsShowWatchRoute =
    location?.pathname?.toLocaleLowerCase() === "/watch/show";
  const itsProfileRoute =
    location?.pathname?.toLocaleLowerCase() === "/profile";
  const itsNotificationRoute =
    location?.pathname?.toLocaleLowerCase() === "/notification";
  const [alertMsg, setAlertMsg] = useState<any>([]);

  const handleGetAlert = React.useCallback(
    (data: any) => {
      if (main?.userLogin?.user?.id === data?.recieveId) {
        console.log(data);
        setAlertMsg((prev: any) => [...prev, data]);
      }
    },
    [main?.userLogin?.user?.id]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleGetAlert);

    return () => {
      socket.off("receive_message", handleGetAlert);
    };
  }, [socket, handleGetAlert]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ResponsiveMaker hiddenWidth={1024} visibleWidth={300}>
      {!itsShowWatchRoute && (
        <div className="fixed z-40 top-0 left-0 w-full bg-white border-b border-gray-150 py-1 px-3 text-center text-white font-bold flex">
          <div className="flex justify-between w-full items-center ">
            {userIdWhantToShow?.user && (
              <ArrowBackIcon
                onClick={handleBack}
                className="text-primary font-bold font25"
              />
            )}
            <span className="icon_size col-span-3 flex justify-start logoFont text-dark_blue">
             Clash Talent
            </span>
            {itsProfileRoute ? (
              <Link to="/setting" className="col-span-2">
                <span className="flex justify-end">
                  <SettingsIcon className=" icon_size items-start text-gray-800" />
                </span>
              </Link>
            ) : (
              <div className="col-span-2 flex justify-end gap-4">
                <Link to="/store">
                  <span className="relative col-span-1">
                    <ConfirmationNumberIcon className="flex icon_size items-center text-dark_blue" />
                    {/* <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                      124
                    </span> */}
                  </span>
                </Link>
                <Link to="/messages">
                  <span className="relative col-span-1">
                    <EmailIcon className="flex icon_size items-center text-dark_blue" />
                    {alertMsg.length > 0 && (
                      <span className="absolute top-0 right-5 text-white bg-red rounded-full p-[6px] ">
                        {/* {alertMsg.length} */}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
