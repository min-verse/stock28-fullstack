import React from "react";
import Logo from "../Logo";
import PortfolioMenuLinks from "./PortfolioMenuLinks";

function PortfolioSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <PortfolioMenuLinks />
    </aside>
  );
}

export default PortfolioSideMenu;
