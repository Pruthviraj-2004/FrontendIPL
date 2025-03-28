import React from "react";
import { images } from "../constants";
import MainLayout from "../Components/MainLayout";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="container bg-white w-screen mt-24 overflow-hidden h-[700px] flex justify-center items-center" 
        // style={{
        //   backgroundImage: `url(${images.bg14})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat'
        // }}
      >
        <div className="flex flex-col items-center bg-white h-[90%] w-[100%]" >
          <div className=" w-[80%] py-8 h-90">
            <p className="text-3xl my-3 blue-text-gradient text-center font-bold">
              Let's get started
            </p>

            <p className="text-lg text-center">
              Create an account or login if you already have one
            </p>
          </div>
          <div>
            <img src={images.sigin} alt="signform" className="w-80" />
          </div>
          <div className="flex flex-col space-y-3 mt-3" 
            
          >
            
            <button
              onClick={() => navigate("/register")}
              className="bg-blue w-[100%] text-white hover:opacity-90 py-2 px-24 rounded-md shadow-lg transition-colors duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;