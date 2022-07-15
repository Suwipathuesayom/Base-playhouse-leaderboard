import React, { useState } from "react";
import { TextInput } from "../../../assets/styles/InputStyles";

function EditableRow({
  name,
  setSelectedProject,
  index,
  selectedProject,
  setEditContactId,
}) {
  const [value, setValue] = useState(name);

  let tempSelectedProject = selectedProject;

  return (
    <>
      <TextInput
        value={value}
        type="text"
        sx={{ flex: 1, bgcolor: "#ffffff", width: "20%", color: "black" }}
        onKeyPress={(event) => {
          if (event.key === "Enter" || event.key === "Return") {
            setValue(value);
            tempSelectedProject[index] = { name: value };
            setSelectedProject(tempSelectedProject);
            setEditContactId(false);
          }

          // console.log("Enter Edit");
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </>
  );
}

export default EditableRow;
