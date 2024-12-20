import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../../../hooks/usePagination";
import { vi } from "vitest";
import { getTodos } from "../../../api/getTodos";
import { useData } from "../../../hooks/useData";

// Mock useData hook
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

// Mock getTodos function
vi.mock("../../../api/getTodos", () => ({
  getTodos: vi.fn(),
}));

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const mockGetTodos = getTodos as jest.Mock;
    const mockUseData = useData as jest.Mock;

    mockGetTodos.mockResolvedValue({
      pages: { totalPages: 1, actualPage: 1 },
      content: [],
      metrics: {},
    });

    const setPages = vi.fn();
    const setRows = vi.fn();
    const setMetrics = vi.fn();

    mockUseData.mockReturnValue({
      setMetrics,
      setPages,
      setRows,
      pages: { totalPages: 1, actualPage: 1 },
      updateData: false,
      filterPriority: "HIGH",
      filterState: "OPEN",
      searchQuery: "test",
    });

    const { result } = renderHook(() => usePagination());

    expect(result.current.clickedPage).toBe(1);
    expect(result.current.pages).toEqual({ totalPages: 1, actualPage: 1 });
  });

  it("should update clickedPage when handlePageChange is called", () => {
    const mockGetTodos = getTodos as jest.Mock;
    const mockUseData = useData as jest.Mock;

    mockGetTodos.mockResolvedValue({
      pages: { totalPages: 5, actualPage: 2 },
      content: [],
      metrics: {},
    });

    const setPages = vi.fn();
    const setRows = vi.fn();
    const setMetrics = vi.fn();

    mockUseData.mockReturnValue({
      setMetrics,
      setPages,
      setRows,
      pages: { totalPages: 5, actualPage: 1 },
      updateData: false,
      filterPriority: "HIGH",
      filterState: "OPEN",
      searchQuery: "test",
    });

    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.clickedPage).toBe(2);
  });

  it("should call getTodos with correct parameters", async () => {
    const mockGetTodos = getTodos as jest.Mock;
    const mockUseData = useData as jest.Mock;

    mockGetTodos.mockResolvedValue({
      pages: { totalPages: 5, actualPage: 2 },
      content: [],
      metrics: {},
    });

    const setPages = vi.fn();
    const setRows = vi.fn();
    const setMetrics = vi.fn();

    mockUseData.mockReturnValue({
      setMetrics,
      setPages,
      setRows,
      pages: { totalPages: 5, actualPage: 1 },
      updateData: false,
      filterPriority: "HIGH",
      filterState: "OPEN",
      searchQuery: "test",
    });

    const { result } = renderHook(() => usePagination());

    await act(async () => {
      result.current.handlePageChange(2);
    });

    expect(mockGetTodos).toHaveBeenCalledWith(2, "HIGH", "OPEN", "test");
    expect(setPages).toHaveBeenCalledWith({ totalPages: 5, actualPage: 2 });
    expect(setRows).toHaveBeenCalledWith([]);
    expect(setMetrics).toHaveBeenCalledWith({});
  });
});
