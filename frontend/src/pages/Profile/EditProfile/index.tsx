import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";

interface PropTypes {
  showEditProfile: boolean;
  setShowEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<PropTypes> = ({
  showEditProfile,
  setShowEditProfile,
}) => {
  const [searching, setSearching] = useState("");

  return (
    <Modal
      title={"Edit profile"}
      className="rounded-2xl"
      padding={0}
      isOpen={showEditProfile}
      footer={[
        <div className="flex p-3 justify-center gap-2">
          <Button type="button" variant={"green"} label="Accept" />
          <Button
            onClick={() => setShowEditProfile(false)}
            type="button"
            variant={"outLine_secondary"}
            label="Close"
          />
        </div>,
      ]}
    >
      <div className="container ">
        <Input
          label="Username"
          className="ms-1 rounded-lg text-gray-900"
          value={searching}
          onChange={(e: any) => setSearching(e.target.value)}
        />
        <Input
          label="Bio"
          className="ms-1 rounded-lg text-gray-900"
          value={searching}
          onChange={(e: any) => setSearching(e.target.value)}
        />
        <Input
          label="Location"
          className="ms-1 rounded-lg text-gray-900"
          value={searching}
          onChange={(e: any) => setSearching(e.target.value)}
        />
        <div className="">
          <span className="flex my-4">Description</span>
          <textarea
            className=" border rounded-lg w-full focus:border-none outline-mainGray-dark px-5 py-1"
            rows={6}
            value={"GGG"}
            onChange={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
