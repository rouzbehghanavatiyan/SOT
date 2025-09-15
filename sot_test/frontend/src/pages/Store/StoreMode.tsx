import React from "react";
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

const StoreMode: React.FC<any> = ({
  showStoreModeModal,
  setShowStoreModeModal,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/crypto-pay");
  };

  return (
    <Modal
      title={"Mode"}
      className="rounded-2xl"
      padding={0}
      isOpen={showStoreModeModal}
      onClose={setShowStoreModeModal}
      footer={[
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setShowStoreModeModal(false)}
            variant={"outLine_secondary"}
            label="Close"
            className="border"
          />
        </div>,
      ]}
    >
      <div className="container my-6">
        <div className="grid grid-cols-1 gap-4">
          <div
            onClick={handleNavigate}
            className="border rounded-xl bg-green flex justify-center items-center"
          >
            <PaymentIcon className="font50 text-white" />
            <span className="font20 text-white">Paypal</span>
          </div>
          <div
            onClick={handleNavigate}
            className="border rounded-xl bg-green flex justify-center items-center"
          >
            <CurrencyBitcoinIcon className="font50 text-white" />
            <span className="font20 text-white">Crypto</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoreMode;
