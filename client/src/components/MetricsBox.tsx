// components/MetricsBox.tsx
import { Box, Divider, Typography } from "@mui/material";
import { useMetrics } from "../hooks/useMetrics";

export const MetricsBox = () => {
  const { formattedMetrics } = useMetrics();

  return (
    <Box
      data-testid="metrics-box"
      sx={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.default",
        color: "text.secondary",
      }}
    >
      {/* Average Time to Finish Tasks */}
      <Box width={"100%"}>
        <Typography>Average time to finish tasks:</Typography>
        <Typography>{formattedMetrics.average}</Typography>
      </Box>

      <Divider orientation="vertical" variant="middle" flexItem />

      {/* Average Time to Finish Tasks by Priority */}
      <Box width={"100%"}>
        <Typography>Average time to finish tasks by priority:</Typography>
        <Typography>Low: {formattedMetrics.averageLow}</Typography>
        <Typography>Medium: {formattedMetrics.averageMedium}</Typography>
        <Typography>High: {formattedMetrics.averageHigh}</Typography>
      </Box>
    </Box>
  );
};
