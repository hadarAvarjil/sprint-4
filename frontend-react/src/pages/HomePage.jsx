import React from "react";
import { GreenDiv } from "../cmps/GreenDiv.jsx";
import { CatDivsContainer } from "../cmps/CatDivs.jsx";
import { PopularServices } from "../cmps/PopularServicesDiv.jsx";
import { VideoDiv } from "../cmps/VideoDiv.jsx";
import { CanAd } from "../cmps/CanAd.jsx";
import { MakeHappenAd } from "../cmps/MakeHappenAd.jsx";
import { PurpleAd } from "../cmps/PurpleSignUpAd.jsx";

export function HomePage() {

  // const [isSignDivVisible, setIsSignDivVisible] = useState(false);

  // const handleOpenSignDiv = () => {
  //   setIsSignDivVisible(true);
  // };

  // const handleCloseSignDiv = (e) => {
  //   // Close the modal only if clicking outside the sign-div
  //   if (e.target.className === "modal-overlay") {
  //     setIsSignDivVisible(false);
  //   }
  // };
  return (
    <div>
      <GreenDiv />
      <CatDivsContainer />
      <PopularServices />
      <VideoDiv />
      <CanAd />
      <MakeHappenAd />
      <PurpleAd />
    </div>
  );
}