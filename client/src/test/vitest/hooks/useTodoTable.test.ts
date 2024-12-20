import { renderHook } from "@testing-library/react";
import { Todo } from "../../../interfaces/Todo";
import { useTodoTable } from "../../../hooks/useTodoTable";

describe("useTodoTable", () => {
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

  it("should initialize with default order and orderBy", () => {
    const { result } = renderHook(() => useTodoTable(mockRows));

    expect(result.current.order).toBe("asc");
    expect(result.current.orderBy).toBe("creationDate");
  });
});
