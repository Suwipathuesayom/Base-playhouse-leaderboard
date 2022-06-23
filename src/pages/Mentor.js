import React from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import MentorTable from "../components/MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import color from "../constant/color";
import limitStringLength from "../components/Functions/limitStringLength";

export default function Mentor() {
  const { projectNameParams, mentorNameParams } = useParams();
  console.log(mentorNameParams);
  const [project, setProject] = React.useState();
  const queryProject = async (projectName) => {
    await db
      .collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setProject(doc.data());
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
        setProject({});
      });
  };

  if (project) {
    return (
      <Box
        className="mentor"
        sx={{
          width: "100%",
          height: "100vh",
          marginRight: "center",
        }}
      >
        <Stack
          height={"100%"}
          alignItems="center"
          justifyContent="space-between"
          padding={"2%"}
        >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            height={200}
            width={"100%"}
            alignItems={"center"}
            paddingX={"1%"}
          >
            <Box
              component={"img"}
              src={project?.imageUrl}
              alt={"not found"}
              sx={{ width: 200, height: 200, marginRight: "30px" }}
            />
            <Typography
              sx={{
                fontSize: 60,
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
                fontSize: 32,
                fontWeight: 900,
                marginRight: "30px",
                paddingTop: "30px",
                color: color.secondaryGrey,
              }}
            >
              PROJECT {project?.projectName.toUpperCase()}{" "}
            </Typography>
            <Stack
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Stack
                sx={{
                  width: 450,
                  height: 90,
                  backgroundColor: "white",
                  borderRadius: "30px",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    marginLeft: "20px",
                    justifyContent: "center",
                    fontSize: 38,
                  }}
                >
                  Mentor : {limitStringLength(mentorNameParams, 29)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              height: "75%",
              width: "100%",
              borderRadius: 10,
              minHeight: 650,
              "& .mentor-header": {},
            }}
          >
            <MentorTable
              project={project}
              setProject={setProject}
              sx={{ height: "100%" }}
            />
          </Box>
        </Stack>
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}
