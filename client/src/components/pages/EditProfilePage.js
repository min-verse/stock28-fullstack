import React from "react";
import TopMenu from "../TopMenu";
import EditProfileMainContent from "../maincontent/EditProfileMainContent";
import EditProfileSideMenu from "../sidebars/EditProfileSideMenu";

function EditProfilePage() {
  return (<div className="app-container">
  
  <TopMenu />
  <EditProfileMainContent />
  <EditProfileSideMenu />
  
  </div>);
}

export default EditProfilePage;
