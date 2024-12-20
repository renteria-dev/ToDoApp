import { renderHook } from "@testing-library/react";
import { useMetrics } from "../../../hooks/useMetrics";
import { vi } from "vitest";
import { useData } from "../../../hooks/useData";
import { humanize } from "../../../utils/dates";

// Mock `useData` hook
vi.mock("../../../hooks/useData", () => ({
  useData: vi.fn(() => ({
    setMetrics: vi.fn(),
    setPages: vi.fn(),
    setRows: vi.fn(),
    pages: { totalPages: 5, actualPage: 1 },
    updateData: false,
    filterPriority: "ALL",
    filterState: "ALL",
    searchQuery: "",
  })),
}));

// Mock humanize utility
vi.mock("../../../utils/dates", () => ({
  humanize: vi.fn((value) => `Humanized: ${value}`), // Mock humanize to return a string for testing
}));

describe("useMetrics", () => {
  it("should return formatted metrics", () => {
    const mockUseData = useData as jest.Mock;
    const mockHumanize = humanize as jest.Mock;

    // Mock the data returned by useData
    mockUseData.mockReturnValue({
      metrics: {
        average: 1000,
        averageLow: 500,
        averageMedium: 800,
        averageHigh: 1200,
      },
    });

    const { result } = renderHook(() => useMetrics());

    // Ensure humanize is called for each metric
    expect(mockHumanize).toHaveBeenCalledWith(1000);
    expect(mockHumanize).toHaveBeenCalledWith(500);
    expect(mockHumanize).toHaveBeenCalledWith(800);
    expect(mockHumanize).toHaveBeenCalledWith(1200);

    // Ensure formatted metrics are correct
    expect(result.current.formattedMetrics).toEqual({
      average: "Humanized: 1000",
      averageLow: "Humanized: 500",
      averageMedium: "Humanized: 800",
      averageHigh: "Humanized: 1200",
    });
  });

  it("should handle missing metrics gracefully", () => {
    const mockUseData = useData as jest.Mock;

    // Mock the data returned by useData with missing metrics
    mockUseData.mockReturnValue({
      metrics: {},
    });

    const { result } = renderHook(() => useMetrics());

    // Ensure formatted metrics are undefined or default
    expect(result.current.formattedMetrics).toEqual({
      average: "Humanized: undefined",
      averageLow: "Humanized: undefined",
      averageMedium: "Humanized: undefined",
      averageHigh: "Humanized: undefined",
    });
  });
});
