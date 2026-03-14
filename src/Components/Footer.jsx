import React from "react";
import SocialMediaShare from "./SocialMediaShare";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate()
  return (
    <footer class="bottom-0 left-0  bg-slate-950 w-screen max-w-screen pt-[1px] pb-8 border-t-[1px] border-gray-800 z-[1000] xl:pt-8">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        </div>
      <div class="max-w-screen-lg px-4 mx-auto text-black xl:max-w-screen-xl sm:px-6 md:px-8 dark:text-gray-300">
        <ul class="flex flex-col  lg:flex-row lg:justify-center justify-start items-start pb-2 text-md font-light">
          <li class="w-full mx-auto lg:mx-0 md:w-1/3 lg:w-1/3">
            <div class=" font-semibold text-black">
              <p class="text-indigo-100 hover:text-indigo-200 font-semibold mt-4 text-md text-center uppercase mb-3 ">
                Links
              </p>
              <ul className="flex lg:flex-row flex-col justify-center items-center gap-x-20">
                <li class="   text-indigo-500 font-semibold transition-colors duration-200 hover:text-indigo-800 ">
                <button onClick={()=> navigate("/board")}>LeaderBoard</button>
                </li>
                <li class="  text-indigo-500 font-semibold transition-colors duration-200 hover:text-indigo-800 ">
                <button onClick={()=> navigate("/register")}>Register</button>
                </li>
                <li class=" text-indigo-500 font-semibold transition-colors duration-200 hover:text-indigo-800">
                <button onClick={()=> navigate("/events")}>Fixtures</button>
                </li>
                <li class=" text-indigo-500 font-semibold transition-colors duration-200 hover:text-indigo-800 ">
                  <button onClick={()=> navigate("/terms")}>Terms</button>
                </li>
                <li class=" text-indigo-500 font-semibold transition-colors duration-200 hover:text-indigo-800 ">
                  <button onClick={()=> navigate("/aboutus")}>AboutUs</button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* <div className="mx-auto mt-7 flex w-full flex-col content-center items-center text-center">
          <h2 className="mx-auto my-5 text-center font-bold">Share on:</h2>
          <SocialMediaShare
            url={encodeURI(window.location.href)}
            title={encodeURI(window.location.href)}
          />
        </div> */}
      </div>
      <div className="w-screen bottom-0 left-0">
        <p className="text-blue mt-4 text-center text-sm font-semibold">
          {"@" +
            new Date().getFullYear() +
            " PREDICTIVE PLAY. ALL RIGHTS RESERVED"}
        </p>
      </div>
    </footer>
  );
};

export default CTA;
