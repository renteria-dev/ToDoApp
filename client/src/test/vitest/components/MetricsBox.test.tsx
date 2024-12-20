import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useData } from "../../../hooks/useData";
import { MetricsBox } from "../../../components/MetricsBox";

import "@testing-library/jest-dom";
import { Metrics } from "../../../interfaces/Metrics";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock the dependencies
vi.mock("../../../hooks/useData");

describe("MetricsBox Component", () => {
  const mockMetrics:Metrics = {
    average: "3600", // 1 hour
    averageLow: "1800", // 30 minutes
    averageMedium: "5400", // 1.5 hours
    averageHigh: "7200", // 2 hours
  };

  beforeEach(() => {
    // Mock the useData hook to return predefined metrics
    const mockUseData = useData as jest.Mock;

    const setPages = vi.fn();
    const setRows = vi.fn();
    const setMetrics = vi.fn();

    mockUseData.mockReturnValue({
      setMetrics,
      setPages,
      setRows,
      pages: { totalPages: 1, actualPage: 1 },
      metrics: mockMetrics,
    });
  });

  it("renders the metrics box with correct labels", () => {
    render(<MetricsBox />);

    // Check main labels
    expect(
      screen.getByText("Average time to finish tasks:")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Average time to finish tasks by priority:")
    ).toBeInTheDocument();
  });

  it("displays correct metrics with humanized times", () => {
    render(<MetricsBox />);

    // Check overall average
    expect(screen.getByText("1h")).toBeInTheDocument();

    // Check priority-based averages
    expect(screen.getByText("Low: 30m")).toBeInTheDocument();
    expect(screen.getByText("Medium: 1h 30m")).toBeInTheDocument();
    expect(screen.getByText("High: 2h")).toBeInTheDocument();
  });

  it("renders with Material-UI components", () => {
    const { container } = render(<MetricsBox />);

    // Check for MUI Box component
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(1);

    // Check for Divider
    const divider = container.querySelector(".MuiDivider-root");
    expect(divider).toBeInTheDocument();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
