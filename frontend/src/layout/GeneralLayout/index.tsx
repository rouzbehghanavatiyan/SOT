import React from "react";
import { useServiceWorker } from "../../hooks/useServiceWorker";
import SotLogo from "../../assets/img/logocircle.png";
import { Button } from "../../components/Button";
interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const { showPrompt, handleAllow, handleBlock } = useServiceWorker();

  return (
    <>
      {children}
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <div className="text-center ">
              <div className="flex items-center justify-center">
                <img src={SotLogo} className="w-10 h-10" />
              </div>
              <p className=" text-sm text-gray-600 my-10">
                Would you like to receive notifications?
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  onClick={handleAllow}
                  variant={"default"}
                  label="Accept"
                />
                <Button
                  onClick={handleBlock}
                  variant={"outLine_secondary"}
                  label="Reject"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralLayout;
