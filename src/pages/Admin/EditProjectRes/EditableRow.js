import React, { useState } from "react";
import { TextInput } from "../../../assets/styles/InputStyles";

function EditableRow({ name }) {

  return (
    <>
      <TextInput
        value={name}
        type="text"
        sx={{ flex: 1, bgcolor: "#ffffff", width: "100%", color: "black" }}
        // onKeyPress={(event) => {
        //   if (event.key === "Enter") {
        //     event.preventDefault();
        //   }
        // }}
        
      />
    </>
  );
}

export default EditableRow;
