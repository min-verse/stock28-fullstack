import React from "react";
import TopMenu from "../TopMenu";
import HomeSideMenu from "../sidebars/HomeSideMenu";
import MainContent from "../maincontent/MainContent";

function HomePage() {
  return (<div className="app-container">
  
  <TopMenu />
  <MainContent />
  <HomeSideMenu />
  
  </div>);
}

export default HomePage;
