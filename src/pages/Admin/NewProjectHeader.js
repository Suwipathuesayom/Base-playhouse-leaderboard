import React, { useState } from "react";
import "../../assets/styles/NewProject.css";
import { Box, Stack } from "@mui/material";
import { storage } from "../../config/firebase";
import NewProjectAddMentor from "./NewProjectAddMentor";
import NewProjectNameAndColor from "./NewProjectNameAndColor";
import { StrongText } from "../../assets/styles/TypographyStyles";
import { Button } from "@mui/material";

function NewProjectHeader({ project, setProject, header }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  console.log("image:", image);

  const handleSelectImage = (selectedImage) => {
    let tempProject = project;
    tempProject.imageUrl = selectedImage;
    setProject(tempProject);
  };
  return (
    <div className="header">
      <div className="header__upload">
        <img
          src={selectedImage ? selectedImage : project.imageUrl}
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
          <input
            style={{ marginTop: 5 }}
            type={"file"}
            onChange={handleChangeImage}
          />
          <Button
            style={{ marginTop: 5 }}
            variant="contained"
            color="error"
            type={"submit"}
            onClick={uploadImage}
          >
            Upload
          </Button>
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
          justifyContent: "space-between",
          // backgroundColor: "pink",
        }}
      >
        <StrongText>{header}</StrongText>
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
