import { render, screen, fireEvent, act } from "@testing-library/react";
import dayjs from "dayjs";
import { vi } from "vitest";
import { FormDialog } from "../../../../components/dialogs/FormDialog";
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

describe("FormDialog", () => {
  const mockOnSubmit = vi.fn();
  const mockCloseDialog = vi.fn();

  const defaultProps = {
    initialValues: {
      text: "",
      priority: "MEDIUM",
      dueDate: null,
      checked: false,
    },
    onSubmit: mockOnSubmit,
    openDialog: true,
    closeDialog: mockCloseDialog,
    title: "Test Dialog",
    action: "Submit",
  };

  const renderComponent = (props = {}) =>
    render(<FormDialog {...defaultProps} {...props} />);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with the correct title and action button", () => {
    renderComponent();

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("displays validation errors for required fields on submit", async () => {
    renderComponent();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    expect(await screen.getByText("Task name is required")).toBeInTheDocument();
  });

  it("calls onSubmit with correct value and unchecked due date", async () => {
    renderComponent();

    const nameField = screen.getByLabelText("Name");

    await act(async () => {
      fireEvent.change(nameField, { target: { value: "Test Task" } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        text: "Test Task",
        priority: "MEDIUM",
        dueDate: null,
        checked: false,
      },
      expect.anything() // Formik bag
    );
  });

  it("disables the due date picker when 'Add due date' is unchecked", () => {
    renderComponent();

    const dueDateCheckbox = screen.getByLabelText("Add due date");
    const dueDatePicker = screen.getByPlaceholderText("DD/MM/YYYY");

    expect(dueDatePicker).toBeDisabled();

    fireEvent.click(dueDateCheckbox);

    expect(dueDatePicker).toBeEnabled();
  });

  it("handles the 'Cancel' button click and calls closeDialog", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockCloseDialog).toHaveBeenCalledTimes(1);
  });

  it("validates the due date only if the checkbox is checked", async () => {
    renderComponent();

    const dueDateCheckbox = screen.getByLabelText("Add due date");

    await act(async () => {
      fireEvent.click(dueDateCheckbox);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    expect(screen.getByText("Due Date is required")).toBeInTheDocument();

    const dueDateInput = screen.getByPlaceholderText("DD/MM/YYYY");

    await act(async () => {
      fireEvent.change(dueDateInput, {
        target: { value: dayjs().add(1, "day") },
      });
      fireEvent.blur(dueDateInput);
    });

    expect(screen.queryByText("Due date is required")).not.toBeInTheDocument();
  });
});
