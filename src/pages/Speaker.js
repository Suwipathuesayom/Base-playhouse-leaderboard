import React, { useState } from "react";
import "../assets/styles/SpeakerScreen.css";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import color from "../constant/color";
import { Box, Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import { TableHeaderText } from "../assets/styles/TypographyStyles";
import limitStringLength from "../components/Functions/limitStringLength";
import { TableContentText } from "../assets/styles/TypographyStyles";
import { TablePointHeaderText } from "../assets/styles/TypographyStyles";
import getRankColor from "../components/Functions/getRankColor";
import PresentationHeader from "../components/PresentationHeader";

function Speaker() {
  const [project, setProject] = useState();
  const { projectNameParams } = useParams();

  const queryProject = (projectName) => {
    try {
      db.collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectName)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let tempProject = doc.data();
            tempProject.learnerGroups = tempProject.learnerGroups.sort(
              (lhs, rhs) => {
                return rhs.totalWeightPoint - lhs.totalWeightPoint;
              }
            );
            setProject(tempProject);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (project) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          paddingY: "1%",
        }}
      >
        <PresentationHeader project={project} />
        <Stack direction={"row"} padding={"1%"}>
          <Stack
            className="fixed_header"
            backgroundColor={color.primaryBlack}
            height={"100%"}
            width={"50vw"}
            minWidth={600}
            paddingBottom={"15px"}
            sx={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          >
            <Stack
              justifyContent={"center"}
              height={"80px"}
              paddingX={"10px"}
              backgroundColor={color.primaryBlack}
              sx={{
                borderTopLeftRadius: 20,
              }}
            >
              <Stack direction={"row"}>
                <TableHeaderText
                  color={getRankColor(0, project.theme.top3)}
                  flex={0.5}
                >
                  RANK
                </TableHeaderText>
                <Typography sx={{ flex: 0.5 }} />
                <TableHeaderText
                  color={getRankColor(0, project.theme.top3)}
                  flex={0.75}
                >
                  GROUP
                </TableHeaderText>
                <TableHeaderText
                  color={getRankColor(0, project.theme.top3)}
                  flex={3}
                >
                  NAME
                </TableHeaderText>
                <TableHeaderText
                  color={getRankColor(0, project.theme.top3)}
                  flex={1}
                >
                  TOTAL
                </TableHeaderText>
              </Stack>
            </Stack>
            <Stack
              flexGrow={1}
              paddingX={"10px"}
              // backgroundColor={"blue"}
            >
              <Box
                component={"img"}
                sx={{
                  width: 40,
                  height: 48,
                }}
                src={require("../assets/images/crown1.png")}
                position={"absolute"}
              />
              {project?.learnerGroups.map((group, index) => (
                <Stack
                  key={index}
                  direction="row"
                  flexDirection={"row"}
                  height={48}
                  alignItems={"center"}
                  borderRadius={3}
                  marginTop={"15px"}
                  backgroundColor={getRankColor(index, project.theme.top3)}
                >
                  <TableContentText flex={0.5}> {index + 1}</TableContentText>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 0.5,
                      justifyContent: "center",
                      // backgroundColor: "black",
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
                  <TableContentText flex={0.75}>
                    {group.groupIndex}
                  </TableContentText>
                  <TableContentText flex={3}>
                    {group.groupName}
                  </TableContentText>
                  <TableContentText flex={1}>
                    {group.totalWeightPoint}
                  </TableContentText>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            height={"100%"}
            flexGrow={1}
            paddingBottom={"15px"}
            overflow={"scroll"}
            sx={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
            paddingX={"15px"}
            backgroundColor={color.primaryBlack}
          >
            <Stack
              justifyContent={"center"}
              height={"80px"}
              backgroundColor={color.primaryBlack}
              sx={{
                borderTopRightRadius: "20px",
              }}
            >
              <Stack
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                width={200 * project?.tasks.length}
              >
                {project?.tasks
                  .filter((task) => !task.isHidden)
                  .map((task, taskIndex) => {
                    return (
                      <TableContentText flex={1} key={taskIndex}>
                        {limitStringLength(task.taskName, 19)}
                      </TableContentText>
                    );
                  })}
              </Stack>
            </Stack>

            {project?.learnerGroups.map((group, index) => (
              <Stack
                direction="row"
                key={index}
                flexDirection={"row"}
                height={48}
                width={200 * project?.tasks.length}
                alignItems={"center"}
                borderRadius={3}
                marginTop={"15px"}
                backgroundColor={"#ccc"}
              >
                {group.points.map((point, pointIndex) => (
                  <TablePointHeaderText flex={1} key={pointIndex}>
                    {point.taskWeightPoint}
                  </TablePointHeaderText>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}

export default Speaker;
