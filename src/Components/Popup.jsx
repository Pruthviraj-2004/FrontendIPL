import React from "react";
import { images } from "../constants";
import { MdClose } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
const Popup = ({setClose }) => {
  
  return (
    <>
      
      <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
  <div className="max-w-4xl w-auto mx-auto my-auto rounded-lg bg-white p-5">
  <button onClick={() => setClose(false)}>
        <IoMdClose />
      </button>
    <p className="text-center">
      <span className="font-bold text-red-500">Disclaimer:</span> 
      {" "}This is a fantasy game{" "}
      
    </p>
  </div>
</div>

    </>
  );
};

export default Popup;