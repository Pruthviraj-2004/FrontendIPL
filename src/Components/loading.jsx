import React from "react";
import { Ring } from "react-awesome-spinners";
function Loading() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <Ring />
      </div>
    </>
  );
}

export default Loading;