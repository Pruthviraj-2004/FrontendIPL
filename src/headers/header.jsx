import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import { signout } from "../services/user";
import { useMutation } from "@tanstack/react-query";
import {toast} from "react-toastify";
import { MdLeaderboard, MdLogin, MdLogout } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import { useMediaQuery } from "@react-hook/media-query";
import { ToastContainer } from "react-toastify";

const Headers = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [naVisible, setNavisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState();
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const naVisibilityHandler = () => {
    setNavisible((curState) => {
      
      return !curState;
    });
  };
  const loginHandler = () => {
    if (isSmallScreen) {
      navigate("/user");
    } else {
      navigate("/register");
    }
    setLogin((curState) => {
      return !curState;
    });
  };
  const { mutate: mutatesignout, isLoading: isLoadingg } = useMutation({
    mutationFn: ({}) => {
      return signout({});
    },
    onSuccess: (data) => {
      toast.success("Logout successful")
      console.log("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
      
    },
  });
  const logoutHandler = () => {
    dispatch(logout());
    mutatesignout({});
    navigate("/");
  };
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const NavItemInfo = [
    {
      name: "Home",
      type: "link",
      href: "/",
      icon: <FaHome color="#111fbd" />,
    },
    {
      name: "Leaderboard",
      type: "link",
      href: "/board",
      icon: <MdLeaderboard color="#111fbd" />,
    },
    {
      name: "Events",
      type: "link",
      href: "/events",
      icon: <BiSolidCricketBall color="#111fbd" />,
    },
    {
      name: "Profile",
      type: "link",
      href: "/usersubmission",
      icon: <FaCircleUser color="#111fbd" />,
    },
  ];

  const NavItem = ({
    item,
    naVisible,
    loginHandler,
    logoutHandler,
    userState,
  }) => {
    return (
      <div className="">
        <li className=" group relative">
          {item.type === "link" || userState.userInfo ? (
            <div
              className={`${
                userState.userInfo || item.name !== "Profile"
                  ? "block"
                  : "hidden"
              } mx-auto flex flex-row justify-start items-center rounded-sm px-5 py-1  text-center`}
            >
              {/* <div className={`${true ? "block" : "hidden"}`}>
                {item.icon}
              </div> */}
              <div className=" ">
                <button
                  onClick={()=> navigate(`${item.href}`)}
                  className="text-gray-100 font-medium hover:text-purple-600 transition"
                >
                  {item.name}
                </button>
              </div>
            </div>
          ) : (
            item.display && (
              <div
                className={` mx-auto flex flex-row justify-start ounded-sm px-5 text-center`}
              >
                <div className={`${naVisible ? "block" : "hidden"} mt-1\\`}>
                  {item.icon}
                </div>
                <div className="">
                  <button
                    onClick={
                      item.name === "Log out" ? logoutHandler : loginHandler
                    }
                    type={item.type}
                    className="text-gray-700 font-medium hover:text-purple-600 transition"
                  >
                    {item.name}
                  </button>
                </div>
              </div>
            )
          )}
        </li>
      </div>
    );
  };
  return (
    <>
      <section className="sticky left-0 right-0 top-0 m-0 z-[3000] bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] w-full max-w-screen px-4 lg:px-8">
        <ToastContainer/>
        <header className="container mx-auto my-0 flex items-center justify-between px-5 sm:px-0">
          <div className="left-0 text-xl py-3 flex flex-row justify-center items-center gap-x-5 my-auto">
            <div className=" flex flex-row">
              {
                <a href="/">
                  <h3 className="font-bold text-2xl py-2 text-gray-100">
                    <p>PREDICTIVE PLAY</p>
                  </h3>
                </a>
              }
            </div>
          </div>
          <div className="z-50 lg:hidden">
            {naVisible ? (
              <AiOutlineClose
                className="h-6 w-6 hover:cursor-pointer"
                onClick={naVisibilityHandler}
                color="#FFFFFF"
              />
            ) : (
              <IoMenu
                className="h-6 w-6 hover:cursor-pointer"
                onClick={naVisibilityHandler}
                color="#FFFFFF"
              />
            )}
          </div>

          <div
  className={`
    ${naVisible ? "left-0" : "-left-full"}
    fixed inset-0 z-[3000]
    flex sm:w-[35%] w-[70%]
    flex-col gap-x-9 gap-y-8 p-6
    transition-all duration-300

    lg:static lg:inset-auto lg:w-auto
    lg:flex-row lg:justify-end lg:items-center
    lg:p-0

    ${naVisible ? "bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f]" : ""}
    lg:bg-transparent
  `}
>
            <ul className="flex flex-col lg:items-center lg:gap-x-5 gap-y-2 lg:mt-0 mt-[24px] ml-1 font-bold lg:flex-row">
              {NavItemInfo.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  naVisible={naVisible}
                  logoutHandler={logoutHandler}
                  loginHandler={loginHandler}
                  userState={userState}
                />
              ))}
              <li className=" group relative py-2 ">
                {userState.userInfo ? (
                  <div
                    className={` mx-auto flex flex-row justify-start items-center rounded-sm px-5 py-1 bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-center`}
                  >
                    <div className="mx-1 mt-1">
                      <MdLogout color="111fbd" />
                    </div>

                    <div className="">
                      <button
                        onClick={logoutHandler}
                        className="text-slate-300 font-medium hover:text-purple-600 transition"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={` mx-auto flex flex-row justify-start ounded-sm px-5 text-center`}
                  >
                    <div className="mt-1 mx-1">
                      <MdLogin color="111fbd" />
                    </div>

                    <div className="">
                      <button
                        onClick={loginHandler}
                        className="text-gray-100 font-medium hover:text-purple-600 transition"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </header>
      </section>
    </>
  );
};

export default Headers;
