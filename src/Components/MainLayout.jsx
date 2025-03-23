import React, { useRef } from "react";
import Headers from "../headers/header";
import CTA from "./Footer";
import { useEffect } from "react";
const MainLayout = ({ children }) => {
  const topRef = useRef(null);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={topRef} className="">
      <Headers />
      {children}
      <CTA/>
    </div>
  );
};

export default MainLayout;