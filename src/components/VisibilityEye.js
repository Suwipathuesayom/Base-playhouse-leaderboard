import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { iconStyle } from "../assets/styles/IconStyles";
import color from "../constant/color";

const VisibilityEye = ({ isHidden, onClick }) => {
  if (isHidden)
    return (
      <Tooltip title={"Unhide"}>
        <VisibilityOff
          sx={[iconStyle, { color: color.secondaryGrey }]}
          onClick={onClick}
        />
      </Tooltip>
    );
  else
    return (
      <Tooltip title={"Hide"}>
        <Visibility sx={iconStyle} onClick={onClick} />
      </Tooltip>
    );
};

export default VisibilityEye;
