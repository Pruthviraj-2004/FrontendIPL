import React from "react";
import Headers from "../headers/header";
import CTA from "./Footer";
const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Headers />
      {children}
      <CTA/>
    </div>
  );
};

export default MainLayout;