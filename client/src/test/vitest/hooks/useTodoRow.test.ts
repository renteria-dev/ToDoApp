import { renderHook, act } from "@testing-library/react";
import { useTodoRow } from "../../../hooks/useTodoRow";
import { postTodoDone } from "../../../api/postTodoDone";
import { putTodoUndone } from "../../../api/putTodoUndone";
import { useDialog } from "../../../hooks/useDialog";
import { useData } from "../../../hooks/useData";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { alpha } from "@mui/material";
import { red, yellow, green } from "@mui/material/colors";
import { vi } from "vitest";

vi.mock("../../../hooks/useDialog", () => ({
  useDialog: vi.fn(),
}));

vi.mock("../../../hooks/useData", () => ({
  useData: vi.fn(),
}));

vi.mock("../../../api/postTodoDone", () => ({
  postTodoDone: vi.fn(),
}));

vi.mock("../../../api/putTodoUndone", () => ({
  putTodoUndone: vi.fn(),
}));

vi.mock("notistack", () => ({
  useSnackbar: vi.fn(),
}));

describe("useTodoRow", () => {
  const row = {
    id: 1,
    text: "Test Task",
    priority: "HIGH",
    creationDate: "2024-12-10",
    done: false,
    dueDate: "2024-12-20",
    doneDate: null,
  };

  const mockSetSelectedItem = vi.fn();
  const mockSetOpenEdit = vi.fn();
  const mockSetOpenRemove = vi.fn();
  const mockSetUpdateData = vi.fn();
  const mockEnqueueSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useDialog as jest.Mock).mockReturnValue({
      setSelectedItem: mockSetSelectedItem,
      setOpenEdit: mockSetOpenEdit,
      setOpenRemove: mockSetOpenRemove,
    });

    (useData as jest.Mock).mockReturnValue({
      setUpdateData: mockSetUpdateData,
      updateData: false,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });
  });

  it("should initialize with row.done as visualChecked", () => {
    const { result } = renderHook(() => useTodoRow(row));
    expect(result.current.visualChecked).toBe(row.done);
  });

  it("should open the edit dialog when openEditDialog is called", () => {
    const { result } = renderHook(() => useTodoRow(row));

    act(() => {
      result.current.openEditDialog();
    });

    expect(mockSetSelectedItem).toHaveBeenCalledWith(row);
    expect(mockSetOpenEdit).toHaveBeenCalledWith(true);
  });

  it("should open the remove dialog when openRemoveDialog is called", () => {
    const { result } = renderHook(() => useTodoRow(row));

    act(() => {
      result.current.openRemoveDialog();
    });

    expect(mockSetSelectedItem).toHaveBeenCalledWith(row);
    expect(mockSetOpenRemove).toHaveBeenCalledWith(true);
  });

  it("should call postTodoDone and update state when handleCheckboxToggle is called for an incomplete task", async () => {
    const { result } = renderHook(() => useTodoRow(row));

    (postTodoDone as jest.Mock).mockResolvedValue({});

    await act(async () => {
      result.current.handleCheckboxToggle();
    });

    expect(postTodoDone).toHaveBeenCalledWith(row.id);
    expect(result.current.visualChecked).toBe(true);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(`Task ${row.text} Done`, {
      variant: "success",
    });
    expect(mockSetUpdateData).toHaveBeenCalledWith(true);
  });

  it("should call putTodoUndone and update state when handleCheckboxToggle is called for a completed task", async () => {
    const modifiedRow = { ...row, done: true };
    const { result } = renderHook(() => useTodoRow(modifiedRow));

    (putTodoUndone as jest.Mock).mockResolvedValue({});

    await act(async () => {
      result.current.handleCheckboxToggle();
    });

    expect(putTodoUndone).toHaveBeenCalledWith(modifiedRow.id);
    expect(result.current.visualChecked).toBe(false);
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
      `Task ${modifiedRow.text} Undone`,
      { variant: "info" }
    );
    expect(mockSetUpdateData).toHaveBeenCalledWith(true);
  });

  it("should calculate correct colors based on dueDate", () => {
    const { result } = renderHook(() => useTodoRow(row));
    const today = dayjs();

    const dueSoonDate = today.add(5, "day").format("YYYY-MM-DD");
    const dueLaterDate = today.add(10, "day").format("YYYY-MM-DD");
    const dueFarDate = today.add(20, "day").format("YYYY-MM-DD");

    expect(result.current.calculateColor(dueSoonDate)).toBe(
      alpha(red["A400"], 0.2)
    );
    expect(result.current.calculateColor(dueLaterDate)).toBe(
      alpha(yellow["A700"], 0.3)
    );
    expect(result.current.calculateColor(dueFarDate)).toBe(
      alpha(green["A700"], 0.3)
    );
    expect(result.current.calculateColor(null)).toBe("background");
  });

  it("should handle API errors during handleCheckboxToggle", async () => {
    const { result } = renderHook(() => useTodoRow(row));

    (postTodoDone as jest.Mock).mockRejectedValue(new Error("Network error"));

    await act(async () => {
      result.current.handleCheckboxToggle();
    });

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Network error", {
      variant: "error",
    });
  });
});
