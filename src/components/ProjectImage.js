import { Box } from "@mui/material";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import { storage } from "../config/firebase";
import color from "../constant/color";
import ProjectHeader from "./ProjectHeader";
import "../pages/Admin/AdminProject.css";

const ProjectImage = ({ project, setProject }) => {
  const [selectedImage, setSelectedImage] = useState(project.imageUrl);
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
    <div className="adminProject__boxContainer">
      <ProjectHeader>Project Image</ProjectHeader>
      <div className="projectImage__image">
        {!uploading && (
          <Box
            component={"img"}
            src={
              selectedImage
                ? selectedImage
                : require("../assets/images/uploadImage.png")
            }
            alt={"not found"}
            sx={{
              width: "100%",
              height: 250,
              objectFit: "contain",
            }}
          />
        )}
        {uploading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SyncLoader color={color.primaryOrange} size={50} />
          </Box>
        )}
      </div>
      <div className="projectImage__form">
        <input
          type={"text"}
          onChange={(event) => {
            setSelectedImage(event.target.value);
            handleSelectImage(event.target.value);
          }}
          placeholder={"image url ..."}
        />
        <p>OR</p>
        <input
          style={{ color: "white" }}
          type={"file"}
          onChange={(event) => {
            handleChangeImage(event);
          }}
        />
      </div>
    </div>
  );
};

export default ProjectImage;
