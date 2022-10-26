import React from "react";
import TopMenu from "../TopMenu";
import PortfolioSideMenu from "../sidebars/PortfolioSideMenu";
import PortfolioMainContent from "../maincontent/PortfolioMainContent";

function PortfolioPage() {
  return (<div className="app-container">
  <TopMenu />
  <PortfolioMainContent />
  <PortfolioSideMenu />
  
  </div>);
}

export default PortfolioPage;
