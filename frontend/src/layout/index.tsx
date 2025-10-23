import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Messages from "../pages/ChatRoom";
import Header from "./Header";
import ResponsiveMaker from "../utils/helpers/ResponsiveMaker";
import PhoneFooter from "./PhoneFooter";
import PhoneHeader from "./PhoneHeader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHookType";
import {
  RsetAllFollingList,
  RsetCategory,
  RsetGiveUserOnlines,
  RsetSocketConfig,
  RsetUserLogin,
} from "../common/Slices/main";
import {
  categoryList,
  followingList,
  profileAttachment,
} from "../services/dotNet";
import asyncWrapper from "../common/AsyncWrapper";
import { io } from "socket.io-client";
import { useServiceWorker } from "../hooks/useServiceWorker";

interface PropsType {
  children: React.ReactNode;
}

interface DecodedToken {
  [key: string]: any;
}

const Sidebar: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const main = useAppSelector((state) => state.main);
  const { showPrompt, setShowPrompt, handleAllow } = useServiceWorker();
  const socket = useMemo(() => io(import.meta.env.VITE_NODE_SOCKET), []);
  const token = sessionStorage.getItem("token");
  const userIdFromLocation = location.state?.userInfo?.id;

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = Object.values(decoded)?.[1];

      if (!userId) {
        sessionStorage.removeItem("token");
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      sessionStorage.removeItem("token");
      navigate("/");
    }
  }, [token, navigate, dispatch]);

  const userData = useMemo(() => {
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }, [token]);

  const userId = useMemo(() => {
    if (!userData) return null;
    return Object.values(userData)?.[1];
  }, [userData]);

  const user = useMemo(() => {
    return userId ? { id: Number(userId) } : null;
  }, [userId]);

  const handleGetCategory = asyncWrapper(async () => {
    if (!token) return;

    const res = await categoryList();
    const { data, status } = res?.data;
    if (status === 0) {
      dispatch(RsetCategory(data));
    }
  });

  const handleProfileAttachment = asyncWrapper(async () => {
    if (!token || !user) return;
    try {
      const targetUserId = userIdFromLocation || user.id;
      const resImageProfile = await profileAttachment(targetUserId);
      const { status, data } = resImageProfile?.data;

      if (status === 0) {
        dispatch(RsetUserLogin(data));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  });

  const handleAllFollowing = asyncWrapper(async () => {
    if (!token) return;

    try {
      const targetUserId = userIdFromLocation || main?.userLogin?.user?.id;
      if (!targetUserId) return;

      const res = await followingList(targetUserId);
      const { status, data } = res?.data;

      if (status === 0) {
        const followingIds = data?.map(
          (item: any) => item?.attachment?.attachmentId
        );
        dispatch(
          RsetAllFollingList({
            getMapFollowingId: followingIds,
            allFollowing: data,
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch following list:", error);
    }
  });

  const handleSocketConfig = useCallback(() => {
    dispatch(RsetSocketConfig(socket));
  }, [dispatch, socket]);

  const handleGiveUsersOnline = useCallback(
    (data: any) => {
      dispatch(RsetGiveUserOnlines(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(RsetUserLogin({ user: { id: Number(userId) } }));
    if (!token || !user) return;
    handleProfileAttachment();
    handleGetCategory();
  }, [token, user]);

  useEffect(() => {
    if (!main?.userLogin?.user?.id || !token) return;

    handleSocketConfig();
    handleAllFollowing();

    const handleConnect = () => {
      socket.emit("send_user_online", main.userLogin.userId);
      socket.on("all_user_online", handleGiveUsersOnline);
    };

    socket.on("connect", handleConnect);

    // Notification permission check
    if (Notification.permission === "default") {
      setShowPrompt(true);
    }

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off("all_user_online", handleGiveUsersOnline);
    };
  }, [main?.userLogin?.user?.id, token]);

  if (!user || !token) {
    return null;
  }

  return (
    <main className="relative">
      <ResponsiveMaker visibleWidth={1024}>
        <Header openMessage={openMessage} setOpenMessage={setOpenMessage} />
      </ResponsiveMaker>
      <div>
        <div className="flex flex-grow justify-center items-center">
          <div className="max-w-7xl w-full h-full justify-center items-center">
            <PhoneHeader />
            <div className="overflow-y-auto min-h-[calc(100vh-100px)] max-h-[85vh] sm:max-h-[95vh] md:max-h-[90vh] lg:max-h-[85vh] lg:min-h-[89vh]">
              {children}
              {/* {showPrompt && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white border-[1px] p-4 rounded-xl max-w-md w-full">
                    <div className="flex justify-end">
                      <CloseIcon
                        onClick={() => setShowPrompt(false)}
                        className="text-primary font20 cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-center rounded-xl p-4 bg-white">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                          <img
                            src={SotLogo}
                            className="w-10 h-10"
                            alt="Sot Logo"
                          />
                        </div>

                        <div className="text-sm text-gray-600 my-6">
                          <p>Notifications are disabled for you.</p>
                          <p>Do you want to enable them?</p>
                        </div>

                        <div className="mt-6 flex justify-center gap-3">
                          <Button
                            onClick={handleAllow}
                            variant="default"
                            label="Accept"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
            <PhoneFooter />
          </div>
        </div>
      </div>
      {openMessage && (
        <Messages
          socket={socket}
          setOpenMessage={setOpenMessage}
          openMessage={openMessage}
        />
      )}
    </main>
  );
};

export default Sidebar;
