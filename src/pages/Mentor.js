import React from "react";
import { useParams } from "react-router-dom";
import MentorTable from "../components/MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import limitStringLength from "../components/Functions/limitStringLength";
import PresentationHeader from "../components/PresentationHeader";
import color from "../constant/color";
import Navbar from "../components/Navbar";
import queryProjectFromProjectName from "../components/Functions/queryProjectFromProjectName";

export default function Mentor() {
  const { projectNameParams, mentorNameParams } = useParams();
  const [project, setProject] = React.useState({});

  if (!!Object.keys(project).length) {
    return (
      <Box
        className="mentor"
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        {/* <Button
          onClick={() => {
            console.log(project);
          }}
        >
          ดู project
        </Button> */}
        <Navbar header="MENTOR" />
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
              height: 70,
              backgroundColor: color.primaryBlack,
              borderRadius: "10px",
              justifyContent: "center",
              mx: "2%",
            }}
          >
            <Typography
              sx={{
                marginX: "20px",
                justifyContent: "center",
                fontSize: 24,
                color: "white",
              }}
            >
              {limitStringLength(mentorNameParams, 29)}
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
    queryProjectFromProjectName(projectNameParams, setProject);
    return <SplashScreen />;
  }
}
