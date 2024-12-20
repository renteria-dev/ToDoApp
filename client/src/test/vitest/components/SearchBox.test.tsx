import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  SearchBox,
  SearchBoxView,
  SearchBoxViewProps,
} from "../../../components/SearchBox";
import "@testing-library/jest-dom";
import { useSearchBox } from "../../../hooks/useSearchBox";
import { useData } from "../../../hooks/useData";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock `useSearchBox` hook
vi.mock("../../../hooks/useSearchBox", () => ({
  useSearchBox: vi.fn(),
}));
// Mock `useSearchBox` hook
vi.mock("../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

describe("SearchBox", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockHandleResetFilters = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleCancelSearch = vi.fn();
    const mockHandleFilterPriority = vi.fn();
    const mockHandleFilterState = vi.fn();
    const mockHandleSubmit = vi.fn();

    (useSearchBox as jest.Mock).mockReturnValue({
      filterPriority: "ALL",
      filterState: "ALL",
      handleResetFilters: mockHandleResetFilters,
      handleSearch: mockHandleSearch,
      handleCancelSearch: mockHandleCancelSearch,
      handleFilterPriority: mockHandleFilterPriority,
      handleFilterState: mockHandleFilterState,
      handleSubmit: mockHandleSubmit,
    });

    const mockUpdateData = vi.fn();
    const mockSetFilterPriority = vi.fn();
    const mockSetFilterState = vi.fn();
    const mockSetSearchQuery = vi.fn();

    (useData as jest.Mock).mockReturnValue({
      updateData: false,
      filterPriority: "ALL",
      filterState: "ALL",
      setFilterPriority: mockSetFilterPriority,
      setFilterState: mockSetFilterState,
      setSearchQuery: mockSetSearchQuery,
      setUpdateData: mockUpdateData,
    });
  });

  it("renders the SearchBoxView component with proper props", () => {
    render(<SearchBox />);

    // Verify `SearchBoxView` is rendered with the correct props
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter Priority")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter State")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "send" })).toBeInTheDocument();
  });

  it("handles button clicks and state changes", () => {
    const mockHandleResetFilters = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleCancelSearch = vi.fn();
    const mockHandleFilterPriority = vi.fn();
    const mockHandleFilterState = vi.fn();
    const mockHandleSubmit = vi.fn();

    const props: SearchBoxViewProps = {
      filterPriority: "ALL",
      filterState: "ALL",
      onResetFilters: mockHandleResetFilters,
      onSearch: mockHandleSearch,
      onCancelSearch: mockHandleCancelSearch,
      onFilterPriorityChange: mockHandleFilterPriority,
      onFilterStateChange: mockHandleFilterState,
      onSubmit: mockHandleSubmit,
    };

    render(<SearchBoxView {...props} />);

    // Test the search bar
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(mockHandleSearch).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "send" }));
    expect(mockHandleSubmit).toHaveBeenCalled();

    // Test priority filter
    const priorityFilter = screen.getByLabelText("Filter Priority");
    fireEvent.mouseDown(priorityFilter); // Open the dropdown
    const highOption = screen.getByRole("option", { name: "High" });
    fireEvent.click(highOption); // Select the option
    expect(mockHandleFilterPriority).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "HIGH",
        }),
      }),
      expect.anything()
    );

    // Test state filter
    const stateFilter = screen.getByLabelText("Filter State");
    fireEvent.mouseDown(stateFilter); // Open the dropdown
    const doneOption = screen.getByRole("option", { name: "Done" });
    fireEvent.click(doneOption); // Select the option
    expect(mockHandleFilterState).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "DONE",
        }),
      }),
      expect.anything()
    );
  });

  it("handles reset button click", () => {
    const mockHandleResetFilters = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleCancelSearch = vi.fn();
    const mockHandleFilterPriority = vi.fn();
    const mockHandleFilterState = vi.fn();
    const mockHandleSubmit = vi.fn();

    const props: SearchBoxViewProps = {
      filterPriority: "HIGH",
      filterState: "DONE",
      onResetFilters: mockHandleResetFilters,
      onSearch: mockHandleSearch,
      onCancelSearch: mockHandleCancelSearch,
      onFilterPriorityChange: mockHandleFilterPriority,
      onFilterStateChange: mockHandleFilterState,
      onSubmit: mockHandleSubmit,
    };

    render(<SearchBoxView {...props} />);
    // Test reset filters button
    const resetButton = screen.getByRole("button", { name: "restore" });
    expect(resetButton).not.toBeDisabled();
    fireEvent.click(resetButton);
    expect(mockHandleResetFilters).toHaveBeenCalled();
  });

  it("disables reset button when filters are in default state", () => {
    const props: SearchBoxViewProps = {
      filterPriority: "ALL",
      filterState: "ALL",
      onResetFilters: vi.fn(),
      onSearch: vi.fn(),
      onCancelSearch: vi.fn(),
      onFilterPriorityChange: vi.fn(),
      onFilterStateChange: vi.fn(),
      onSubmit: vi.fn(),
    };

    render(<SearchBoxView {...props} />);

    const resetButton = screen.getByRole("button", { name: "restore" });
    expect(resetButton).toBeDisabled();
  });

  it("enables reset button when filters are not in default state", () => {
    const props: SearchBoxViewProps = {
      filterPriority: "HIGH",
      filterState: "DONE",
      onResetFilters: vi.fn(),
      onSearch: vi.fn(),
      onCancelSearch: vi.fn(),
      onFilterPriorityChange: vi.fn(),
      onFilterStateChange: vi.fn(),
      onSubmit: vi.fn(),
    };

    render(<SearchBoxView {...props} />);

    const resetButton = screen.getByRole("button", { name: "restore" });
    expect(resetButton).not.toBeDisabled();
  });
});
