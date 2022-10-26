import React from "react";
import Logo from "../Logo";
import EditProfileMenuLinks from "./EditProfileMenuLinks";

function EditProfileSideMenu() {
  return (
    <aside className="side-bar open">
      <Logo />
      <EditProfileMenuLinks />
    </aside>
  );
}

export default EditProfileSideMenu;
