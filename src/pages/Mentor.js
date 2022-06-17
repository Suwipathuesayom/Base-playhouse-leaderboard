import React from "react";
import { db } from "../config/firebase";
// import "../../src/assets/styles/Mentor.css";

import { useParams } from "react-router-dom";
// import { Table } from "react-bootstrap";
import MentorTable from "./MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import SplashScreen from "../components/SplashScreen";

export default function Mentor() {
  const { projectNameParams } = useParams();
  console.log(projectNameParams);
  const [dummyData, setDummyData] = React.useState();
  const name = dummyData?.mentors[0].fullName;

  const queryProject = async (projectName) => {
    await db
      .collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setDummyData(doc.data());
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
        setDummyData({});
      });
  };

  if (dummyData) {
    return (
      <Box
        className="mentor"
        sx={{
          width: "100%",
          height: "100vh",
          // marginLeft: "center",
          marginRight: "center",
          // backgroundColor: "pink",
        }}
      >
        <Stack
          // flexDirection={"row"}
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
              {name?.length > 30 ? `${name.slice(0, 28)}...` : name}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "75%",
              width: "100%",
              borderRadius: 10,
              // minWidth: 1500,
              minHeight: 650,
              // backgroundColor: "gray",
              "& .mentor-header": {
                // overflowX: "hidden",
              },
            }}
          >
            <MentorTable
              dummyData={dummyData}
              setDummyData={setDummyData}
              sx={{ height: "100%" }}
            />
            {/* {name?.length > 6 ? `${name.slice(0, 5)}...` : name} */}
          </Box>
        </Stack>
      </Box>
    );
  } else {
    // queryProject("Bruno Mars");
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}
