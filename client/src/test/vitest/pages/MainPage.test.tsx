import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { vi } from "vitest";
import { useData, DataContextProvider } from "../../../hooks/useData";
import { useDialog, DialogContextProvider } from "../../../hooks/useDialog";
import MainPage from "../../../pages/MainPage";

import "@testing-library/jest-dom";
import { getTodos } from "../../../api/getTodos";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock the necessary hooks and API calls
vi.mock("../../../hooks/useData", () => ({
  useData: vi.fn(),
  DataContextProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div> // Just a simple wrapper
  ),
}));

vi.mock("../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
  DialogContextProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div> // Just a simple wrapper
  ),
}));

// Mock API calls (assuming it's an imported function)
vi.mock("../../../api/getTodos", () => ({
  getTodos: vi.fn(),
}));

describe("MainPage", () => {
  beforeEach(() => {
    // Mock the data context
    (useData as jest.Mock).mockReturnValue({
      rows: [], // Empty rows as per your requirement
      setRows: vi.fn(),
      pages: { actualPage: 1, totalPages: 1 },
      setPages: vi.fn(),
      metrics: {
        average: "2",
        averageLow: "1",
        averageMedium: "2",
        averageHigh: "3",
      },
      setMetrics: vi.fn(),
      searchQuery: "",
      setSearchQuery: vi.fn(),
      filterPriority: "ALL",
      setFilterPriority: vi.fn(),
      filterState: "ALL",
      setFilterState: vi.fn(),
      updateData: false,
      setUpdateData: vi.fn(),
    });

    // Mock the dialog context
    (useDialog as jest.Mock).mockReturnValue({
      openCreate: false,
      setOpenCreate: vi.fn(),
      openEdit: false,
      setOpenEdit: vi.fn(),
      openRemove: false,
      setOpenRemove: vi.fn(),
      createdItem: null,
      selectedItem: null,
      setCreatedItem: vi.fn(),
      setSelectedItem: vi.fn(),
    });
    const mockGetTodos = getTodos as jest.Mock;
    mockGetTodos.mockResolvedValue({
      pages: { totalPages: 1, actualPage: 1 },
      content: [],
      metrics: {},
    });
  });

  it("renders all components correctly", async () => {
    render(
      <SnackbarProvider>
        <DataContextProvider>
          <DialogContextProvider>
            <MainPage />
          </DialogContextProvider>
        </DataContextProvider>
      </SnackbarProvider>
    );

    // Check for the presence of components (without worrying about row content for now)
    expect(screen.getByTestId("search-box")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-box")).toBeInTheDocument();
    expect(screen.getByTestId("metrics-box")).toBeInTheDocument();
    expect(screen.getByTestId("create-todo-button")).toBeInTheDocument();
    expect(screen.getByTestId("todo-table")).toBeInTheDocument();
  });

  it("calls getTodos API and ensures empty rows", async () => {
    render(
      <SnackbarProvider>
        <DataContextProvider>
          <DialogContextProvider>
            <MainPage />
          </DialogContextProvider>
        </DataContextProvider>
      </SnackbarProvider>
    );

    // Wait for the API call to resolve (in this case, empty data)
    await waitFor(() => {
      expect(screen.getByTestId("todo-table")).toBeInTheDocument();
    });

    // Ensure the rows are empty (since we mock the API to return empty data)
    expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
  });

  it("opens create todo dialog", () => {
    // setOpennCreate is a function that opens the create dialog
    const mockSetOpenCreate = vi.fn();
    (useDialog as jest.Mock).mockReturnValue({
      openCreate: false,
      setOpenCreate: mockSetOpenCreate,
      openEdit: false,
      setOpenEdit: vi.fn(),
      openRemove: false,
      setOpenRemove: vi.fn(),
      createdItem: null,
      selectedItem: null,
      setCreatedItem: vi.fn(),
      setSelectedItem: vi.fn(),
    });

    render(
      <SnackbarProvider>
        <DataContextProvider>
          <DialogContextProvider>
            <MainPage />
          </DialogContextProvider>
        </DataContextProvider>
      </SnackbarProvider>
    );

    // Simulate opening the dialog
    fireEvent.click(screen.getByTestId("create-todo-button"));

    // Ensure the dialog is opened
    expect(mockSetOpenCreate).toHaveBeenCalledWith(true);
  });
});
