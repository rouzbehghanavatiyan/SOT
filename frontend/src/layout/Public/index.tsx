import React, { Children } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

type Props = any;
const GeneralLayout: React.FC<Props> = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default GeneralLayout;
