import React, { useState } from "react";
import "../../assets/styles/NewProject.css";
import { Box, Stack, Typography } from "@mui/material";

import NewProjectAddMentor from "./NewProjectAddMentor";
import NewProjectNameAndColor from "./NewProjectNameAndColor";

function NewProjectHeader({ project, setProject, header }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (selectedImage) => {
    let tempProject = project;
    tempProject.imageUrl = selectedImage;
    setProject(tempProject);
    console.log(tempProject);
  };
  return (
    <div className="header">
      <div className="header__upload">
        <img
          src={
            selectedImage ? selectedImage : project.imageUrl
            // selectedImage
            //   ? URL.createObjectURL(selectedImage)
            //   : project.imageUrl
          }
          alt="not found"
        />
        <div>
          <input
            type={"text"}
            onChange={(event) => {
              setSelectedImage(event.target.value);
              handleSelectImage(event.target.value);
            }}
            placeholder={"image url ..."}
          />
          {/* <input
            type={"file"}
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
              handleSelectImage(event.target.files[0]);
            }}
          /> */}
        </div>
      </div>
      <Box
        className="header__content"
        minWidth={"1500px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: "20px",
          // minWidth: 1200,
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "pink",
        }}
      >
        <Typography variant="h2">{header}</Typography>
        <Stack
          className="header__contentImport"
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          // bgcolor="red"
        >
          <p>เพิ่มเกณฑ์จากโปรเจคที่มีอยู่แล้ว ?</p>
        </Stack>
        <NewProjectNameAndColor project={project} setProject={setProject} />
        <NewProjectAddMentor project={project} setProject={setProject} />
      </Box>
    </div>
  );
}

export default NewProjectHeader;
