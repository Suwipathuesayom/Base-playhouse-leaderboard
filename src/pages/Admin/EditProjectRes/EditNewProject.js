import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EditNewHeader from "./EditNewHeader";
import ProjectStatusAlert from "../../../components/ProjectStatusAlert";
import EditProjectBody from "./EditProjectBody";
import { Stack } from "@mui/material";
import EditProjectNameAndColor from "./EditProjectNameAndColor";
import EditProjectFooter from "./EditProjectFooter";

function EditProjectRes() {
  const [project, setProject] = useState({
    createdAt: new Date(),
    // imageUrl: require("../../assets/images/uploadImage.png"),
    projectName: "",
    mentors: [],
    theme: {
      top3: "#000000",
      hilight: "#000000",
    },
    learnerGroups: [],
    tasks: [],
  });
  const [editProjectStatus, setEditProjectStatus] = useState("warning");
  return (
    <div>
      <Navbar />
      <div className="newProject">
        <Stack flexDirection={"row"}>
          <div className="alert">
            <ProjectStatusAlert
              editProjectStatus={editProjectStatus}
              setEditProjectStatus={setEditProjectStatus}
              action={"edit"}
            />
          </div>
          <Stack flexDirection={"columns"} marginLeft={"20px"}>
            <EditNewHeader />
            <EditProjectNameAndColor />
          </Stack>
          <EditProjectBody />
        </Stack>
      </div>
      <EditProjectFooter
        project={project}
        setProject={setProject}
        header={"NEW PROJECT"}
        setEditProjectStatus={setEditProjectStatus}
      />
    </div>
  );
}

export default EditProjectRes;
