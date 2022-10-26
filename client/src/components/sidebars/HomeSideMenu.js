import React from "react";
import Logo from "../Logo";
import HomeMenuLinks from "./HomeMenuLinks";

function HomeSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <HomeMenuLinks />
    </aside>
  );
}

export default HomeSideMenu;
