import React from "react";
import SotLogo from "../assets/img/logocircle.png";
import { Button } from "../components/Button";
import CloseIcon from "@mui/icons-material/Close";

const Prompt: React.FC<any> = ({ setShowPrompt, handleAllow, showPrompt }) => {
  return (
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
              <img src={SotLogo} className="w-14 h-" alt="Sot Logo" />
            </div>
            <div className="text-sm text-gray-600 my-6">
              <p>Notifications are disabled for you.</p>
              <p>Do you want to enable them?</p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={handleAllow} variant="default" label="Accept" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
