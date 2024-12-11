import humanizeDuration from "humanize-duration";

export const shortEnglishHumanizer = humanizeDuration.humanizer({
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
export const humanize = (seconds: string | null) => {
  const s = Number(seconds);
  if (s != null && !Number.isNaN(s) && !(Number(s) < 0))
    return shortEnglishHumanizer(s * 1000, {
      round: true,
      delimiter: " ",
      spacer: "",
    });
  return "N/A";
};
