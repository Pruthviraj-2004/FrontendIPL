import React from "react";
import { images } from "../constants";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ErrorMessage = ({ message, setCreateError }) => {
  const navigate = useNavigate()
  return (
    
      <div className="fixed flex justify-center item-center inset-0 h-screen z-[1000] bg-black/80">
      <div className="relative flex flex-col items-center justify-center w-[90%] text-center mx-auto my-auto bg-white h-[80%]">
        <MdClose
          onClick={() => {setCreateError(false); navigate("/")}}
          size={30}
          className="absolute cursor-pointer right-0 top-0 m-5"
        />
        <img
          src={images.error}
          alt="Error"
          className="mb-4"
          style={{ maxWidth: "250px" }}
        />
        <h1 className="text-3xl font-bold mb-2">Oops!.</h1>
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  
  );
};

export default ErrorMessage;