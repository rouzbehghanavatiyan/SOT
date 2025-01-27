import React from "react";
import Modal from "../../../components/Modal";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";

interface PropsType {
  showSettingSolo: boolean;
  setShowSettingSolo: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingSolo: React.FC<PropsType> = ({
  showSettingSolo,
  setShowSettingSolo,
}) => {
  return (
    <Modal
      isOpen={showSettingSolo}
      setIsOpen={setShowSettingSolo}
      title="Add catogary"
      width="1000px"
      footer={[<Button type="button" variant="secondary" label="create" />]}
    >
      <>
        <Input label="Name" />
      </>
    </Modal>
  );
};

export default SettingSolo;
