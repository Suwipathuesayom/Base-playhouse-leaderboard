import React, { useState } from "react";
import { TextInput } from "../../../assets/styles/InputStyles";

function EditableRow({ name }) {
  const [value, setValue] = useState(name);

  return (
    <>
      <TextInput
        value={value}
        type="text"
        sx={{ flex: 1, bgcolor: "#ffffff", width: "100%", color: "black" }}
        // onKeyPress={(event) => {
        //   if (event.key === "Enter" || event.key === "Return") {
        //     setValue(value);
        //   }
        // }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </>
  );
}

export default EditableRow;
