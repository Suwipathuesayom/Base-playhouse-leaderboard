import React from "react";
import "../../assets/Styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";

function NewProject() {
  return (
    <div className="newProject">
      <NewProjectHeader />
      <NewProjectBody />
      <NewProjectFooter />
    </div>
  );
}

export default NewProject;
