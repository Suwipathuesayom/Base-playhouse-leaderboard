import { Box, Stack, Typography } from "@mui/material";
import color from "../constant/color";

const PresentationHeader = ({ project }) => (
  <Stack
    display={"flex"}
    flexDirection={"row"}
    height={200}
    alignItems={"center"}
    paddingX={"1%"}
    // backgroundColor={"red"}
  >
    <Box
      component={"img"}
      src={project?.imageUrl}
      alt={"not found"}
      sx={{ width: 200, height: 200, marginRight: "30px" }}
    />
    <Typography
      sx={{
        fontSize: 72,
        fontWeight: 200,
        fontFamily: "Russo One",
        marginRight: "30px",
      }}
    >
      LEADERBOARD
    </Typography>
    <Box
      sx={{
        width: 10,
        height: "40%",
        marginRight: "30px",
        backgroundColor: color.primaryOrange,
      }}
    />
    <Typography
      sx={{
        fontSize: 36,
        fontWeight: 900,
        marginRight: "30px",
        paddingTop: "30px",
        color: color.secondaryGrey,
      }}
    >
      {project?.projectName.toUpperCase()}
    </Typography>
  </Stack>
);

export default PresentationHeader;
