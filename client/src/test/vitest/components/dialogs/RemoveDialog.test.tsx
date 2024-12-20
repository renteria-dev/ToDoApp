import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RemoveDialog } from "../../../../components/dialogs/RemoveDialog";
import { deleteTodo } from "../../../../api/deleteTodo";
import { useDialog } from "../../../../hooks/useDialog";
import { useData } from "../../../../hooks/useData";
import { useSnackbar } from "notistack";
import { vi } from "vitest";
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

vi.mock("../../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
}));

vi.mock("../../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

vi.mock("../../../../api/deleteTodo", () => ({
  deleteTodo: vi.fn(),
}));

vi.mock("notistack", () => ({
  useSnackbar: vi.fn(),
}));



describe("RemoveDialog", () => {
  const mockSetOpenRemove = vi.fn();
  const mockSetSelectedItem = vi.fn();
  const mockSetUpdateData = vi.fn();
  const mockEnqueueSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useDialog as jest.Mock).mockReturnValue({
      openRemove: true,
      selectedItem: { id: 1, text: "Test Task" },
      setOpenRemove: mockSetOpenRemove,
      setSelectedItem: mockSetSelectedItem,
    });

    (useData as jest.Mock).mockReturnValue({
      updateData: false,
      setUpdateData: mockSetUpdateData,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });
  });

  

  it("renders the dialog with the correct content", () => {
    render(<RemoveDialog />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(
      screen.getByText("Do you want to delete this item?")
    ).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("handles successful deletion", async () => {
    (deleteTodo as jest.Mock).mockResolvedValueOnce({});

    render(<RemoveDialog />);

    // Click the "Remove" button
    fireEvent.click(screen.getByText("Remove"));

    // Wait for the deleteTodo call and assertions
    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(1);
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Task Deleted", {
        variant: "success",
      });
      expect(mockSetOpenRemove).toHaveBeenCalledWith(false);
      expect(mockSetSelectedItem).toHaveBeenCalledWith(null);
      expect(mockSetUpdateData).toHaveBeenCalledWith(true);
    });
  });

  it("handles deletion failure", async () => {
    (deleteTodo as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<RemoveDialog />);

    // Click the "Remove" button
    fireEvent.click(screen.getByText("Remove"));

    // Wait for the deleteTodo call and assertions
    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(1);
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("API Error", {
        variant: "success",
      });
      expect(mockSetOpenRemove).not.toHaveBeenCalledWith(false);
      expect(mockSetSelectedItem).not.toHaveBeenCalled();
    });
  });

  it("closes the dialog without deleting", () => {
    render(<RemoveDialog />);

    // Click the "Cancel" button
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockSetOpenRemove).toHaveBeenCalledWith(false);
    expect(mockSetSelectedItem).toHaveBeenCalledWith(null);
  });
});
