import React, { useState } from "react";
import "../assets/styles/SpeakerScreen.css";
import color from "../constant/color";
import marvel from "../assets/image/marvel.png";
// // import crown from "../assets/image/crown1.png";
// import avatar from "../assets/image/avatar1.png";
// import avatar2 from "../assets/image/avatar2.png";
// import avatar3 from "../assets/image/avatar3.png";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function SpeakerScreen() {
  const [data] = useState({
    createdAt: new Date(),
    imageUrl:
      "https://i.pinimg.com/originals/7d/bf/df/7dbfdf56a94c044e0684aba891816a37.jpg",
    projectName: "Marvel",
    mentors: [
      {
        index: 1,
        fullName: "Stan Lee",
      },
      {
        index: 2,
        fullName: "Thanat Raktham",
      },
    ],
    theme: {
      top3: "#FA0404",
      hilight: "#ffffff",
    },
    learnerGroups: [
      {
        isChecked: true,
        groupIndex: 0,
        groupName: "Avengers",
        avatar: "string",
        totalPoint: 31,
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 2,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
      {
        groupIndex: 1,
        groupName: "Inhumans",
        avatar: "string",
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 5,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
      {
        groupIndex: 2,
        groupName: "X-men",
        avatar: "string",
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 2,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
      {
        groupIndex: 0,
        groupName: "Avengers",
        avatar: "string",
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 2,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
      {
        groupIndex: 1,
        groupName: "Inhumans",
        avatar: "string",
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 2,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
      {
        groupIndex: 2,
        groupName: "X-men",
        avatar: "string",
        points: [
          {
            taskIndex: 0,
            taskPoint: 5,
          },
          {
            taskIndex: 1,
            taskPoint: 2,
          },
          {
            taskIndex: 2,
            taskPoint: 9,
          },
          {
            taskIndex: 3,
            taskPoint: 15,
          },
        ],
      },
    ],
    tasks: [
      {
        taskName: "สู้ Alien บุกโลก",
        subTasks: [
          {
            subTaskName: "ยืนล้อมวงเท่",
            point: 2,
            isHidden: false,
          },
          {
            subTaskName: "จับ Loki",
            point: 7,
            isHidden: false,
          },
        ],
        showSubTasks: false,
        point: 9,
        weight: 10,
        isHidden: false,
      },
      {
        taskName: "เอาชนะ Ultron",
        subTasks: [
          {
            subTaskName: "ยกเมืองขึ้นฟ้า",
            point: 1,
            isHidden: false,
          },
          {
            subTaskName: "เอาเมืองไปไว้ที่เดิม",
            point: 1,
            isHidden: true,
          },
        ],
        showSubTasks: false,
        point: 2,
        weight: 20,
        isHidden: false,
      },
    ],
  });

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

  return (
    <div className="header">
      <h1>LEADERBOARD</h1>
      <div className="marvel-image">
        <img src={marvel} alt="marvel" className="marvel" />
        <div className="bg-project"></div>
        <div className="title">
          <h2>PROJECT AVENGERS</h2>
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
                      {group.totalPoint}
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
                  {data?.learnerGroups[0].points.map((point, index) => (
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
                      POINT {index + 1}
                    </Typography>
                  ))}
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
                  {group.points.map((point, index) => (
                    <Typography
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
                      {point.taskPoint}
                    </Typography>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default SpeakerScreen;
