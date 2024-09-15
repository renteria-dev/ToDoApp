import { Box, Divider, Typography } from "@mui/material";
import { useData } from "../hooks/useData";
import humanizeDuration from "humanize-duration";

const MetricsBox = () => {
  const { metrics } = useData();
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
  });
  const humanize = (seconds: string | null) => {
    const s = Number(seconds);
    if (!Number.isNaN(s))
      return shortEnglishHumanizer(s * 1000, { round: true });
    return "N/A";
  };
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
        <Typography>{humanize(metrics.average)}</Typography>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box width={"100%"}>
        <Typography >Average time to finish tasks by priority:</Typography>
        <Typography>Low: {humanize(metrics.averageLow)}</Typography>
        <Typography>Medium: {humanize(metrics.averageMedium)}</Typography>
        <Typography>High: {humanize(metrics.averageHigh)}</Typography>
      </Box>
    </Box>
  );
};

export default MetricsBox;
