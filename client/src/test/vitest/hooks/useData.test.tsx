import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { useData, DataContextProvider } from "../../../hooks/useData";
import { Todo } from "../../../interfaces/Todo";
import { Page } from "../../../interfaces/Page";
import { Metrics } from "../../../interfaces/Metrics";

describe("useData and DataContextProvider", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DataContextProvider>{children}</DataContextProvider>
  );

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    expect(result.current.rows).toEqual([]);
    expect(result.current.pages).toEqual({ actualPage: 1, totalPages: 1 });
    expect(result.current.metrics).toEqual({
      average: "",
      averageHigh: "",
      averageMedium: "",
      averageLow: "",
    });
    expect(result.current.searchQuery).toBe("");
    expect(result.current.filterPriority).toBe("ALL");
    expect(result.current.filterState).toBe("ALL");
    expect(result.current.updateData).toBe(false);
  });

  it("should update rows when setRows is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newRows: Todo[] = [
      {
        id: 1,
        text: "Test Todo",
        priority: "HIGH",
        done: false,
        creationDate: new Date().toISOString(),
        dueDate: null,
        doneDate: null,
      },
    ];

    act(() => {
      result.current.setRows(newRows);
    });

    expect(result.current.rows).toEqual(newRows);
  });

  it("should update pages when setPages is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newPages: Page = { actualPage: 2, totalPages: 10 };

    act(() => {
      result.current.setPages(newPages);
    });

    expect(result.current.pages).toEqual(newPages);
  });

  it("should update metrics when setMetrics is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newMetrics: Metrics = {
      average: "5",
      averageHigh: "10",
      averageMedium: "7",
      averageLow: "2",
    };

    act(() => {
      result.current.setMetrics(newMetrics);
    });

    expect(result.current.metrics).toEqual(newMetrics);
  });

  it("should update searchQuery when setSearchQuery is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newQuery = "Test query";

    act(() => {
      result.current.setSearchQuery(newQuery);
    });

    expect(result.current.searchQuery).toBe(newQuery);
  });

  it("should update filterPriority when setFilterPriority is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newPriority = "HIGH";

    act(() => {
      result.current.setFilterPriority(newPriority);
    });

    expect(result.current.filterPriority).toBe(newPriority);
  });

  it("should update filterState when setFilterState is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    const newState = "DONE";

    act(() => {
      result.current.setFilterState(newState);
    });

    expect(result.current.filterState).toBe(newState);
  });

  it("should toggle updateData when setUpdateData is called", () => {
    const { result } = renderHook(() => useData(), { wrapper });

    act(() => {
      result.current.setUpdateData(true);
    });

    expect(result.current.updateData).toBe(true);

    act(() => {
      result.current.setUpdateData(false);
    });

    expect(result.current.updateData).toBe(false);
  });
});
