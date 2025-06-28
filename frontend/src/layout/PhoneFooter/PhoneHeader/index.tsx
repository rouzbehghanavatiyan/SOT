import { useAppSelector } from "../../../hooks/hook";
import React, { useEffect, useMemo, useState } from "react";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation } from "react-router-dom";
import Input from "../../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const PhoneHeader: React.FC = () => {
  const location = useLocation();
  const socket = useAppSelector((state) => state.main.socketConfig);
  const itsWatchRoute = location?.pathname?.toLocaleLowerCase() === "/watch";
  const itsShowWatchRoute =
    location?.pathname?.toLocaleLowerCase() === "/watch/show";
  const itsProfileRoute =
    location?.pathname?.toLocaleLowerCase() === "/profile";
  const itsNotificationRoute =
    location?.pathname?.toLocaleLowerCase() === "/notification";
  const itsStoreRoute = location?.pathname?.toLocaleLowerCase() === "/store";
  const [searching, setSearching] = useState("");
  const [alertMsg, setAlertMsg] = useState(0);

  const handleGetAlert = async (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (!socket) return;
    console.log(socket.listeners("receive_message"));

    socket.on("receive_message", handleGetAlert);

    return () => {
      socket.off("receive_message", handleGetAlert);
    };
  }, [socket, handleGetAlert]);

  const headerContent = useMemo(() => {
    if (itsWatchRoute) {
      return (
        <span className="col-span-3 relative">
          <Input
            className="ms-1 bg-gray-100 rounded-lg border-none text-gray-900"
            placeholder="Searching . . ."
            value={searching}
            onChange={(e: any) => setSearching(e.target.value)}
          />
          <SearchIcon className="text-gray-800 absolute top-2 right-1 font23" />
        </span>
      );
    } else if (itsNotificationRoute) {
      return (
        <span className="icon_size col-span-3 flex justify-start  text-gray-800">
          Notification
        </span>
      );
    } else if (itsStoreRoute) {
      return (
        <span className="icon_size col-span-3 flex justify-start text-gray-800">
          Store
        </span>
      );
    } else {
      return (
        <span className=" icon_size col-span-3 flex justify-start logoFont text-primary">
          Star Of Talent
        </span>
      );
    }
  }, [itsWatchRoute, itsNotificationRoute, searching]);

  const fixProfileRoute = useMemo(() => {
    if (!itsShowWatchRoute) {
      return (
        <div className="fixed z-40 top-0 left-0 w-full bg-white shadow-md px-1 py-1 text-center text-white font-bold flex">
          <div className="grid grid-cols-5 w-full items-center ">
            {headerContent}
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
                    <ConfirmationNumberIcon className="flex icon_size items-center text-gray-800" />
                    <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                      124
                    </span>
                  </span>
                </Link>
                <Link to="/messages">
                  <span className="relative col-span-1">
                    <EmailIcon className="flex icon_size items-center text-gray-800" />
                    {alertMsg !== 0 && (
                      <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                        {alertMsg}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      );
    }
  }, []);

  return (
    <ResponsiveMaker hiddenWidth={900} visibleWidth={300}>
      {fixProfileRoute}
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
