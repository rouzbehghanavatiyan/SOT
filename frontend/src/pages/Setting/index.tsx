import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SoftLink from "../../hoc/SoftLinks";
import { useAppSelector } from "../../hooks/hook";

const Setting: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <SoftLink
        handleAcceptCategory={handleSignOut}
        categories={[{ name: "Singout", id: 1 }]}
        isLoading={false}
      />
      ;
    </>
  );
};

export default Setting;
