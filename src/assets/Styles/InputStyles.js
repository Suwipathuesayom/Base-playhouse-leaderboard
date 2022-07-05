import { InputBase, styled, TextField } from "@mui/material";
import color from "../../constant/color";

const TextInput = styled(InputBase)(({ width, marginright = "20px" }) => ({
  width: width,
  padding: "0 10px",
  marginRight: marginright,
  borderRadius: 5,
  fontSize: 20,
  backgroundColor: "white",
}));

const ColorInput = styled(InputBase)(
  ({ width, marginright = "20px", marginleft = 0 }) => ({
    width: width,
    padding: "0 10px",
    marginRight: marginright,
    marginLeft: marginleft,
    borderRadius: "3px",
    fontSize: 20,
    backgroundColor: "white",
  })
);

const DropDownTextInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& > fieldset": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": { color: color.primaryOrange },
}));

export { DropDownTextInput, TextInput, ColorInput };
