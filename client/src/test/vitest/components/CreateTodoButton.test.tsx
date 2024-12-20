import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateTodoButton } from "../../../components/CreateTodoButton";
import { DialogContext } from "../../../hooks/useDialog";
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

// Mock implementation of DialogContext
const createMockDialogContext = (
  overrides: Partial<{
    openCreate: boolean;
    setOpenCreate: (open: boolean) => void;
  }> = {}
) => ({
  createdItem: null,
  selectedItem: null,
  openCreate: false,
  openEdit: false,
  openRemove: false,
  setCreatedItem: vi.fn(),
  setSelectedItem: vi.fn(),
  setOpenEdit: vi.fn(),
  setOpenRemove: vi.fn(),
  setOpenCreate: vi.fn(),
  ...overrides,
});

describe("CreateTodoButton", () => {
  it("renders the button correctly", () => {
    const mockContext = createMockDialogContext();

    render(
      <DialogContext.Provider value={mockContext}>
        <CreateTodoButton />
      </DialogContext.Provider>
    );

    const button = screen.getByText("New Todo");
    expect(button).toBeInTheDocument();
  });

  it("opens create dialog when button is clicked", async () => {
    const mockSetOpenCreate = vi.fn();
    const mockContext = createMockDialogContext({
      setOpenCreate: mockSetOpenCreate,
    });

    render(
      <DialogContext.Provider value={mockContext}>
        <CreateTodoButton />
      </DialogContext.Provider>
    );

    const button = screen.getByText("New Todo");

    fireEvent.click(button);

    expect(mockSetOpenCreate).toHaveBeenCalledWith(true);
  });
});
