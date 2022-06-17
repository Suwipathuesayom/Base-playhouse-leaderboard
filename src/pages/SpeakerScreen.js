import React, { useState } from "react";
import "../assets/styles/SpeakerScreen.css";
import { db } from "../config/firebase";
import color from "../constant/color";
//import marvel from "../assets/image/marvel.png";
// // import crown from "../assets/image/crown1.png";
// import avatar from "../assets/image/avatar1.png";
// import avatar2 from "../assets/image/avatar2.png";
// import avatar3 from "../assets/image/avatar3.png";
import { Box, Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";

function SpeakerScreen() {
  const [data, setData] = useState();

  const queryProject = async (projectName) => {
    await db
      .collection("users")
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
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          paddingY: "1%",
          overflowX: "Overlay",
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
          overflowX={"overlay"}
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
                <Typography
                  sx={{
                    flex: 0.5,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    color: color.primaryOrange,
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
                    fontWeight: 800,
                    color: color.primaryOrange,
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
                    fontWeight: 800,
                    color: color.primaryOrange,
                    fontFamily: "Raleway",
                    // backgroundColor: "yellow",
                  }}
                >
                  NAME
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    color: color.primaryOrange,
                    fontFamily: "Raleway",
                    // backgroundColor: "green",
                  }}
                >
                  TOTAL
                </Typography>
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
                src={require("../assets/image/crown1.png")}
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
                      flex: 0.75,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#FFFFFF ",
                      fontFamily: "Raleway",
                      // backgroundColor: "orange",
                    }}
                  >
                    {group.groupIndex}
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
            overflowX={"scroll"}
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
                width={200 * data?.learnerGroups[0].points.length}
              >
                {data?.learnerGroups[0].points.map((point, index) => {
                  if (!data.tasks[index].isHidden) {
                    return (
                      <Typography
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: 28,
                          color: "#FFFFFF",
                          // fontFamily: "Raleway",
                        }}
                      >
                        {data.tasks[index].taskName.length > 19
                          ? data.tasks[index].taskName.slice(0, 19) + "..."
                          : data.tasks[index].taskName}
                      </Typography>
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
                width={200 * data?.learnerGroups[0].points.length}
                alignItems={"center"}
                borderRadius={3}
                marginTop={"15px"}
                backgroundColor={"#ccc"}
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
                            // color: "#FFFFFF",
                            fontFamily: "Raleway",
                            // backgroundColor: "red",
                            // backgroundColor: !!(index % 2)
                            //   ? color.secondaryBlack
                            //   : color.primaryBlack,
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
      </Box>
    );
  } else {
    queryProject("Bruno Mars");
    return <SplashScreen />;
  }
}

export default SpeakerScreen;
