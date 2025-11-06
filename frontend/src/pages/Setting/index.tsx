import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SoftLink from "../../hoc/SoftLinks";
import { useAppSelector } from "../../hooks/reduxHookType";
import asyncWrapper from "../../common/AsyncWrapper";
import { addAttachment } from "../../services/dotNet";
import MainTitle from "../../components/MainTitle";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";

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

  return (
    <div className="">
      <ResponsiveMaker>
        <MainTitle title="Settings" />
      </ResponsiveMaker>
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
    </div>
  );
};

export default Setting;
