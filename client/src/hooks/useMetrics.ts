// hooks/useMetrics.ts
import { useData } from "../hooks/useData";
import { humanize } from "../utils/dates";

// Encapsulates logic for metrics
export const useMetrics = () => {
  const { metrics } = useData();

  const formattedMetrics = {
    average: humanize(metrics.average),
    averageLow: humanize(metrics.averageLow),
    averageMedium: humanize(metrics.averageMedium),
    averageHigh: humanize(metrics.averageHigh),
  };

  return { formattedMetrics };
};
