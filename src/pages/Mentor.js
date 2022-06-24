import React from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import MentorTable from "../components/MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import limitStringLength from "../components/Functions/limitStringLength";
import PresentationHeader from "../components/PresentationHeader";

export default function Mentor() {
  const { projectNameParams, mentorNameParams } = useParams();
  const [project, setProject] = React.useState();
  const queryProject = async (projectName) => {
    db.collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setProject(doc.data());
          // console.log(doc.data());
        });
      });
  };

  if (project) {
    return (
      <Box
        className="mentor"
        sx={{
          width: "100%",
          height: "100vh",
          paddingY: "1%",
        }}
      >
        <PresentationHeader project={project} />
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
        <MentorTable project={project} setProject={setProject} />
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}
