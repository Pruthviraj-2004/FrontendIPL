import React, { useEffect } from "react";
import { useState } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
// import { getLeaderBoard,  getLeaderBoard3 } from "../../services/leaderboard";
import {getLeaderBoard3 } from "../../services/leaderboard";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/loading";
const Leaderboard = () => {
  const userState = useSelector((state) => state.user);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [lid, setLid] = useState(12);//we need to set this to 6 if the default leaderboard is Nexthink
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [loading,setLoading] = useState(true)
  const Breadcrumbsdata= [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Leaderboard",
      link: "/board",
    },
  ]
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Global");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(selectedOption);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [selectedOption]);

  const handleItemClick = (option) => {
    const selectedLeaderboard = leaderboards.find(
      (item) => item.leaderboardname === option
    );
    if (!selectedLeaderboard) {
      throw new Error("Selected leaderboard not found");
    }

    setSelectedOption(option);
    setLid(selectedLeaderboard.lid);
  };
  
  

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, searchQuery, debouncedSearchQuery, userState.userInfo]);

  const fetchData = () => {
    if (userState?.userInfo) {
      refetchLeaderBoard3();//3
    } else {
      refetchLeaderBoard3();//3
    }
  };

 

  const { data: data3, refetch: refetchLeaderBoard3 } = useQuery({
    queryFn: () => getLeaderBoard3({username:userState?.userInfo?.user?.username, selected_leaderboard: lid }),
    queryKey: ["board2"],
    onError: (error) => {
      toast.error("Failed to load page",{
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      
    },
  });
  // console.log(data3)

  const leaderboards = (userState ? data3 : data3)?.leaderboards || [];//3
  const lidAndNameArray = leaderboards.map((item) => [
    item.lid,
    item.leaderboardname,
  ]);

  const LeaderboardData = userState ? data3 : data3;//3

  const user_list =
    filteredUserList.length > 0
      ? filteredUserList
      : LeaderboardData?.user_list || [];
  const recordsPerPage = 10;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPageUserList = user_list.slice(startIndex, endIndex);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filteredUserList = LeaderboardData?.user_list.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUserList(filteredUserList);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup function to clear the timeout if component unmounts
  }, []);
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
  const navigate = useNavigate();
  return (
    <MainLayout>
   {loading ? (
                  <div className="w-screen h-screen text-center flex justify-center items-center animate-pulse">
                    <Loading/>
                  </div>
                ) : (
      <div className="flex flex-col min-w-xl overflow-y-visible h-auto" >
        <Breadcrumbs data={Breadcrumbsdata} activeName="Leaderboard"  />
        <div
          className={`w-full my-0 lg:h-full bg-cover bg-no-repeat border-t-2 md:h-[200px] h-[110px] border-b-2  flex flex-col justify-center items-center`}
          
        >
          
          <div className="flex flex-col justify-center items-center py-5">
            <button onClick={() => fetchData()}></button>
            <p className="text-2xl font-bold mt-3 xs:mt-[1px] sm:mt-1 ml-3 lg:text-black lg:text-3xl text-center uppercase">
              Indian Premier League 2025
            </p>
            <p className="xs:text-sm mx-3 text-xl hidden lg:block text-center sm:block   text-blue font-semibold">
              Dive into the pulse-pounding excitement of the IPL!
            </p>
          </div>
        </div>
        <div className="container flex flex-col  max-w-3xl px-4 mx-auto sm:px-8">
        <div className="flex flex-col items-center justify-center mx-auto mt-8">
              <p className="lg:text-md text-sm text-black font-semibold text-center">
              To obtain a customized leaderboard, please reach out via email to <span className="text-blue font-bold">predictiveplay.supp@gmail.com</span>
              </p>
              
            </div>
          <div className="py-2 relative w-full">
            <div className="mx-14">
              <div className="flex flex-row justify-center items-center text-center w-full mb-1 mt-2 sm:mb-0">
                <h2 className="text-2xl uppercase font-bold text-tertiary">
                  Leader Board
                </h2>
              </div>
              {/* search bar and dropdown section */}
              <div className="flex flex-col md:flex-row justify-between mt-6 mx-2">
                {/* search bar */}
                <div className=" justify-center hidden sm:block ">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search player name..."
                    className="mb-2 px-[1px] text-[14px] sm:w-[160px] xs:w-[80px] md:w-28  lg:w-40 py-2 border-[2px]  placeholder:text-center border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* dropdown  */}
                <div className="  xs:right-auto xs:left-0 xs:ml-4 xs:mt-1  justify-center flex xs:justify-center items-center">
                  <select
                    value={selectedOption}
                    onChange={(e) => handleItemClick(e.target.value)}
                    className="  text-black py-3 w-fit   pl-3 rounded-md border  border-black/60 focus:outline-none"
                  >
                    {lidAndNameArray.map((item) => (
                      <option
                        key={item[0]}
                        value={item[1]}
                        onChange={() => handleItemClick(item[1])}
                      >
                        {item[1]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* leader board section */}
            <div className="flex justify-center items-center py-4 w-full sm:w-[90%] mx-auto mt-1">
              {/* left arrow */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:animate-none mr-4 w-fit bg-gray-200 my-auto p-2  animate-pulse hidden sm:block"
                // className="cursor-pointer ml-4 my-auto p-2 w-[48px] animate-pulse sm:block hidden"
              >
                <FaArrowLeft color="black" />
              </button>
              {/* laederboard */}

              <div className="flex flex-col items-center justify-center  xs:w-[100%] w-[100%] lg:w-full   rounded-lg">
                <div className="flex w-full bg-white border-b  py-3">
                  <div className="flex-1 px-5 text-xl font-bold text-center text-[#111fbd] uppercase">
                    Rank
                  </div>
                  <div className="flex-1 px-5 text-xl font-bold text-center text-[#111fbd] uppercase">
                    User
                  </div>
                  <div className="flex-1 px-5 text-xl font-bold text-center text-[#111fbd] uppercase">
                    Score
                  </div>
                </div>

                
                  <div className="w-full">
                    {currentPageUserList.map((record, index) => (
                      <div
                        key={index}
                        className="flex w-full bg-white border-b items-center justify-center"
                      >
                        <div className="flex-1 px-5 py-8 text-xl font-bold text-center text-gray-600">
                          {record.rank}
                        </div>
                        <div className="flex-1 px-5 py-5 text-xl font-bold text-center text-gray-600">
                          {record.username}
                        </div>
                        <div className="flex-1 px-5 py-5 text-xl font-bold text-center text-gray-600">
                          {/* {selectedOption === "Weekly"
                            ? record.score2
                    : record.score1} */}
                          {(selectedOption === "Weekly" || selectedOption === "Nexthink Weekly")
                            ? record.score2
                            : record.score1}
                        </div>
                      </div>
                    ))}
                  </div>
              
              </div>
              {/* right arrow */}
              <button
                onClick={handleNextPage}
                disabled={
                  endIndex >= user_list.length ||
                  endIndex >= LeaderboardData?.total_users
                }
                // className="cursor-pointer disabled:cursor-none mr-4 my-auto p-2 w-[48px] animate-pulse sm:block hidden"
                className="cursor-pointer disabled:cursor-not-allowed disabled:animate-none disabled:opacity-20 ml-4   w-fit bg-gray-200 my-auto p-2  animate-pulse hidden sm:block"
              >
                <FaArrowRight color="black" />
              </button>
            </div>
            {/* previous and next for mobile view */}
            <div className="flex flex-row justify-center lg:hidden  items-center gap-3 m-5  ">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer disabled:animate-none disabled:opacity-10  ml-4 my-auto p-2 bg-gray-200 w-fit  animate-pulse block"
              >
                <FaArrowLeft color="black" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  endIndex >= user_list.length ||
                  endIndex >= LeaderboardData?.total_users
                }
                className="cursor-pointer disabled:animate-none mr-4 w-fit disabled:opacity-10 bg-gray-200 my-auto p-2  animate-pulse block "
              >
                <FaArrowRight color="black" />
              </button>
            </div>
            {/* search bar for mobile view
             */}
            <div className="flex justify-center lg:hidden items-center ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search player name..."
                className="mb-2 px-[1px] text-[14px] sm:w-[160px] w-[250px] xs:w-[80px] md:w-28  lg:w-40 py-2 border-[2px]  placeholder:text-center border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col items-center justify-center mx-auto lg:mt-0">
              <p className="text-lg text-blue font-semibold text-center mb-4">
                Want to compete with your friends on a personalized leaderboard?
              </p>
              <button
                onClick={() => navigate("/lbparticipate")}
                className="bg-blue w-60 animate-pulse text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Click here
              </button>
            </div>
          </div>
        </div>
      </div>
                )}
    </MainLayout>
  );
};

export default Leaderboard;
