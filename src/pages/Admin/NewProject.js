import React, { useState } from "react";
import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";

// Project Object Structure:
// const project = {
//   createdAt: "datetime",
//   imageUrl: "string",
//   projectName: "string",
//   mentors: [
//     {
//       index: "int",
//       fullName: "string",
//     },
//   ],
//   theme: {
//     top3: "string",
//     hilight: "string",
//   },
//   learnerGroups: [
//     {
//       groupName: "string",
//       avatar: "string",
//       points: {
//         taskIndex: "int",
//         taskPoint: "int",
//       },
//     },
//   ],
//   tasks: [
//     {
//       taskName: "string",
//       subTasks: [
//         {
//           subTaskName: "string",
//           point: "int",
//           isHidden: "bool",
//         },
//       ],
//       showSubTasks: "bool",
//       point: "int",
//       weight: "int",
//       isHidden: "bool",
//     },
//   ],
// };

function NewProject() {
  const [project, setProject] = useState({
    createdAt: new Date(),
    imageUrl: require("../../assets/images/uploadImage.png"),
    projectName: "",
    mentors: [],
    theme: {
      top3: "#000000",
      hilight: "#000000",
    },
    learnerGroups: [],
    tasks: [],
  });
  return (
    <div className="newProject">
      <NewProjectHeader
        project={project}
        setProject={setProject}
        header={"NEW PROJECT"}
      />
      <NewProjectBody project={project} setProject={setProject} />
      <NewProjectFooter
        project={project}
        setProject={setProject}
        header={"NEW PROJECT"}
      />
    </div>
  );
}

export default NewProject;
