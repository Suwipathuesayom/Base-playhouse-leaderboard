import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EditNewHeader from "./EditNewHeader";
import ProjectStatusAlert from "../../../components/ProjectStatusAlert";
import EditProjectBody from "./EditProjectBody";
import { Stack } from "@mui/material";
import EditProjectNameAndColor from "./EditProjectNameAndColor";
import EditProjectFooter from "./EditProjectFooter";
import { db } from "../../../config/firebase";
import SplashScreen from "../../../components/SplashScreen";
function EditProjectRes() {
  function queryProjectFromProjectName(projectName, setProject) {
    try {
      db.collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectName)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            setProject(doc.data());
          });
        });
    } catch (error) {
      console.log(error);
      setProject({});
    }
  }

  // const [project, setProject] = useState({
  //   createdAt: new Date(),
  //   // imageUrl: require("../../assets/images/uploadImage.png"),
  //   projectName: "",
  //   mentors: [],
  //   theme: {
  //     top3: "#000000",
  //     hilight: "#000000",
  //   },
  //   learnerGroups: [],
  //   tasks: [],
  // });
  const [project, setProject] = useState({});
  const [editProjectStatus, setEditProjectStatus] = useState("warning");

  if (!!Object.keys(project).length) {
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
            <EditProjectBody project={project} setProject={setProject} />
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
  } else {
    queryProjectFromProjectName("Borderlands", setProject);
    return <SplashScreen />;
  }
}

export default EditProjectRes;
