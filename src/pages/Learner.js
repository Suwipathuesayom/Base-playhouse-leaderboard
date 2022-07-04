import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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

// const auth = firebase.auth();

function Learner() {
  const [project, setProject] = useState();
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
              return rhs.totalPoint - lhs.totalPoint;
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

  const RankBox = ({ group, rankIndex }) => (
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
        {group.totalPoint > 0 ? group.totalPoint : 0}
      </TableContentText>
    </Box>
  );

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
        <Stack padding={"2%"}>
          <Stack
            width={"100%"}
            height={"80px"}
            direction={"row"}
            alignItems={"center"}
            paddingX={"15px"}
            backgroundColor={color.primaryBlack}
            sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <TableHeaderText
              color={getRankColor(0, project.theme.top3)}
              flex={1}
              fontSize={smallScreen ? 18 : 28}
            >
              RANK
            </TableHeaderText>
            {!smallScreen && <Typography sx={{ flex: 0.5 }} />}
            {!smallScreen && (
              <TableHeaderText
                color={getRankColor(0, project.theme.top3)}
                flex={0.5}
              >
                GROUP
              </TableHeaderText>
            )}
            <TableHeaderText
              color={getRankColor(0, project.theme.top3)}
              flex={5}
              fontSize={smallScreen ? 18 : 28}
            >
              NAME
            </TableHeaderText>
            {!smallScreen && (
              <TableHeaderText
                color={getRankColor(0, project.theme.top3)}
                flex={1}
              />
            )}

            <TableHeaderText
              color={getRankColor(0, project.theme.top3)}
              flex={1}
              fontSize={smallScreen ? 18 : 28}
            >
              TOTAL
            </TableHeaderText>
          </Stack>
          <Stack
            flexGrow={1}
            paddingX={"15px"}
            paddingBottom={"15px"}
            backgroundColor={color.primaryBlack}
            sx={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
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

            {project?.learnerGroups.map((group, rankIndex) => {
              if (rankIndex <= DISPLAY_LIMIT - 1) {
                if (isParamGroupName(group.groupName)) {
                  foundGroupWithinDisplayLimit = true;
                }
                return (
                  <RankBox
                    key={rankIndex}
                    group={group}
                    rankIndex={rankIndex}
                  />
                );
              } else if (rankIndex > DISPLAY_LIMIT - 1) {
                if (
                  !foundGroupWithinDisplayLimit &&
                  isParamGroupName(group.groupName)
                ) {
                  return (
                    <div key={rankIndex}>
                      <ThreeDotBox />
                      <RankBox group={group} rankIndex={rankIndex} />
                      {rankIndex + 1 !== project.learnerGroups.length && (
                        <ThreeDotBox />
                      )}
                    </div>
                  );
                }
              }
              return <div key={rankIndex}></div>;
            })}
            {foundGroupWithinDisplayLimit && <ThreeDotBox />}
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
