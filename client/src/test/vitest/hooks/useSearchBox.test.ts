import { renderHook, act } from "@testing-library/react";
import { useSearchBox } from "../../../hooks/useSearchBox";
import { vi } from "vitest";
import { useData } from "../../../hooks/useData";

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

describe("useSearchBox", () => {
  it("should initialize with values from useData", () => {
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData: vi.fn(),
      setSearchQuery: vi.fn(),
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: vi.fn(),
      setFilterState: vi.fn(),
    });

    const { result } = renderHook(() => useSearchBox());

    expect(result.current.filterPriority).toBe("ALL");
    expect(result.current.filterState).toBe("ALL");
  });

  it("should reset filters when handleResetFilters is called", () => {
    const setFilterPriority = vi.fn();
    const setFilterState = vi.fn();
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData: vi.fn(),
      setSearchQuery: vi.fn(),
      filterPriority: "HIGH",
      filterState: "DONE",
      setFilterPriority,
      setFilterState,
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleResetFilters();
    });

    expect(setFilterPriority).toHaveBeenCalledWith("ALL");
    expect(setFilterState).toHaveBeenCalledWith("ALL");
  });

  it("should update search query when handleSearch is called", () => {
    const setSearchQuery = vi.fn();
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData: vi.fn(),
      setSearchQuery,
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: vi.fn(),
      setFilterState: vi.fn(),
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleSearch("test");
    });

    expect(setSearchQuery).toHaveBeenCalledWith("test");
  });

  it("should cancel search and toggle updateData when handleCancelSearch is called", () => {
    const setSearchQuery = vi.fn();
    const setUpdateData = vi.fn();
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData,
      setSearchQuery,
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: vi.fn(),
      setFilterState: vi.fn(),
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleCancelSearch();
    });

    expect(setSearchQuery).toHaveBeenCalledWith("");
    expect(setUpdateData).toHaveBeenCalledWith(true);
  });

  it("should update filter priority when handleFilterPriority is called", () => {
    const setFilterPriority = vi.fn();
    const mockUseData = useData as jest.Mock;
    
    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData: vi.fn(),
      setSearchQuery: vi.fn(),
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority,
      setFilterState: vi.fn(),
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleFilterPriority({
        target: { value: "HIGH" },
      } as any); // `as any` to bypass type checks for test
    });

    expect(setFilterPriority).toHaveBeenCalledWith("HIGH");
  });

  it("should update filter state when handleFilterState is called", () => {
    const setFilterState = vi.fn();
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData: vi.fn(),
      setSearchQuery: vi.fn(),
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: vi.fn(),
      setFilterState,
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleFilterState({
        target: { value: "DONE" },
      } as any); // `as any` to bypass type checks for test
    });

    expect(setFilterState).toHaveBeenCalledWith("DONE");
  });

  it("should toggle updateData when handleSubmit is called", () => {
    const setUpdateData = vi.fn();
    const mockUseData = useData as jest.Mock;

    mockUseData.mockReturnValue({
      updateData: false,
      setUpdateData,
      setSearchQuery: vi.fn(),
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: vi.fn(),
      setFilterState: vi.fn(),
    });

    const { result } = renderHook(() => useSearchBox());

    act(() => {
      result.current.handleSubmit();
    });

    expect(setUpdateData).toHaveBeenCalledWith(true);
  });
});
