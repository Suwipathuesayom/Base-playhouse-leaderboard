import { Button } from "@mui/material";
import { db } from "../../config/firebase";
import React from "react";
import "../../assets/styles/NewProject.css";

import color from "../../constant/color";

function NewProjectFooter({ project, setProject, header }) {
  const handleAddNewProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    setProject(tempProject);
    console.log(tempProject);

    try {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        // .doc(db.createId())
        .add(tempProject);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    setProject(tempProject);

    try {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        .doc(tempProject.projectName)
        .update(tempProject);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="footer">
      <Button
        // className="button"
        style={{
          width: 150,
          fontSize: 24,
          borderRadius: 20,
          color: "white",
          backgroundColor: color.primaryOrange,
        }}
        disableElevation
        variant="contained"
        // onClick={async () => queryProject()}
      >
        ย้อนกลับ
      </Button>
      {header === "NEW PROJECT" && (
        <Button
          // className="button"
          style={{
            width: 150,
            fontSize: 24,
            borderRadius: 20,
            color: "white",
            backgroundColor: color.primaryOrange,
          }}
          disableElevation
          variant="contained"
          onClick={() => handleAddNewProject()}
        >
          สร้างเลย
        </Button>
      )}
      {header === "EDIT PROJECT" && (
        <Button
          // className="button"
          style={{
            width: 150,
            fontSize: 24,
            borderRadius: 20,
            color: "white",
            backgroundColor: color.primaryOrange,
          }}
          disableElevation
          variant="contained"
          onClick={() => handleUpdateProject()}
        >
          บันทึก
        </Button>
      )}
    </div>
  );
}

export default NewProjectFooter;

// const [data] = useState({
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
//       groupNumber: 0,
//       groupName: "Avengers",
//       avatar: "string",
//       points: [
//         {
//           taskIndex: 0,
//           taskPoint: 8,
//         },
//         {
//           taskIndex: 1,
//           taskPoint: 2,
//         },
//         {
//           taskIndex: 2,
//           taskPoint: 1,
//         },
//         {
//           taskIndex: 3,
//           taskPoint: 55,
//         },
//       ],
//     },
//     {
//       groupNumber: 1,
//       groupName: "Inhumans",
//       avatar: "string",
//       points: [
//         {
//           taskIndex: 0,
//           taskPoint: 8,
//         },
//         {
//           taskIndex: 1,
//           taskPoint: 2,
//         },
//         {
//           taskIndex: 2,
//           taskPoint: 1,
//         },
//         {
//           taskIndex: 3,
//           taskPoint: 55,
//         },
//       ],
//     },
//     {
//       groupNumber: 2,
//       groupName: "X-men",
//       avatar: "string",
//       points: [
//         {
//           taskIndex: 0,
//           taskPoint: 8,
//         },
//         {
//           taskIndex: 1,
//           taskPoint: 2,
//         },
//         {
//           taskIndex: 2,
//           taskPoint: 1,
//         },
//         {
//           taskIndex: 3,
//           taskPoint: 55,
//         },
//       ],
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
