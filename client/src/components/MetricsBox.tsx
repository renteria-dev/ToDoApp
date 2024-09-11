import { Box, Divider, Typography } from "@mui/material";

const MetricsBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
      }}
    >
      <Box width={"100%"}>
        <Typography>Average time to finish tasks:</Typography>
        
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box width={"100%"}>
        <Typography>Average time to finish tasks by priority:</Typography>
        <Typography>Low:</Typography>
        <Typography>Medium:</Typography>
        <Typography>High:</Typography>
      </Box>
    </Box>
  );
};

export default MetricsBox;
