import { styled, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import color from "../../constant/color";

const ContentText = styled(Typography)(
  ({ flexGrow = 0, width, textDecoration = "false" }) => ({
    flexGrow: flexGrow,
    width: width,
    padding: "0 10px",
    marginRight: "20px",
    textDecoration: textDecoration,
    fontSize: 24,
    fontWeight: 400,
    color: color.secondaryGrey,
  })
);

const HeaderText = styled(Typography)(
  ({ flexShrink = 0, width = "100%", textAlign, marginright = "20px" }) => ({
    flexShrink: flexShrink,
    width: width,
    textAlign: textAlign,
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Prompt",
    marginRight: marginright,
    color: color.primaryOrange,
  })
);

const NumberText = styled(Typography)(
  ({ flexShrink = 1, marginRight = "10px", textDecoration = "false" }) => ({
    flexShrink: flexShrink,
    textAlign: "center",
    textDecoration: textDecoration,
    fontSize: 24,
    fontWeight: 400,
    fontFamily: "Prompt",
    marginRight: marginRight,
    color: color.primaryOrange,
  })
);

const StrongText = styled(Typography)(({ fontSize = 72 }) => ({
  fontSize: fontSize,
  fontWeight: 200,
  fontFamily: "Russo One",
  marginRight: "30px",
}));

const TableHeaderText = styled(Typography)(
  ({ flex, fontSize = 28, color = "white" }) => ({
    flex: flex,
    textAlign: "center",
    fontSize: fontSize,
    fontWeight: 800,
    color: color,
    fontFamily: "Raleway",
  })
);

const TablePointHeaderText = styled(Typography)(({ flex }) => ({
  flex: 1,
  textAlign: "center",
  fontSize: 28,
  fontWeight: 800,
  // color: "#FFFFFF",
  fontFamily: "Raleway",
  // backgroundColor: "red",
}));

const TableContentText = styled(Typography)(({ flex, fontSize = 28 }) => ({
  flex: flex,
  textAlign: "center",
  fontSize: fontSize,
  fontWeight: 800,
  color: "#FFFFFF ",
  fontFamily: "Raleway",
}));

const StyledColorCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: "#FF5B4A",
    backgroundColor: "#242424",
    cursor: "pointer",
    justifyContent: "space-between",
  },
}));

export {
  ContentText,
  HeaderText,
  NumberText,
  StrongText,
  TableHeaderText,
  TableContentText,
  TablePointHeaderText,
  StyledColorCell,
};
