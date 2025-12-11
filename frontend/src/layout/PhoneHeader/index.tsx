import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import Input from "../../components/Input";
import {
  clearUnreadCount,
  incrementUnreadCount,
} from "../../common/Slices/main";

const PhoneHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const socket = useAppSelector((state) => state.main.socketConfig);
  const currentUser = useAppSelector((state) => state.main.userLogin?.user);
  const [alertMsg, setAlertMsg] = useState<any[]>([]);
  const unreadCount = useAppSelector((state) => state.main.unreadMessagesCount);
  const routes = useMemo(
    () => ({
      isWatch: currentPath === "/watch",
      isProfile: currentPath === "/profile",
      isShowWatch: currentPath === "/watch/show",
      isNotification: currentPath === "/notification",
      isMessage: currentPath === "/privatemessage",
    }),
    [currentPath]
  );

  console.log("unreadCountunreadCountunreadCount", unreadCount);

  const handleReadConfirmation = (data: any) => {
    // اگر پیامی که ما دریافت کرده بودیم خوانده شد
    if (currentUser.id === data.receiver) {
      dispatch(clearUnreadCount());
    }
  };
  const handleReceiveMessage = (data: any) => {
    if (currentUser.id === data?.recieveId) {
      dispatch(incrementUnreadCount());
    }
  };

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.on("receive_message", handleReceiveMessage);
    socket.on("messages_read_confirmation", handleReadConfirmation);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("messages_read_confirmation", handleReadConfirmation);
    };
  }, [socket, currentUser, dispatch]);

  const handleBack = () => navigate(-1);

  const ActionIcons = () => (
    <div className="flex justify-end gap-4 col-span-2">
      <Link to="/store" className="relative">
        <ConfirmationNumberIcon className="icon_size text-dark_blue" />
      </Link>
      <Link to="/messages" className="relative">
        <EmailIcon className="icon_size text-dark_blue" />
        {alertMsg.length > 0 && (
          <span className="absolute top-0 -right-1 bg-red rounded-full p-[6px] animate-pulse" />
        )}
      </Link>
    </div>
  );

  if (routes.isWatch) {
    return (
      <ResponsiveMaker hiddenWidth={1024} visibleWidth={300}>
        <div className="z-40 w-full bg-white border-b border-gray-150 px-3 flex items-center justify-between">
          <div className="flex-1 max-w-[70%]">
            {/* <Input
              placeholder="Search . . ."
              className="rounded-2xl bg-white border-gray-150 py-2 text-sm"
            /> */}
            <span className="icon_size logoFont text-dark_blue text-xl font-bold">
              Clash Talent
            </span>
          </div>
          <ActionIcons />
        </div>
      </ResponsiveMaker>
    );
  }

  if (routes.isShowWatch) return null;
  return (
    <ResponsiveMaker hiddenWidth={1024} visibleWidth={300}>
      <header className="z-40 w-full bg-white border-b border-gray-150 px-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {location.state?.userData?.user && (
            <ArrowBackIcon
              onClick={handleBack}
              className="text-primary font-bold cursor-pointer font25"
            />
          )}
          <span className="icon_size logoFont text-dark_blue text-xl font-bold">
            Clash Talent
          </span>
        </div>

        {routes.isProfile ? (
          <Link to="/setting">
            <SettingsIcon className="icon_size text-dark_blue" />
          </Link>
        ) : (
          <ActionIcons />
        )}
      </header>
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
