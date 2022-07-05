import React from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import MentorTable from "../components/MentorTable";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import limitStringLength from "../components/Functions/limitStringLength";
import PresentationHeader from "../components/PresentationHeader";
import color from "../constant/color";

// const auth = firebase.auth();

export default function Mentor() {
  const { projectNameParams, mentorNameParams } = useParams();
  const [project, setProject] = React.useState();
  const queryProject = async (projectName) => {
    db.collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
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
        {/* <Button
          onClick={() => {
            console.log(project);
          }}
        >
          ดู project
        </Button> */}
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
              height: 90,
              backgroundColor: color.primaryBlack,
              borderRadius: "10px",
              justifyContent: "center",
              marginX: "2%",
            }}
          >
            <Typography
              sx={{
                marginX: "20px",
                justifyContent: "center",
                fontSize: 38,
                color: "white",
              }}
            >
              Mentor : {limitStringLength(mentorNameParams, 29)}
            </Typography>
          </Stack>
        </Stack>
        <MentorTable
          project={project}
          setProject={setProject}
          mentorName={mentorNameParams}
        />
      </Box>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}
