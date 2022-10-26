import React from "react";
import TopMenu from "../TopMenu";
import FollowingsSideMenu from "../sidebars/FollowingsSideMenu";
import FollowingsMainContent from "../maincontent/FollowingsMainContent";

function FollowingsPage() {
  return (<div className="app-container">
  <TopMenu />
  <FollowingsMainContent />
  <FollowingsSideMenu />
  
  </div>);
}

export default FollowingsPage;
