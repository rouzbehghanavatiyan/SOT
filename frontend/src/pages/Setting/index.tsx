import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SoftLink from "../../hoc/SoftLinks";
import { useAppSelector } from "../../hooks/hook";
import asyncWrapper from "../../common/AsyncWrapper";
import { addAttachment } from "../../services/dotNet";

const Setting: React.FC = () => {
  const main = useAppSelector((state) => state?.main);
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleProfile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      asyncWrapper(async () => {
        const file = event.target.files?.[0];
        const formData = new FormData();
        // formData.append("formFile", file.video);
        formData.append("attachmentId", main?.userLogin?.user?.id);
        formData.append("attachmentType", "pf");
        formData.append("attachmentName", "profile");
        const resAttachment = await addAttachment(formData);
        const { status: attachmentStatus, data: attachmentData } =
          resAttachment?.data;
        return { attachmentStatus, attachmentData };
      });
    },
    []
  );

  const handleCategoryClick = (category: {
    name: string;
    id: string | number;
  }) => {
    if (category.name === "Singout") {
      handleSignOut();
    } else if (category.name === "profile") {
      handleProfile();
    }
  };
  // <div className="items-start flex justify-end  col-span-1">
  //   <ModeEditIcon
  //     onClick={() => {
  //       setShowEditProfile(true);
  //     }}
  //     className="text-gray-800 font25"
  //   />
  // </div>

  return (
    <>
      <SoftLink
        handleAcceptCategory={handleCategoryClick}
        categories={[
          { name: "Singout", id: 1 },
          { name: "Profile", id: 2 },
          { name: "Support", id: 3 },
          { name: "About us", id: 4 },
        ]}
        isLoading={false}
      />
    </>
  );
};

export default Setting;
