import React from "react";
import TopMenu from "../TopMenu";
import SearchUsersMainContent from "../maincontent/SearchUsersMainContent";
import SearchUsersSideMenu from "../sidebars/SearchUsersSideMenu";
import AddStockSideMenu from "../sidebars/AddStockSideMenu";

function SearchUsersPage() {
  return (<div className="app-container">
  <TopMenu />
  <SearchUsersMainContent />
  <SearchUsersSideMenu />
  
  </div>);
}

export default SearchUsersPage;
