import React, { useState } from "react";
import ResponsiveMaker from "../../../utils/helpers/ResponsiveMaker";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation } from "react-router-dom";
import Input from "../../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const PhoneHeader = () => {
  const [searching, setSearching] = useState("");
  const location = useLocation();
  const itsWatchRoute = location?.pathname?.toLocaleLowerCase() === "/watch";
  const itsShowWatchRoute =
    location?.pathname?.toLocaleLowerCase() === "/watch/show";
  const itsProfileRoute =
    location?.pathname?.toLocaleLowerCase() === "/profile";
  const itsNotificationRoute =
    location?.pathname?.toLocaleLowerCase() === "/notification";
  const itsStoreRoute = location?.pathname?.toLocaleLowerCase() === "/store";

  return (
    <ResponsiveMaker hiddenWidth={768} visibleWidth={300}>
      {!itsShowWatchRoute && (
        <div className="sticky z-40 top-0 left-0 w-full bg_phone_header shadow-md px-2 py-2 text-center text-white font-bold flex">
          <div className="grid grid-cols-5 w-full items-center">
            {itsWatchRoute ? (
              <span className="col-span-3 relative">
                <Input
                  className="ms-1 border-none text-green"
                  placeholder="Searching . . ."
                  value={searching}
                  onChange={(e) => setSearching(e.target.value)}
                />
                <SearchIcon className="text-green absolute top-2 right-1 font23" />
              </span>
            ) : itsNotificationRoute ? (
              <span className="icon_size col-span-3 flex justify-start text-green">
                Notification
              </span>
            ) : itsStoreRoute ? (
              <span className="icon_size col-span-3 flex justify-start text-green">
                Store
              </span>
            ) : (
              <span className="icon_size col-span-3 flex justify-start text-green">
                Star Of Talent
              </span>
            )}
            {itsProfileRoute ? (
              <Link to="/setting">
                <span>
                  <SettingsIcon className=" icon_size items-start text-green" />
                </span>
              </Link>
            ) : (
              <div className="col-span-2 flex justify-end gap-4">
                <Link to="/store">
                  <span className="relative col-span-1">
                    <ConfirmationNumberIcon className="flex icon_size items-center text-green" />
                    <span className="absolute top-0 right-4 text-white bg-red w-full rounded-sm font8">
                      124
                    </span>
                  </span>
                </Link>
                <span className="col-span-1 ">
                  <EmailIcon className="flex icon_size items-center text-green" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </ResponsiveMaker>
  );
};

export default PhoneHeader;
