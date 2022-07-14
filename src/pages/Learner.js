import {
  Box,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import "../assets/styles/Learner.css";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import color from "../constant/color";
import SplashScreen from "../components/SplashScreen";
import {
  TableContentText,
  TableHeaderText,
} from "../assets/styles/TypographyStyles";
import getRankColor from "../components/Functions/getRankColor";
import PresentationHeader from "../components/PresentationHeader";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// const auth = firebase.auth();

function Learner() {
  const [project, setProject] = useState();
  // const [project, setProject] = useState({
  //   createdAt: new Date(),
  //   id: "A0Z721kn9nJ7Ybf8UdTP",
  //   imageUrl:
  //     "https://img.wongnai.com/p/1920x0/2019/12/22/21c03802af7748469653324cea1b533e.jpg",
  //   learnerGroups: [
  //     {
  //       avatar: "https://source.unsplash.com/random/64x64/?avatar",
  //       groupIndex: 1,
  //       groupName: "Avengers",
  //       points: [
  //         {
  //           isHidden: false,
  //           subTasks: [],
  //           taskPoint: 1, // 0.8
  //           taskWeightPoint: 0.8,
  //         },
  //         {
  //           isHidden: false,
  //           subTasks: [
  //             {
  //               isHidden: false,
  //               subTaskPoint: 2,
  //               subTaskWeightPoint: 0.6,
  //             },
  //             {
  //               isHidden: true,
  //               subTaskPoint: 3,
  //               subTaskWeightPoint: 0.18,
  //             },
  //             {
  //               isHidden: false,
  //               subTaskPoint: 5,
  //               subTaskWeightPoint: 0.5,
  //             },
  //           ],
  //           taskPoint: 7,
  //           taskWeightPoint: 1.1,
  //         },
  //       ],
  //       currentRankIndex: 2,
  //       totalPoint: 8,
  //       totalWeightPoint: 1.9,
  //     },
  //     {
  //       avatar: "https://source.unsplash.com/random/64x64/?avatar",
  //       groupIndex: 2,
  //       groupName: "Inhuman",
  //       points: [
  //         {
  //           isHidden: false,
  //           subTasks: [],
  //           taskPoint: 1, // 0.8
  //           taskWeightPoint: 0.8,
  //         },
  //         {
  //           isHidden: false,
  //           subTasks: [
  //             {
  //               isHidden: false,
  //               subTaskPoint: 2,
  //               subTaskWeightPoint: 0.6,
  //             },
  //             {
  //               isHidden: true,
  //               subTaskPoint: 3,
  //               subTaskWeightPoint: 0.18,
  //             },
  //             {
  //               isHidden: false,
  //               subTaskPoint: 5,
  //               subTaskWeightPoint: 0.5,
  //             },
  //           ],
  //           taskPoint: 7,
  //           taskWeightPoint: 1.1,
  //         },
  //       ],
  //       currentRankIndex: 3,
  //       totalPoint: 1,
  //       totalWeightPoint: 0.9,
  //     },
  //     {
  //       avatar: "https://source.unsplash.com/random/64x64/?avatar",
  //       groupIndex: 3,
  //       groupName: "X-men",
  //       points: [
  //         {
  //           isHidden: false,
  //           subTasks: [],
  //           taskPoint: 1, // 0.8
  //           taskWeightPoint: 0.8,
  //         },
  //         {
  //           isHidden: false,
  //           subTasks: [
  //             {
  //               isHidden: false,
  //               subTaskPoint: 2,
  //               subTaskWeightPoint: 0.6,
  //             },
  //             {
  //               isHidden: true,
  //               subTaskPoint: 3,
  //               subTaskWeightPoint: 0.18,
  //             },
  //             {
  //               isHidden: false,
  //               subTaskPoint: 5,
  //               subTaskWeightPoint: 0.5,
  //             },
  //           ],
  //           taskPoint: 7,
  //           taskWeightPoint: 1.1,
  //         },
  //       ],
  //       currentRankIndex: 1,
  //       totalPoint: 1,
  //       totalWeightPoint: 2.5,
  //     },
  //   ].sort((lhs, rhs) => {
  //     return (
  //       parseFloat(rhs.totalWeightPoint) - parseFloat(lhs.totalWeightPoint)
  //     );
  //   }),
  //   mentors: [
  //     {
  //       fullName: "Stan Lee",
  //       id: 0,
  //     },
  //     {
  //       fullName: "Adam WestVieeelllelele",
  //       id: 1,
  //     },
  //   ],
  //   projectName: "Marvel",
  //   tasks: [
  //     {
  //       isHidden: false,
  //       showSubTasks: true,
  //       subTasks: [],
  //       taskName: "Bannish Loki",
  //       weight: 80,
  //     },
  //     {
  //       isHidden: false,
  //       showSubTasks: true,
  //       subTasks: [
  //         {
  //           isHidden: false,
  //           subTaskName: "Lift Sokovia",
  //           weight: 30,
  //         },
  //         {
  //           isHidden: true,
  //           subTaskName: "Vision is born",
  //           weight: 60,
  //         },
  //         {
  //           isHidden: false,
  //           subTaskName: "We Won",
  //           weight: 10,
  //         },
  //       ],
  //       taskName: "Defeat Ultron",
  //       weight: 20,
  //     },
  //   ],
  //   theme: {
  //     hilight: "#00ff00",
  //     top3: "#ff0000",
  //   },
  // });
  const { projectNameParams, groupNameParams } = useParams();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  let DISPLAY_LIMIT = Number.MAX_SAFE_INTEGER;
  if (groupNameParams) {
    DISPLAY_LIMIT = smallScreen ? 5 : 10;
  }

  const queryProject = (projectName) => {
    db.collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
      .collection("project")
      .where("projectName", "==", projectName)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          let tempProject = doc.data();
          tempProject.learnerGroups = tempProject.learnerGroups.sort(
            (lhs, rhs) => {
              return (
                parseFloat(rhs.totalWeightPoint) -
                parseFloat(lhs.totalWeightPoint)
              );
            }
          );
          setProject(tempProject);
        });
      });
  };

  const isParamGroupName = (groupName) => {
    return groupNameParams === groupName;
  };

  const ThreeDotBox = () => (
    <Box
      display={"flex"}
      flexDirection={"row"}
      height={48}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"15px"}
    >
      <MoreVert
        style={{
          fontSize: 40,
          color: "white",
        }}
      />
    </Box>
  );

  const RankBox = ({ group, rankIndex }) => {
    console.log(rankIndex, group.currentRankIndex);
    return (
      <Slide
        direction={
          rankIndex >= group.currentRankIndex
            ? "up"
            : rankIndex < group.currentRankIndex
            ? "down"
            : null
        }
        in={true}
      >
        <Box
          direction="row"
          display={"flex"}
          flexDirection={"row"}
          height={48}
          alignItems={"center"}
          borderRadius={3}
          marginTop={"15px"}
          // paddingX={"15px"}
          sx={{
            border: isParamGroupName(group.groupName) ? 3 : null,
            borderColor: isParamGroupName(group.groupName)
              ? project.theme.hilight === "#000000"
                ? "lime"
                : project.theme.hilight
              : null,
          }}
          backgroundColor={() => getRankColor(rankIndex, project.theme.top3)}
          // backgroundColor={"blue"}
        >
          <TableContentText flex={1} fontSize={smallScreen ? 18 : 28}>
            {rankIndex + 1}
          </TableContentText>
          {!smallScreen && (
            <Box
              sx={{
                display: "flex",
                flex: 0.5,
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <Box
                component={"img"}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 36,
                }}
                src={`https://picsum.photos/200/300?random=${group.groupIndex}`}
                alt={"not found"}
              />
            </Box>
          )}
          {!smallScreen && (
            <TableContentText flex={0.5}>{group.groupIndex}</TableContentText>
          )}
          <TableContentText flex={5} fontSize={smallScreen ? 18 : 28}>
            {group.groupName}
          </TableContentText>
          {!smallScreen && <TableContentText flex={1} />}
          <TableContentText flex={1} fontSize={smallScreen ? 18 : 28}>
            {group.totalWeightPoint > 0 ? group.totalWeightPoint : 0}
          </TableContentText>
        </Box>
      </Slide>
    );
  };

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  if (project) {
    let foundGroupWithinDisplayLimit = false;
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          paddingY: "1%",
        }}
      >
        <PresentationHeader project={project} />
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact rowData={rowData} animateRows={true}>
            <AgGridColumn field="make"></AgGridColumn>
            <AgGridColumn field="model"></AgGridColumn>
            <AgGridColumn field="price"></AgGridColumn>
          </AgGridReact>
        </div>
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}

export default Learner;
