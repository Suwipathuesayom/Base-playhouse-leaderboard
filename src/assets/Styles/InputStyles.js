import { InputBase, styled } from "@mui/material";

const TextInput = styled(InputBase)(({ width, marginright = "20px" }) => ({
  width: width,
  padding: "0 10px",
  marginRight: marginright,
  borderRadius: 5,
  fontSize: 20,
  backgroundColor: "white",
}));

const ColorInput = styled(InputBase)(({ width, marginright = "20px" }) => ({
  width: width,
  padding: "0 10px",
  marginRight: marginright,
  borderRadius: "3px",
  fontSize: 20,
  backgroundColor: "white",
}));

export { TextInput, ColorInput };
