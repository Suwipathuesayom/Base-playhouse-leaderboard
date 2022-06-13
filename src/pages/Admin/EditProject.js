import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
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

function EditProject() {
  // const [project, setProject] = useState({
  //   createdAt: new Date(),
  //   imageUrl:
  //     "https://i.pinimg.com/originals/7d/bf/df/7dbfdf56a94c044e0684aba891816a37.jpg",
  //   projectName: "Marvel",
  //   mentors: [
  //     {
  //       index: 1,
  //       fullName: "Stan Lee",
  //     },
  //     {
  //       index: 2,
  //       fullName: "Thanat Raktham",
  //     },
  //   ],
  //   theme: {
  //     top3: "#ff0000",
  //     hilight: "#ffffff",
  //   },
  //   learnerGroups: [
  //     {
  //       groupName: "Avengers",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "Inhumans",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "X-men",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //   ],
  //   tasks: [
  //     {
  //       taskName: "สู้ Alien บุกโลก",
  //       subTasks: [
  //         {
  //           subTaskName: "ยืนล้อมวงเท่",
  //           point: 2,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "จับ Loki",
  //           point: 7,
  //           isHidden: false,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 9,
  //       weight: 10,
  //       isHidden: false,
  //     },
  //     {
  //       taskName: "เอาชนะ Ultron",
  //       subTasks: [
  //         {
  //           subTaskName: "ยกเมืองขึ้นฟ้า",
  //           point: 1,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "เอาเมืองไปไว้ที่เดิม",
  //           point: 1,
  //           isHidden: true,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 2,
  //       weight: 20,
  //       isHidden: false,
  //     },
  //   ],
  // });
  const [project, setProject] = useState(null);

  useEffect(() => {
    const queryProject = async () => {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        .where("projectName", "==", "DC")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setProject(doc.data());
            console.log(doc.data());
          });
        });
    };
    queryProject();
  }, []);

  if (project) {
    return (
      <div className="newProject">
        <NewProjectHeader
          project={project}
          setProject={setProject}
          header={"EDIT PROJECT"}
        />
        <NewProjectBody project={project} setProject={setProject} />
        <NewProjectFooter
          project={project}
          setProject={setProject}
          // queryProject={queryProject}
        />
      </div>
    );
  } else {
    return <div className="newProject">Loading</div>;
  }
}

export default EditProject;
