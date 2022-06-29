import React, { useState } from "react";
import "../../assets/styles/NewProject.css";
import { Box } from "@mui/material";
import { storage } from "../../config/firebase";
import NewProjectAddMentor from "./NewProjectAddMentor";
import NewProjectNameAndColor from "./NewProjectNameAndColor";
import { StrongText } from "../../assets/styles/TypographyStyles";
import { SyncLoader } from "react-spinners";
import color from "../../constant/color";

function NewProjectHeader({ project, setProject, header }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = (image) => {
    setUploading(true);
    const uploadTask = storage.ref(`images/${image?.name}`).put(image);
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
            setUploading(false);
            setSelectedImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const handleSelectImage = (selectedImage) => {
    let tempProject = project;
    tempProject.imageUrl = selectedImage;
    setProject(tempProject);
  };
  return (
    <div className="header">
      <div className="header__upload">
        {!uploading && (
          <img
            src={selectedImage ? selectedImage : project.imageUrl}
            alt="not found"
          />
        )}
        {uploading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "300px",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SyncLoader color={color.primaryOrange} size={50} />
          </Box>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
            onChange={(event) => {
              handleChangeImage(event);
            }}
          />
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
          justifyContent: "space-evenly",
          // backgroundColor: "pink",
        }}
      >
        <StrongText>{header}</StrongText>
        {/* <Stack
          className="header__contentImport"
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          // bgcolor="red"
        >
          <p>เพิ่มเกณฑ์จากโปรเจคที่มีอยู่แล้ว ?</p>
        </Stack> */}
        <NewProjectNameAndColor project={project} setProject={setProject} />
        <NewProjectAddMentor project={project} setProject={setProject} />
      </Box>
    </div>
  );
}

export default NewProjectHeader;
