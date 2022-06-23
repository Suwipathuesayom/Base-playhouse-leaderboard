import React from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import MentorTable from "../components/MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
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
          paddingX={"50px"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minWidth: 350,
              height: 200,
              justifyContent: "center",
              marginRight: "0px",
              backgroundColor: "black",
              borderRadius: 10,
              color: "white",
            }}
          >
            <Typography
              variant={"h1"}
              sx={{
                textAlign: "center",
                color: "white",
              }}
            >
              {limitStringLength(mentorNameParams, 29)}
            </Typography>
          </Box>
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