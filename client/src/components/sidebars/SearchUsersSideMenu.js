import React from "react";
import Logo from "../Logo";
import SearchUsersMenuLinks from "./SearchUsersMenuLinks";

function SearchUsersSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <SearchUsersMenuLinks />
    </aside>
  );
}

export default SearchUsersSideMenu;
