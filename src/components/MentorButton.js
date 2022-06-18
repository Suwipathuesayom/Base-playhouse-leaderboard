import { Button, styled } from "@mui/material";
import color from "../constant/color";

const MentorButton = styled(Button)(() => ({
  fontSize: 16,
  fontWeight: 600,
  borderRadius: "3px",
  marginRight: "20px",
  color: color.primaryBlack,
  backgroundColor: "white",
}));

export default MentorButton;
