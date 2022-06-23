import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "../assets/styles/Learner.css";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { Box } from "@mui/material";
import color from "../constant/color";
import SplashScreen from "../components/SplashScreen";

function Learner() {
  const [data, setData] = useState();
  const { projectNameParams, groupNameParams } = useParams();

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
          paddingX={"2%"}
          marginBottom={"2%"}
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
          backgroundColor={color.primaryBlack}
          direction={"row"}
          width={"100%"}
          overflowX={"overlay"}
          padding={"1%"}
        >
          <Typography
            sx={{
              flex: 0.5,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              fontFamily: "Raleway",
            }}
          >
            RANK
          </Typography>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              // backgroundColor: "black",
            }}
          ></Box>
          <Typography
            sx={{
              flex: 0.5,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              fontFamily: "Raleway",
            }}
          >
            GROUP
          </Typography>
          <Typography
            sx={{
              flex: 5,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              fontFamily: "Raleway",
            }}
          >
            NAME
          </Typography>
          <Typography
            sx={{
              flex: 2,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              fontFamily: "Raleway",
            }}
          >
            TOTAL
          </Typography>
          {/* <Typography
            sx={{
              flex: 2,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              fontFamily: "Raleway",
            }}
          >
            POINT
          </Typography> */}
        </Stack>
        <Stack
          backgroundColor={color.primaryBlack}
          height={"70%"}
          width={"100%"}
          minWidth={1000}
          paddingBottom={"15px"}
          sx={
            {
              // borderTopLeftRadius: "20px",
              // borderBottomLeftRadius: "20px",
            }
          }
        >
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

            {data?.learnerGroups.map((group, groupIndex) => {
              return (
                <Box
                  key={groupIndex}
                  direction="row"
                  display={"flex"}
                  // flex={1}
                  flexDirection={"row"}
                  height={48}
                  alignItems={"center"}
                  borderRadius={3}
                  marginTop={"15px"}
                  paddingX={"15px"}
                  sx={{
                    border: groupNameParams === group.groupName ? 3 : null,
                    borderColor:
                      groupNameParams === group.groupName ? "lime" : null,
                  }}
                  backgroundColor={getRankColor(groupIndex, data.theme.top3)}
                  // backgroundColor={"blue"}
                >
                  <Typography
                    sx={{
                      flex: 0.5,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#FFFFFF ",
                      fontFamily: "Raleway",
                    }}
                  >
                    {groupIndex + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      // backgroundColor: "red",
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
                  <Typography
                    sx={{
                      flex: 0.5,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#FFFFFF ",
                      fontFamily: "Raleway",
                    }}
                  >
                    {group.groupIndex}
                  </Typography>
                  <Typography
                    sx={{
                      flex: 5,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#FFFFFF ",
                      fontFamily: "Raleway",
                    }}
                  >
                    {group.groupName}
                  </Typography>
                  <Typography
                    sx={{
                      flex: 2,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#FFFFFF ",
                      fontFamily: "Raleway",
                    }}
                  >
                    {group.totalPoint > 0 ? group.totalPoint : 0}
                  </Typography>
                  {/* <Typography
                  sx={{
                    flex: 2,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FFFFFF ",
                    fontFamily: "Raleway",
                  }}
                >
                  200
                </Typography> */}
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}

export default Learner;
