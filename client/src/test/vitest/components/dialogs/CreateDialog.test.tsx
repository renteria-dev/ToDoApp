import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { postTodoCreate } from "../../../../api/postTodoCreate";
import { CreateDialog } from "../../../../components/dialogs/CreateDialog";
import { useData } from "../../../../hooks/useData";
import { useDialog } from "../../../../hooks/useDialog";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { AxiosError } from "axios";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock the required hooks and API call
vi.mock("../../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
}));

vi.mock("../../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

vi.mock("../../../../api/postTodoCreate", () => ({
  postTodoCreate: vi.fn(),
}));

vi.mock("notistack", () => ({
  useSnackbar: vi.fn(),
}));

describe("CreateDialog", () => {
  const mockSetSelectedItem = vi.fn();
  const mockSetOpenEdit = vi.fn();
  const mockSetOpenCreate = vi.fn();
  const mockSetOpenRemove = vi.fn();
  const mockSetUpdateData = vi.fn();
  const mockEnqueueSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDialog as jest.Mock).mockReturnValue({
      openCreate: true,
      setOpenCreate: mockSetOpenCreate,
      setSelectedItem: mockSetSelectedItem,
      setOpenEdit: mockSetOpenEdit,
      setOpenRemove: mockSetOpenRemove,
    });

    (useData as jest.Mock).mockReturnValue({
      updateData: false,
      setUpdateData: mockSetUpdateData,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    (postTodoCreate as jest.Mock).mockResolvedValue({}); // Mock a successful API response
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with the correct initial values", () => {
    render(<CreateDialog />);

    expect(screen.getByText("Create Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByRole("combobox"));
    expect(screen.getByLabelText("Add due date")).not.toBeChecked();
  });

  it("closes the dialog when cancel is clicked", async () => {
    render(<CreateDialog />);

    act(() => {
      fireEvent.click(screen.getByText("Cancel"));
    });

    expect(mockSetOpenCreate).toHaveBeenCalledWith(false);
  });

  it("creates a task without a due date when 'Add due date' is not checked", async () => {
    render(<CreateDialog />);

    // Fill in the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Test Task" } });

    // Open the priority dropdown and select "HIGH"
    const priorityField = screen.getByLabelText("Priority");
    fireEvent.mouseDown(priorityField); // Open the dropdown
    const highOption = await screen.findByText("HIGH"); // Wait for the dropdown to render
    fireEvent.click(highOption); // Select the "HIGH" option

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(postTodoCreate).toHaveBeenCalledWith({
        id: 0,
        text: "Test Task",
        priority: "HIGH",
        creationDate: null,
        done: false,
        dueDate: null,
        doneDate: null,
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "Task Created Successfully",
        { variant: "success" }
      );
      expect(mockSetUpdateData).toHaveBeenCalledWith(true);
      expect(mockSetOpenCreate).toHaveBeenCalledWith(false);
    });
  });

  it("creates a task with a due date when 'Add due date' is checked", async () => {
    render(<CreateDialog />);

    // Fill in the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Test Task" } });

    // Open the priority dropdown and select "HIGH"
    const priorityField = screen.getByLabelText("Priority");
    fireEvent.mouseDown(priorityField); // Open the dropdown
    const highOption = await screen.findByText("HIGH"); // Wait for the dropdown to render
    fireEvent.click(highOption); // Select the "HIGH" option

    fireEvent.click(screen.getByLabelText("Add due date"));
    const dueDateInput = screen.getByPlaceholderText("DD/MM/YYYY");
    fireEvent.change(dueDateInput, {
      target: { value: dayjs().add(5, "days").format("DD/MM/YYYY") },
    });

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(postTodoCreate).toHaveBeenCalledWith({
        id: 0,
        text: "Test Task",
        priority: "HIGH",
        creationDate: null,
        done: false,
        dueDate: dayjs().add(5, "days").startOf("day").toISOString(),
        doneDate: null,
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "Task Created Successfully",
        { variant: "success" }
      );
      expect(mockSetUpdateData).toHaveBeenCalledWith(true);
      expect(mockSetOpenCreate).toHaveBeenCalledWith(false);
    });
  });

  it("shows an error when the API call fails", async () => {
    const error = new Error("Test error") as AxiosError;
    (postTodoCreate as jest.Mock).mockRejectedValue(error);

    render(<CreateDialog />);

    // Fill in the task name
    const textField = screen.getByLabelText("Name");
    fireEvent.change(textField, { target: { value: "Test Task" } });

    // Open the priority dropdown and select "HIGH"
    const priorityField = screen.getByLabelText("Priority");
    fireEvent.mouseDown(priorityField); // Open the dropdown
    const highOption = await screen.findByText("HIGH"); // Wait for the dropdown to render
    fireEvent.click(highOption); // Select the "HIGH" option

    // Click the "Save" button
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(postTodoCreate).toHaveBeenCalledWith({
        id: 0,
        text: "Test Task",
        priority: "HIGH",
        creationDate: null,
        done: false,
        dueDate: null,
        doneDate: null,
      });

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Test error", {
        variant: "error",
      });
    });
  });
});
