import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { postTodoDone } from "../api/postTodoDone";
import { putTodoUndone } from "../api/putTodoUndone";
import { TodoRow } from "../components/TodoRow";
import { Todo } from "../interfaces/Todo";

import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock dependencies
vi.mock("../api/postTodoDone");
vi.mock("../api/putTodoUndone");
vi.mock("../hooks/useDialog", () => ({
  useDialog: () => ({
    setSelectedItem: vi.fn(),
    setOpenEdit: vi.fn(),
    setOpenRemove: vi.fn(),
  }),
}));

vi.mock("../hooks/useData", () => ({
  useData: () => ({
    setUpdateData: vi.fn(),
    updateData: false,
  }),
}));

const mockTodo: Todo = {
  id: 1,
  text: "Test Todo",
  done: false,
  priority: "MEDIUM",
  creationDate: "2024-01-01",
  dueDate: "2024-01-15",
  doneDate: null,
};

const renderComponent = (todo = mockTodo) => {
  return render(
    <table>
      <tbody>
        <TodoRow row={todo} index={0} />
      </tbody>
    </table>
  );
};

describe("TodoRow Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders todo item correctly", () => {
    renderComponent();

    // Check if todo text is rendered
    expect(screen.getByText("Test Todo")).toBeInTheDocument();

    // Check priority
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();

    // Check due date
    expect(screen.getByText("15/01/2024")).toBeInTheDocument();
  });

  it("renders buttons correctly", () => {
    renderComponent();

    // Check edit button
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    // Check delete button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("handles marking todo as done", async () => {
    // Mock successful API call

    vi.mocked(postTodoDone).mockResolvedValue({
      ...mockTodo,
      done: true,
      doneDate: "2024-01-15",
    });

    renderComponent();

    // Find and click the checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(postTodoDone).toHaveBeenCalledWith(1);
    });
  });

  it("handles marking todo as undone", async () => {
    // Create a todo that is already done
    const doneTodo = { ...mockTodo, done: true, doneDate: "2024-01-15" };

    // Mock successful API call
    vi.mocked(putTodoUndone).mockResolvedValue(doneTodo);

    renderComponent(doneTodo);

    // Find and click the checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(putTodoUndone).toHaveBeenCalledWith(1);
    });
  });
});
