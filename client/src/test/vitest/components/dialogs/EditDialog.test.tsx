import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { putTodoEdit } from "../../../../api/putTodoEdit";
import { EditDialog } from "../../../../components/dialogs/EditDialog";
import { useData } from "../../../../hooks/useData";
import { useDialog } from "../../../../hooks/useDialog";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { AxiosError } from "axios";

// Mock the required hooks and API call
vi.mock("../../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
}));

vi.mock("../../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

vi.mock("../../../../api/putTodoEdit", () => ({
  putTodoEdit: vi.fn(),
}));

vi.mock("notistack", () => ({
  useSnackbar: vi.fn(),
}));

describe("EditDialog", () => {
  const mockSetSelectedItem = vi.fn();
  const mockSetOpenEdit = vi.fn();
  const mockSetOpenCreate = vi.fn();
  const mockSetOpenRemove = vi.fn();
  const mockSetUpdateData = vi.fn();
  const mockEnqueueSnackbar = vi.fn();

  const initialTodo = {
    id: 1,
    text: "Initial Task",
    priority: "MEDIUM",
    creationDate: dayjs().subtract(1, "day").toISOString(),
    done: false,
    dueDate: dayjs().add(3, "days").startOf("day").toISOString(),
    doneDate: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useDialog as jest.Mock).mockReturnValue({
      openEdit: true,
      setOpenEdit: mockSetOpenEdit,
      setSelectedItem: mockSetSelectedItem,
      setOpenCreate: mockSetOpenCreate,
      setOpenRemove: mockSetOpenRemove,
      selectedItem: initialTodo,
    });

    (useData as jest.Mock).mockReturnValue({
      updateData: false,
      setUpdateData: mockSetUpdateData,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    (putTodoEdit as jest.Mock).mockResolvedValue({}); // Mock a successful API response
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with the correct initial values", () => {
    render(<EditDialog />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Initial Task");

    expect(screen.getByLabelText("Add due date")).toBeChecked();
    expect(screen.getByPlaceholderText("DD/MM/YYYY")).toHaveValue(
      dayjs(initialTodo.dueDate).format("DD/MM/YYYY")
    );
  });

  it("closes the dialog when cancel is clicked", async () => {
    render(<EditDialog />);

    act(() => {
      fireEvent.click(screen.getByText("Cancel"));
    });

    expect(mockSetOpenEdit).toHaveBeenCalledWith(false);
  });

  it("edits a task without changing the due date", async () => {
    render(<EditDialog />);

    // Edit the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Edited Task" } });

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save Changes"));
    await waitFor(() => {
      expect(putTodoEdit).toHaveBeenCalledWith(1, {
        ...initialTodo,
        text: "Edited Task",
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Task Edited", {
        variant: "success",
      });
      expect(mockSetUpdateData).toHaveBeenCalledWith(true);
      expect(mockSetOpenEdit).toHaveBeenCalledWith(false);
    });
  });

  it("edits a task and changes the due date", async () => {
    render(<EditDialog />);

    // Edit the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Edited Task" } });

    // Change the due date
    const dueDateInput = screen.getByPlaceholderText("DD/MM/YYYY");
    fireEvent.change(dueDateInput, {
      target: { value: dayjs().add(7, "days").format("DD/MM/YYYY") },
    });

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save Changes"));
    await waitFor(() => {
      expect(putTodoEdit).toHaveBeenCalledWith(1, {
        ...initialTodo,
        text: "Edited Task",
        dueDate: dayjs().add(7, "days").startOf("day").toISOString(),
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Task Edited", {
        variant: "success",
      });
      expect(mockSetUpdateData).toHaveBeenCalledWith(true);
      expect(mockSetOpenEdit).toHaveBeenCalledWith(false);
    });
  });

  it("shows an error when the API call fails", async () => {
    const error = new Error("Test error") as AxiosError;
    (putTodoEdit as jest.Mock).mockRejectedValue(error);

    render(<EditDialog />);

    // Edit the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Edited Task" } });

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save Changes"));
    await waitFor(() => {
      // the expected called with is:
      // Array [
      //       1,
      //       Object {
      //         "creationDate": "2024-12-18T22:47:00.129Z",
      //         "done": false,
      //         "doneDate": null,
      //         "dueDate": "2024-12-22T22:47:00.130Z",
      //         "id": 1,
      //         "priority": "MEDIUM",
      //         "text": "Edited Task",
      //       },
      //     ]

      expect(putTodoEdit).toHaveBeenCalledWith(1, {
        ...initialTodo,
        text: "Edited Task",
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Test error", {
        variant: "error",
      });
    });
  });
});
