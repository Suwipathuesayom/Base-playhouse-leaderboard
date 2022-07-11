import React, { useState } from "react";
import { storage } from "../../../config/firebase";
import { SyncLoader } from "react-spinners";
import color from "../../../constant/color";
import { Box } from "@mui/material";
import { StrongText } from "../../../assets/styles/TypographyStyles";
import "../../../assets/styles/./EditNewProject.css";
// import EditProjectNameAndColor from "./EditProjectNameAndColor";

function EditNewHeader(project, setProject, header) {
  const [selectedImage, setSelectedImage] = useState(
    "https://images.unsplash.com/photo-1657247882823-955a21e2f18a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  );
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
            handleSelectImage(url);
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
        // minWidth={"1500px"}
        sx={{
          padding: 0,
          // display: "flex",
          // flexDirection: "column",
          // width: "100%",
          // justifyContent: "space-evenly",
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

        {/* <NewProjectNameAndColor project={project} setProject={setProject} /> */}
        {/* <NewProjectAddMentor project={project} setProject={setProject} /> */}
      </Box>
    </div>
  );
}

export default EditNewHeader;
