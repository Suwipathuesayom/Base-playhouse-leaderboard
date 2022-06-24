import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import color from "../constant/color";

const PresentationHeader = ({ project }) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      display={"flex"}
      flexDirection={"row"}
      height={smallScreen ? 100 : 200}
      alignItems={"center"}
      paddingX={"1%"}
      // backgroundColor={"red"}
    >
      <Box
        component={"img"}
        src={project?.imageUrl}
        alt={"not found"}
        sx={{
          width: smallScreen ? 100 : 200,
          height: smallScreen ? 100 : 200,
          marginRight: "30px",
        }}
      />
      <Stack
        display={"flex"}
        flexDirection={smallScreen ? "column" : "row"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        // backgroundColor={"pink"}
      >
        <Typography
          sx={{
            fontSize: smallScreen ? 32 : 72,
            fontWeight: 200,
            fontFamily: "Russo One",
            marginRight: "30px",
            // backgroundColor: "orange",
          }}
        >
          LEADERBOARD
        </Typography>
        {!smallScreen && (
          <Box
            sx={{
              width: 10,
              height: 100,
              marginRight: "30px",
              backgroundColor: color.primaryOrange,
            }}
          />
        )}
        <Typography
          sx={{
            fontSize: smallScreen ? 28 : 36,
            fontWeight: 900,
            marginRight: "30px",
            // paddingTop: "30px",
            color: color.secondaryGrey,
            // backgroundColor: "yellow",
          }}
        >
          {project?.projectName.toUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PresentationHeader;
