import React from "react";
import TopMenu from "../TopMenu";
import AddStockMainContent from "../maincontent/AddStockMainContent";
import AddStockSideMenu from "../sidebars/AddStockSideMenu";

function AddStockPage() {
  return (<div className="app-container">
  <TopMenu />
  <AddStockMainContent />
  <AddStockSideMenu />
  
  </div>);
}

export default AddStockPage;
