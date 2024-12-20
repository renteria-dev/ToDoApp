import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { vi } from "vitest";
import { Todo } from "../../../interfaces/Todo";
import { TodoTable } from "../../../components/TodoTable";
import { useData } from "../../../hooks/useData";
import { useTodoTable } from "../../../hooks/useTodoTable";

import "@testing-library/jest-dom";
import { useDialog } from "../../../hooks/useDialog";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock hooks
vi.mock("../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

vi.mock("../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
}));

vi.mock("../../../hooks/useTodoTable", () => ({
  useTodoTable: vi.fn(),
}));

describe("TodoTable", () => {
  const mockRows: Todo[] = [
    {
      id: 1,
      text: "Task 1",
      priority: "HIGH",
      creationDate: "2024-12-18",
      done: false,
      dueDate: null,
      doneDate: null,
    },
    {
      id: 2,
      text: "Task 2",
      priority: "MEDIUM",
      creationDate: "2024-12-17",
      done: false,
      dueDate: null,
      doneDate: null,
    },
    {
      id: 3,
      text: "Task 3",
      priority: "LOW",
      creationDate: "2024-12-19",
      done: false,
      dueDate: null,
      doneDate: null,
    },
  ];

  const mockHandleRequestSort = vi.fn();
  const mockSortedRows = [...mockRows];

  beforeEach(() => {
    // Mock the return values of the hooks
    (useData as jest.Mock).mockReturnValue({ rows: mockRows });
    (useTodoTable as jest.Mock).mockReturnValue({
      order: "asc",
      orderBy: "creationDate",
      handleRequestSort: mockHandleRequestSort,
      sortedRows: mockSortedRows,
    });
    (useDialog as jest.Mock).mockReturnValue({
      openEdit: false,
      openCreate: false,
      openRemove: false,
      selectedItem: null,
      setOpenEdit: vi.fn(),
      setOpenCreate: vi.fn(),
      setOpenRemove: vi.fn(),
      setSelectedItem: vi.fn(),
    });
  });

  it("renders the TodoTable with the correct number of rows", () => {
    render(<TodoTable />);

    // Check that the table is rendered
    expect(screen.getByTestId("todo-table")).toBeInTheDocument();

    // Verify the number of rows rendered
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length - 2).toBe(mockRows.length);
  });

  it("renders the correct message when there are no rows", () => {
    (useData as jest.Mock).mockReturnValue({ rows: mockRows.slice(0, 0) });
    (useTodoTable as jest.Mock).mockReturnValue({
      sortedRows: [],
    });

    render(<TodoTable />);

    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("displays the TodoRow for each item in the rows", () => {
    render(<TodoTable />);

    // Verify each row in the table corresponds to a Todo item
    mockRows.forEach((todo) => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  it("calls the appropriate sort function on click", async () => {
    render(<TodoTable />);

    const priorityHeader = screen.getByText("Priority");
    fireEvent.click(priorityHeader);

    await waitFor(() => {
      expect(mockHandleRequestSort).toHaveBeenCalled();
    });
  });

  it("renders correct data in the table header", () => {
    render(<TodoTable />);

    // Check table headers
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
    expect(screen.getByText("DueDate")).toBeInTheDocument();
  });
});
