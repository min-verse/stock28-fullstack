import React from "react";
import Logo from "../Logo";
import FollowingsMenuLinks from "./FollowingsMenuLinks";

function FollowingsSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <FollowingsMenuLinks />
    </aside>
  );
}

export default FollowingsSideMenu;
