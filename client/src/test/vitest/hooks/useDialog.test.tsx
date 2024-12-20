import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { useDialog, DialogContextProvider } from "../../../hooks/useDialog";
import { Todo } from "../../../interfaces/Todo";

describe("useDialog and DialogContextProvider", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DialogContextProvider>{children}</DialogContextProvider>
  );

  const sampleTodo: Todo = {
    id: 1,
    text: "Test Todo",
    priority: "HIGH",
    creationDate: "2024-12-18",
    done: false,
    dueDate: "2024-12-20",
    doneDate: null,
  };

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    expect(result.current.createdItem).toBeNull();
    expect(result.current.selectedItem).toBeNull();
    expect(result.current.openCreate).toBe(false);
    expect(result.current.openEdit).toBe(false);
    expect(result.current.openRemove).toBe(false);
  });

  it("should update createdItem when setCreatedItem is called", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    act(() => {
      result.current.setCreatedItem(sampleTodo);
    });

    expect(result.current.createdItem).toEqual(sampleTodo);

    act(() => {
      result.current.setCreatedItem(null);
    });

    expect(result.current.createdItem).toBeNull();
  });

  it("should update selectedItem when setSelectedItem is called", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    act(() => {
      result.current.setSelectedItem(sampleTodo);
    });

    expect(result.current.selectedItem).toEqual(sampleTodo);

    act(() => {
      result.current.setSelectedItem(null);
    });

    expect(result.current.selectedItem).toBeNull();
  });

  it("should update openCreate when setOpenCreate is called", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    act(() => {
      result.current.setOpenCreate(true);
    });

    expect(result.current.openCreate).toBe(true);

    act(() => {
      result.current.setOpenCreate(false);
    });

    expect(result.current.openCreate).toBe(false);
  });

  it("should update openEdit when setOpenEdit is called", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    act(() => {
      result.current.setOpenEdit(true);
    });

    expect(result.current.openEdit).toBe(true);

    act(() => {
      result.current.setOpenEdit(false);
    });

    expect(result.current.openEdit).toBe(false);
  });

  it("should update openRemove when setOpenRemove is called", () => {
    const { result } = renderHook(() => useDialog(), { wrapper });

    act(() => {
      result.current.setOpenRemove(true);
    });

    expect(result.current.openRemove).toBe(true);

    act(() => {
      result.current.setOpenRemove(false);
    });

    expect(result.current.openRemove).toBe(false);
  });
});
