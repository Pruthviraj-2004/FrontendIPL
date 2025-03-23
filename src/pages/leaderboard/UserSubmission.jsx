import React, { useEffect } from "react";
import { useState } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { getUserSubmission } from "../../services/leaderboard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";

import { images } from "../../constants";
import Breadcrumbs from "../../Components/Breadcrumbs";


const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const UserSubmission = () => {
  const userState = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const Breadcrumbsdata = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "User Submissions",
      link: "/usersubmission",
    },
  ]
  const handleItemClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the menu after selection, if desired
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () =>
      getUserSubmission({ username: userState?.userInfo?.user?.username }),
    queryKey: ["usersubmissions"],
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

  const fetchedData = data?.submissions; // Data fetched from the API
  const [showDetails, setShowDetails] = useState(
    Array(fetchedData?.length).fill(false)
  );

  const toggleDetails = (index) => {
    setShowDetails((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth === window.screen.availWidth &&
        window.innerHeight === window.screen.availHeight
      ) {
        // Window is maximized
        setShowDetails((prevState) => prevState.map(() => false)); // Set all elements to false
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])

  const recordsPerPage = 4;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  return (
    <MainLayout>
      <div className="flex flex-col my-auto mx-auto overflow-x-auto   h-fit" 
        style={{
          backgroundImage: `url(${images.bg24})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
          <Breadcrumbs data={Breadcrumbsdata} activeName="Leaderboard" />
        <div class="container max-w-6xl px-4 mx-auto sm:px-8">
          <div class="py-8 relative">
            <div class="flex flex-row justify-center items-center text-center w-full mb-1 sm:mb-0">
              <h2 class="text-xl uppercase text-center font-bold text-white">
                User Submissions
              </h2>
            </div>
            <div class="flex justify-center items-center py-4 w-90 mt-7 sm:ml-0 md:ml-0 lg:ml-0  scrollbar-hide sm:mx-5 md:mx-5">
              {/* left button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:animate-none mr-4 w-fit bg-gray-200 my-auto p-2  animate-pulse hidden sm:block"
              // className="cursor-pointer ml-4 my-auto p-2 w-[48px] animate-pulse sm:block hidden"
              >
                <FaArrowLeft color="black" />
              </button>
              <div class="flex flex-col sm:flex-row sm:flex-wrap items-center w-[100%]  border-gray-200 shadow-xl lg:ml-0 md:ml-0 sm:ml-0  scrollbar-hide rounded-lg">
                {fetchedData?.slice(startIndex, endIndex).map((record, index) => (
                  <div key={index} class="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 h-fit px-4 py-2">
                    {/* cards */}
                    <div class="bg-white shadow-lg border-2 rounded-lg px-6 py-4  xl:h-[500px]">
                      <div class="mb-4">
                        <p class="text-sm font-bold uppercase">Match</p>
                        <p class="text-lg text-gray-600">{record.match_teamA} vs {record.match_teamB}</p>
                      </div>
                      <div class="mb-4">
                        <p class="text-sm font-bold uppercase">Predicted Team</p>
                        <p class={`text-lg ${record.predictedteam === record.winner_team ? "text-green-500 font-semibold" : record.winner_team === null ? "text-gray-600" : "text-red-700 font-semibold"}`}>{record.predictedteam}</p>
                      </div>
                      <div class="mb-4  lg:block">
                        <p class="text-sm font-bold uppercase">Player of the Match</p>
                        <p class={`text-lg ${record.predictedpom === record.playerofmatch ? "text-green-500 font-semibold" : record.playerofmatch === null ? "text-gray-600" : "text-red-700 font-semibold"}`}>{record.predictedpom}</p>
                      </div>
                      <div class="mb-4  lg:block">
                        <p class="text-sm font-bold uppercase">Most Runs</p>
                        <p class={`text-lg ${record.predictedmr === record.mostrunsplayer ? "text-green-500 font-semibold" : record.mostrunsplayer !== null ? "text-red-700 font-semibold" : "text-gray-600"}`}>{record.predictedmr}</p>
                      </div>
                      <div class="mb-4  lg:block">
                        <p class="text-sm font-bold uppercase">Most Wickets</p>
                        <p class={`text-lg ${record.predictedmwk === record.mostwickettaker ? "text-green-500 font-semibold" : record.mostwickettaker === null ? "text-gray-600" : "text-red-700 font-semibold"}`}>{record.predictedmwk}</p>
                      </div>
                      <div>
                        <p class="text-sm font-bold uppercase">Score</p>
                        <p class="text-lg">{record.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* right arrow */}
              <button
                onClick={handleNextPage}
                disabled={endIndex >= fetchedData?.length}

                // className="cursor-pointer disabled:cursor-none mr-4 my-auto p-2 w-[48px] animate-pulse sm:block hidden"
                className="cursor-pointer disabled:cursor-not-allowed disabled:animate-none disabled:opacity-20 ml-4   w-fit bg-gray-200 my-auto p-2  animate-pulse hidden sm:block"
              >
                <FaArrowRight color="black" />
              </button>
            </div>
          </div>
        </div>
        {/* left right buttons for mobile view */}
        <div className="flex flex-row justify-center items-center gap-3 mb-5  ">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="cursor-pointer disabled:animate-none disabled:opacity-10  ml-4 my-auto p-2 bg-gray-200 w-fit  animate-pulse block sm:hidden"
          >
            <FaArrowLeft color="black" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={endIndex >= fetchedData?.length}

            className="cursor-pointer disabled:animate-none mr-4 w-fit disabled:opacity-10 bg-gray-200 my-auto p-2  animate-pulse block sm:hidden"
          >
            <FaArrowRight color="black" />
          </button>
        </div>
      </div>
    </MainLayout>

  );
};

export default UserSubmission;
