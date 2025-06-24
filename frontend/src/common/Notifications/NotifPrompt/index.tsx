import React, { useState } from "react";
import Logo from "../assets/img/logocircle.png";
import { Button } from "../../../components/Button";
interface NotifPromptProps {
  onAllow: () => void;
  onBlock: () => void;
}
const NotifPrompt: React.FC<NotifPromptProps> = ({ onAllow, onBlock }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs z-50">
      <div className="flex items-start">
        <img src={Logo} alt="Logo" className="w-10 h-10 mr-3" />
        <div>
          <h3 className="font-bold text-gray-800">اعلان‌های سایت</h3>
          <p className="text-sm text-gray-600 mt-1">
            آیا مایل به دریافت اعلان‌ها از این سایت هستید؟
          </p>
          <div className="bg-red">
            <Button onClick={onAllow} variant={"default"} label="Accept" />
            <Button onClick={onBlock} variant={"green"} label="Reject" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifPrompt;
