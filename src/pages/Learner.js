import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "../assets/styles/Learner.css";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { Box } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import color from "../constant/color";
import SplashScreen from "../components/SplashScreen";
import {
  TableContentText,
  TableHeaderText,
} from "../assets/styles/TypographyStyles";

function Learner() {
  const DISPLAY_LIMIT = 5;
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
      paddingX={"15px"}
      sx={{
        border: isParamGroupName(group.groupName) ? 3 : null,
        borderColor: isParamGroupName(group.groupName) ? "lime" : null,
      }}
      backgroundColor={() => getRankColor(rankIndex, data.theme.top3)}
      // backgroundColor={"blue"}
    >
      <TableContentText flex={0.5}> {rankIndex + 1}</TableContentText>
      <Box
        sx={{
          display: "flex",
          flex: 1,
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
      <TableContentText flex={0.5}>{group.groupIndex}</TableContentText>
      <TableContentText flex={5}>{group.groupName}</TableContentText>
      <TableContentText flex={2}>
        {group.totalPoint > 0 ? group.totalPoint : 0}
      </TableContentText>
    </Box>
  );

  if (data) {
    let foundGroupWithinDisplayLimit = false;
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
          // overflowX={"overlay"}
          padding={"1%"}
        >
          <TableHeaderText flex={0.5}>RANK</TableHeaderText>
          <Typography sx={{ flex: 1 }} />
          <TableHeaderText flex={0.5}>GROUP</TableHeaderText>
          <TableHeaderText flex={5}>NAME</TableHeaderText>
          <TableHeaderText flex={2}>TOTAL</TableHeaderText>
        </Stack>
        <Stack
          flexGrow={1}
          paddingX={"10px"}
          backgroundColor={color.primaryBlack}
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

          {data?.learnerGroups.map((group, rankIndex) => {
            if (rankIndex <= DISPLAY_LIMIT - 1) {
              if (isParamGroupName(group.groupName)) {
                foundGroupWithinDisplayLimit = true;
              }
              return (
                <RankBox key={rankIndex} group={group} rankIndex={rankIndex} />
              );
            } else if (rankIndex > DISPLAY_LIMIT - 1) {
              if (
                !foundGroupWithinDisplayLimit &&
                isParamGroupName(group.groupName)
              ) {
                return (
                  <div>
                    <ThreeDotBox />
                    <RankBox
                      key={rankIndex}
                      group={group}
                      rankIndex={rankIndex}
                    />
                    {rankIndex + 1 !== data.learnerGroups.length && (
                      <ThreeDotBox />
                    )}
                  </div>
                );
              }
            }
            return <div></div>;
          })}
          {foundGroupWithinDisplayLimit && <ThreeDotBox />}
        </Stack>
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}

export default Learner;
