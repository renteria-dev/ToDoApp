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
  if (!Number.isNaN(s)) return shortEnglishHumanizer(s * 1000, { round: true });
  return "N/A";
};
