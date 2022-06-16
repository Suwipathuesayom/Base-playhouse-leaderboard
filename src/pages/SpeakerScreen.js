import React, { useState } from "react";
import "../assets/styles/SpeakerScreen.css";
import { db } from "../config/firebase";
import color from "../constant/color";
import marvel from "../assets/image/marvel.png";
// // import crown from "../assets/image/crown1.png";
// import avatar from "../assets/image/avatar1.png";
// import avatar2 from "../assets/image/avatar2.png";
// import avatar3 from "../assets/image/avatar3.png";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import SplashScreen from "../components/SplashScreen";

function SpeakerScreen() {
  const [data, setData] = useState();

  const queryProject = async (projectName) => {
    await db
      .collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setData(doc.data());
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
        setData();
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
      <div className="header">
        <h1>LEADERBOARD</h1>
        <div className="marvel-image">
          <img src={data?.imageUrl} alt="marvel" className="marvel" />
          <div className="bg-project"></div>
          <div className="title">
            <h2>{data?.projectName}</h2>
          </div>
          <div className="bg-table">
            <Stack backgroundColor={"pink"} direction={"row"} height={"100%"}>
              <Stack
                backgroundColor={color.secondaryBlack}
                height={"100%"}
                width={"50%"}
                minWidth={1000}
              >
                <Divider color={"white"} />
                <Stack
                  justifyContent={"center"}
                  height={"60px"}
                  paddingX={"10px"}
                  backgroundColor={color.primaryBlack}
                >
                  <Stack direction={"row"}>
                    <Typography
                      sx={{
                        flex: 0.5,
                        textAlign: "center",
                        fontSize: 28,
                        color: "#FFFFFF",
                        fontFamily: "Raleway",
                        // backgroundColor: "purple",
                      }}
                    >
                      RANK
                    </Typography>
                    <Typography
                      sx={{
                        flex: 0.5,
                        // backgroundColor: "green",
                      }}
                    />
                    <Typography
                      sx={{
                        flex: 0.75,
                        textAlign: "center",
                        fontSize: 28,
                        color: "#FFFFFF",
                        fontFamily: "Raleway",
                        // backgroundColor: "purple",
                      }}
                    >
                      GROUP
                    </Typography>
                    <Typography
                      sx={{
                        flex: 3,
                        textAlign: "center",
                        fontSize: 28,
                        color: "#FFFFFF",
                        fontFamily: "Raleway",
                        // backgroundColor: "yellow",
                      }}
                    >
                      GROUP NAME
                    </Typography>
                    <Typography
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: 28,
                        color: "#FFFFFF",
                        fontFamily: "Raleway",
                        // backgroundColor: "green",
                      }}
                    >
                      TOTAL
                    </Typography>
                  </Stack>
                </Stack>
                <Divider color={"white"} />
                <Stack
                  flexGrow={1}
                  paddingX={"10px"}
                  // backgroundColor={"blue"}
                >
                  {data?.learnerGroups.map((group, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      // flex={1}
                      flexDirection={"row"}
                      height={48}
                      alignItems={"center"}
                      borderRadius={10}
                      marginTop={"15px"}
                      // paddingX={"15px"}
                      backgroundColor={getRankColor(index, data.theme.top3)}
                    >
                      <Typography
                        sx={{
                          flex: 0.5,
                          textAlign: "center",
                          fontSize: 28,
                          fontWeight: 800,
                          color: "#FFFFFF",
                          fontFamily: "Raleway",
                          // backgroundColor: "red",
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 0.5,
                          justifyContent: "center",
                          // backgroundColor: "black",
                        }}
                      >
                        <AccountCircle sx={{ fontSize: 36, color: "white" }} />
                      </Box>
                      <Typography
                        sx={{
                          flex: 0.75,
                          textAlign: "center",
                          fontSize: 28,
                          fontWeight: 800,
                          color: "#FFFFFF ",
                          fontFamily: "Raleway",
                          // backgroundColor: "orange",
                        }}
                      >
                        {index + 3}
                      </Typography>
                      <Typography
                        sx={{
                          flex: 3,
                          textAlign: "center",
                          fontSize: 28,
                          fontWeight: 800,
                          color: "#FFFFFF",
                          fontFamily: "Raleway",
                        }}
                      >
                        {group.groupName}
                      </Typography>
                      <Typography
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: 28,
                          fontWeight: 800,
                          color: "#FFFFFF",
                          fontFamily: "Raleway",
                        }}
                      >
                        {group.totalPoint > 0 ? group.totalPoint : 0}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack
                backgroundColor={color.secondaryBlack}
                height={"100%"}
                width={"50%"}
                minWidth={1000}
              >
                <Divider color={"white"} />

                <Stack
                  justifyContent={"center"}
                  height={"60px"}
                  paddingX={"10px"}
                  backgroundColor={color.primaryBlack}
                >
                  <Stack direction={"row"}>
                    {data?.learnerGroups[0].points.map((point, index) => {
                      if (!data.tasks[index].isHidden) {
                        return (
                          <Typography
                            sx={{
                              flex: 1,
                              textAlign: "center",
                              fontSize: 28,
                              color: "#FFFFFF",
                              fontFamily: "Raleway",
                              // backgroundColor: "purple",
                            }}
                          >
                            {data.tasks[index].taskName}
                          </Typography>
                        );
                      }
                      return <div></div>;
                    })}
                  </Stack>
                </Stack>
                <Divider color={"white"} />

                {data?.learnerGroups.map((group, index) => (
                  <Stack
                    direction="row"
                    key={index}
                    // flex={1}
                    flexDirection={"row"}
                    height={48}
                    alignItems={"center"}
                    borderRadius={10}
                    marginTop={"15px"}
                    // paddingX={"15px"}
                  >
                    {!!group.points.length &&
                      group.points.map((point, index) => {
                        if (!data.tasks[index].isHidden) {
                          return (
                            <Typography
                              key={index}
                              sx={{
                                flex: 1,
                                textAlign: "center",
                                fontSize: 28,
                                fontWeight: 800,
                                color: "#FFFFFF",
                                fontFamily: "Raleway",
                                // backgroundColor: "red",
                              }}
                            >
                              {point.isChecked ? point.taskPoint : 0}
                            </Typography>
                          );
                        }
                        return <div></div>;
                      })}
                    {!!!group.points.length &&
                      data?.tasks.map((task, subIndex) => {
                        if (!task.isHidden) {
                          return (
                            <Typography
                              key={subIndex}
                              sx={{
                                flex: 1,
                                textAlign: "center",
                                fontSize: 28,
                                fontWeight: 800,
                                color: "#FFFFFF",
                                fontFamily: "Raleway",
                                // backgroundColor: "red",
                              }}
                            >
                              {0}
                            </Typography>
                          );
                        }
                        return <div></div>;
                      })}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    );
  } else {
    queryProject("Bruno Mars");
    return <SplashScreen />;
  }
}

export default SpeakerScreen;
