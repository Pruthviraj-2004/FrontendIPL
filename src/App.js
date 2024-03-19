import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import ProfilePage from "./pages/ProfilePage";
import FixturePage from "./pages/fixtures/fixturePage";
import PredictMatch from "./pages/fixtures/predict";
import UserSubmission from "./pages/leaderboard/UserSubmission";
import Authform from "./pages/Authform";
import LeaderboardForm from "./pages/leaderboard/BoardParticipate";
import Intro from "./pages/Homepage/Intro";
import { useSelector } from "react-redux";
import AboutUsPage from "./pages/AboutUs";
import Terms from "./pages/Terms";
// import {,Routes,Route,Link} from 'react-router-dom';

function App() {
  
  const userState = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="App bg-gray-100  w-screen overflow-hidden">
      <HashRouter basename='/'>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/register" element={<Authform />} />
          <Route exact path="/board" element={<Leaderboard />} />
          {userState?.userInfo && (
            <Route exact path="/usersubmission" element={<UserSubmission />} />
          )}
          <Route exact path="/fixtures" element={<FixturePage />} />
          <Route exact path="/fixtures/:matchId" element={<PredictMatch />} />
          <Route exact path="/lbparticipate" element={<LeaderboardForm />} />
          {isSmallScreen && (
            <Route exact path="/user" element={<ProfilePage />} />
          )}
          <Route exact path="/aboutus" element={<AboutUsPage />} />
          <Route exact path="/terms" element={<Terms />}></Route>
        
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
