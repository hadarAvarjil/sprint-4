import React from "react";
import { GreenDiv } from "../cmps/GreenDiv.jsx";
import { CatDivsContainer } from "../cmps/CatDivs.jsx";
import { PopularServices } from "../cmps/PopularServicesDiv.jsx";
import { VideoDiv } from "../cmps/VideoDiv.jsx";
import { CanAd } from "../cmps/CanAd.jsx";
import { MakeHappenAd } from "../cmps/MakeHappenAd.jsx";
import { PurpleAd } from "../cmps/PurpleSignUpAd.jsx";

export function HomePage() {
 
  return (
    <div className="home-body">
      <GreenDiv />
      {/* <CatDivsContainer /> */}
      {/* <PopularServices /> */}
      {/* <MakeHappenAd /> */}
      {/* <VideoDiv /> */}
      <CanAd />
      <PurpleAd />
    </div>
  );
}