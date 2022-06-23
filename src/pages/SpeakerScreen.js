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
import { TablePointHeader } from "../assets/styles/TypographyStyles";

function SpeakerScreen() {
  const [data, setData] = useState();
  const { projectNameParams } = useParams();

  const queryProject = (projectName) => {
    db.collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          let tempData = doc.data();
          tempData.learnerGroups = tempData.learnerGroups.sort((lhs, rhs) => {
            return rhs.totalPoint - lhs.totalPoint;
          });
          setData(tempData);
        });
      });
  };

  const getRankColor = (index, top3) => {
    // const top3 = "#00FF00";
    if (index === 0) {
      return top3 + "99";
    } else if (index === 1) {
      return top3 + "77";
    } else if (index === 2) {
      return top3 + "55";
    } else {
      return "#88838355";
    }
  };

  const checkIfIntIsNotZero = (number, condition) => {
    return condition ? number : 0;
  };

  if (data) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          paddingY: "1%",
          // overflowX: "Overlay",
          // backgroundColor: "brown",
        }}
      >
        <Stack
          display={"flex"}
          flexDirection={"row"}
          height={200}
          alignItems={"center"}
          paddingX={"1%"}
          // backgroundColor={"red"}
        >
          <Box
            component={"img"}
            src={data?.imageUrl}
            alt={"not found"}
            sx={{ width: 200, height: 200, marginRight: "30px" }}
          />
          <Typography
            sx={{
              fontSize: 84,
              fontWeight: 200,
              fontFamily: "Russo One",
              marginRight: "30px",
            }}
          >
            LEADERBOARD
          </Typography>
          <Box
            sx={{
              width: 10,
              height: "40%",
              marginRight: "30px",
              backgroundColor: color.primaryOrange,
            }}
          />
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: 900,
              marginRight: "30px",
              paddingTop: "30px",
              color: color.secondaryGrey,
            }}
          >
            PROJECT {data?.projectName.toUpperCase()}
          </Typography>
        </Stack>
        <Stack
          // backgroundColor={"pink"}
          direction={"row"}
          // width={3000}
          // overflowX={"overlay"}
          padding={"1%"}
        >
          <Stack
            backgroundColor={color.primaryBlack}
            height={"100%"}
            width={"50%"}
            minWidth={1000}
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
                <TableHeaderText flex={0.5}>RANK</TableHeaderText>
                <Typography sx={{ flex: 0.5 }} />
                <TableHeaderText flex={0.75}>GROUP</TableHeaderText>
                <TableHeaderText flex={3}>NAME</TableHeaderText>
                <TableHeaderText flex={1}>TOTAL</TableHeaderText>
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
              {data?.learnerGroups.map((group, index) => (
                <Stack
                  key={index}
                  direction="row"
                  // flex={1}
                  flexDirection={"row"}
                  height={48}
                  alignItems={"center"}
                  borderRadius={3}
                  marginTop={"15px"}
                  // paddingX={"15px"}
                  backgroundColor={getRankColor(index, data.theme.top3)}
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
                    {/* <AccountCircle sx={{ fontSize: 36, color: "white" }} /> */}
                    <Box
                      component={"img"}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 36,
                      }}
                      // src={require(`../assets/image/avatar${
                      //   (group.groupIndex % 3) + 1
                      // }.png`)}
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
                    {group.totalPoint > 0 ? group.totalPoint : 0}
                  </TableContentText>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            height={"100%"}
            flexGrow={1}
            // maxWidth={500}
            // width={3000}
            // minWidth={500}
            paddingBottom={"15px"}
            sx={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
            paddingX={"15px"}
            backgroundColor={color.primaryBlack}
            // overflowX={"scroll"}
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
                width={200 * data?.tasks.length}
              >
                {data?.tasks.map((task, taskIndex) => {
                  if (!task?.isHidden) {
                    return (
                      <TableContentText flex={1} key={taskIndex}>
                        {limitStringLength(task.taskName, 19)}
                      </TableContentText>
                    );
                  }
                  return <div></div>;
                })}
              </Stack>
            </Stack>

            {data?.learnerGroups.map((group, index) => (
              <Stack
                direction="row"
                key={index}
                // flex={1}
                flexDirection={"row"}
                height={48}
                width={200 * data?.tasks.length}
                alignItems={"center"}
                borderRadius={3}
                marginTop={"15px"}
                backgroundColor={"#ccc"}
                // paddingX={"15px"}
              >
                {!!group.points.length &&
                  group.points.map((point, pointIndex) => {
                    if (!data.tasks[pointIndex].isHidden) {
                      return (
                        <TablePointHeader flex={1} key={pointIndex}>
                          {checkIfIntIsNotZero(
                            point.taskPoint,
                            point.isChecked
                          )}
                        </TablePointHeader>
                      );
                    }
                    return <div></div>;
                  })}
                {!!!group.points.length &&
                  data?.tasks.map((task, taskIndex) => {
                    if (!task.isHidden) {
                      return (
                        <TablePointHeader flex={1} key={taskIndex}>
                          {0}
                        </TablePointHeader>
                      );
                    }
                    return <div></div>;
                  })}
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

export default SpeakerScreen;
