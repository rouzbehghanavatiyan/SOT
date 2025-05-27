import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SoftLink from "../../hoc/SoftLinks";
import { useAppSelector } from "../../hooks/hook";
import asyncWrapper from "../../common/AsyncWrapper";
import { addAttachment } from "../../services/dotNet";

const Setting: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

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
        formData.append("attachmentId", userId || main?.userLogin?.userId);
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

  return (
    <>
      <SoftLink
        handleAcceptCategory={handleCategoryClick}
        categories={[
          { name: "Singout", id: 1 },
          { name: "profile", id: 2 },
        ]}
        isLoading={false}
      />
    </>
  );
};

export default Setting;
