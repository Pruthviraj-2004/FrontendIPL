import { fadeIn } from "../../utils/motion";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { getTodayMatch } from "../../services/fixtures";
import React, { useEffect, useRef } from "react";
import { MdLeaderboard } from "react-icons/md";
import MainLayout from "../../Components/MainLayout";

import { images } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ScrollDownArrow from "../../Components/ScrollDown";
import HeroSection from "./Hero";
import News from "./News";
import Card from './Card'
import Quote from "./Quote";

const textss = [
  { index: 1, title: "Browse the upcoming matches and make your predictions." },
  { index: 2, title: "Earn points based on the accuracy of your predictions." },
  { index: 3,title: "Check the leaderboard to see your ranking among other players." },
  { index: 4, title: "Enjoy the thrill of predicting and winning!" },
];

const Introo = () => {
  const navigate = useNavigate("/");

  const {
    data: dataa,
    isLoading,
    refetch
  } = useQuery({
    queryFn:async () => {
      return await getTodayMatch();
    },
    queryKey: ["todaymatch"],
  });

  useEffect(()=> {
    refetch()
  },[isLoading])

  const dataaa = dataa?.matches;
 
  const sectionRefs = {
    intro: useRef(null),
    quote: useRef(null),
    about: useRef(null),
    howItWorks: useRef(null),
    fixtures: useRef(null),
    leaderboard: useRef(null),
  };

  const [showIntroArrow, setShowIntroArrow] = useState(false);
  const [showAboutArrow, setShowAboutArrow] = useState(false);
  const [showQuoteArrow, setQuoteArrow] = useState(false);
  const [showHowItWorksArrow, setShowHowItWorksArrow] = useState(false);
  const [showFixturesArrow, setShowFixturesArrow] = useState(false);
  const [showLeaderboardArrow, setShowLeaderboardArrow] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        switch (entry.target) {
          case sectionRefs.intro.current:
            setShowIntroArrow(entry.isIntersecting);
            break;
          case sectionRefs.about.current:
            setShowAboutArrow(entry.isIntersecting);
            break;
          case sectionRefs.quote.current:
            setQuoteArrow(entry.isIntersecting);
            break;
          case sectionRefs.howItWorks.current:
            setShowHowItWorksArrow(entry.isIntersecting);
            break;
          case sectionRefs.fixtures.current:
            setShowFixturesArrow(entry.isIntersecting);
            break;
          case sectionRefs.leaderboard.current:
            setShowLeaderboardArrow(entry.isIntersecting);
            break;
          
          default:
            break;
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    observer.observe(sectionRefs.intro.current);
    observer.observe(sectionRefs.about.current);
    observer.observe(sectionRefs.quote.current);
    observer.observe(sectionRefs.howItWorks.current);
    observer.observe(sectionRefs.fixtures.current);
    observer.observe(sectionRefs.leaderboard.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <MainLayout>
        <section className="h-full w-screen max-w-screen scrollbar-hide">
          <div className={` w-screen max-w-screen  mt-20 flex flex-col  `}>
            <div
              ref={sectionRefs.intro}
              style={{
                backgroundImage: `url(${images.bg23})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <HeroSection />

              {showIntroArrow && (
                <ScrollDownArrow targetRef={sectionRefs.quote} />
              )}
            </div>
            
            <div ref={sectionRefs.fixtures} className=" w-screen max-w-screen">
              <motion.h2
                variants={fadeIn("right", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className={`${styles.sectionHeadText} text-left mt-10 ml-4`}
              >
                Today's fixtures&nbsp;
              </motion.h2>
              <div className="lg:flex lg:flex-row lg:w-screen lg:gap-x-1">
                <div
                  className="scrollable-wrapper scrollbar-hide mx-5 py-5 flex flex-row whitespace-nowrap gap-x-4 lg:gap-x-15"
                  style={{ width: "100vw", overflowX: "auto" }}
                >
                  {dataaa &&
                    dataaa?.map((match, index) => {
                      const matchDate = new Date(match.matchdate);
                      const currentDate = new Date();
                      const isMatchCompleted = matchDate < currentDate;
                      const currentTime =
                        currentDate.getHours() * 60 + currentDate.getMinutes();

                      const matchTimeParts = match.matchtime.split(":");
                      const matchHours = parseInt(matchTimeParts[0], 10);
                      const matchMinutes = parseInt(matchTimeParts[1], 10);

                      let isTodayBeforeMatchTime = false;
                      if (
                        currentDate.toDateString() === matchDate.toDateString()
                      ) {
                        const matchTimeInMinutes =
                          matchHours * 60 + matchMinutes;
                        isTodayBeforeMatchTime =
                          currentTime < matchTimeInMinutes;
                      }
                      console.log(match);

                      if (!isMatchCompleted && !isTodayBeforeMatchTime) {
                        return <Card data={match} />;
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
              {showFixturesArrow && (
                <ScrollDownArrow targetRef={sectionRefs.about} />
              )}
            </div>
            <div ref={sectionRefs.quote} className=" w-screen max-w-screen">
              <Quote />
              {showQuoteArrow && (
                <ScrollDownArrow targetRef={sectionRefs.fixtures} />
              )}
            </div>
            
            <motion.div
              ref={sectionRefs.about}
              animate="show"
              initial="hidden"
              className="w-screen max-w-screen mx-auto px-5 lg:px-10 my-5"
            >
              <motion.p
                variants={fadeIn("up", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className="text-[#6b042c] text-start font-semibold"
              >
                About
              </motion.p>
              <motion.p
                className={`${styles.sectionHeadText}  text-left  mb-5`}
              >
                Predictive Play
              </motion.p>
              <div>
                <p className="text-justify  font-medium text-lg">
                  Welcome to our prediction website, where the excitement of
                  sports meets the thrill of forecasting outcomes! Whether
                  you're a seasoned predictor or just starting out, our platform
                  offers an immersive experience that's both engaging and
                  rewarding. Before you dive into the action, here's a quick
                  overview of how it all works:
                </p>
              </div>
              {showAboutArrow && (
                <ScrollDownArrow targetRef={sectionRefs.howItWorks} />
              )}
            </motion.div>
            <div
              ref={sectionRefs.howItWorks}
              className="w-screen max-w-screen bg-[#eeedf0] mx-auto px-5 lg:px-10 my-5  "
            >
              <div className="">
                <h2 className={`${styles.sectionHeadText} mt-5 text-left`}>
                  How it works&nbsp;?
                </h2>
                <div className="flex">
                  <ol>
                    {textss.map((text, index) => (
                      <li className="text-left text-lg   my-4">
                        <p className="flex flex-row">
                          <p className=" rounded-full text-center lg:mr-2 justify-center w-10 lg:w-7 bg-none font-bold text-pink-900 lg:bg-pink-500">
                            {index + 1}
                          </p>
                          &nbsp;
                          <p className="font-medium text-black">{text.title}</p>
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              {showHowItWorksArrow && (
                <ScrollDownArrow targetRef={sectionRefs.leaderboard} />
              )}
            </div>
            <div
              ref={sectionRefs.leaderboard}
              className="w-screen max-w-screen mx-auto px-5 lg:px-10 my-5"
            >
              <motion.div>
                <div className="w-14 h-14 my-2 hover:opacity-85 bg-slate-300 flex justify-center items-center rounded-full px-2">
                  <div
                    onClick={() => {
                      navigate("/board");
                    }}
                    className="w-12 h-12 hover:cursor-pointer bg-slate-200 flex justify-center items-center rounded-full px-2"
                  >
                    <MdLeaderboard size={28} color="blue" />
                  </div>
                </div>
                <h5 className="text-[#6b042c] text-start font-semibold">
                  Check out
                </h5>
                <h3 className={`${styles.sectionHeadText}  text-left  mb-5`}>
                  LeaderBoard
                </h3>
                <p className={` text-left text-lg font-semibold`}>
                  Keep an eye on the{" "}
                  <b className="text-[#38277e]">leaderboard </b>
                  to see how you stack up against other players. The more
                  accurate your predictions, the higher you'll climb!
                </p>
              </motion.div>
            </div>
            <div className="w-screen max-w-screen mx-5">
              <p className={`${styles.sectionHeadText} mt-5 text-left ml-5`}>News</p>
              <News />
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Introo;