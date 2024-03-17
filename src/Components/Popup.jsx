import React from "react";
import { images } from "../constants";

const Popup = ({setClose }) => {
  
  return (
    <>
      
      <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
        <div className="h-fit max-w-4xl w-[500px] h-auto mx-auto my-auto rounded-lg bg-white p-5">
          <button className="" onClick={()=>setClose(false)}>CLOSE</button>
          <img src={images.iplogo}></img>
        </div>
      </div>
    </>
  );
};

export default Popup;