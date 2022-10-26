import React from "react";
import Logo from "../Logo";
import AddStockMenuLinks from "./AddStockMenuLinks";

function AddStockSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <AddStockMenuLinks />
    </aside>
  );
}

export default AddStockSideMenu;
