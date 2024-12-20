import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { CustomSearchBar } from "../../../components/CustomSearchBar";

import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

describe("CustomSearchBar", () => {
  it("renders correctly with default props", () => {
    render(<CustomSearchBar />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct placeholder", () => {
    render(<CustomSearchBar placeholder="Search here" />);
    const inputElement = screen.getByPlaceholderText("Search here");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange after debounce time when input changes", async () => {
    const onChangeMock = vi.fn();
    render(<CustomSearchBar onChange={onChangeMock} debounceTime={300} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });

    await waitFor(
      () => {
        expect(onChangeMock).toHaveBeenCalledWith("test");
      },
      { timeout: 350 }
    );
  });

  it("clears the input when clear button is clicked", () => {
    const onCancelSearchMock = vi.fn();
    render(
      <CustomSearchBar value="test" onCancelSearch={onCancelSearchMock} />
    );

    const clearButton = screen.getByRole("button", { name: /clear/i });
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveValue("test");

    fireEvent.click(clearButton);

    expect(inputElement).toHaveValue("");
    expect(onCancelSearchMock).toHaveBeenCalled();
  });

  it("disables the input when disabled prop is true", () => {
    render(<CustomSearchBar disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });

  it("disables the clear button when input is empty", () => {
    render(<CustomSearchBar />);
    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeDisabled();
  });

  it("renders the label if provided", () => {
    render(<CustomSearchBar label="Search Label" />);
    const labelElement = screen.getByLabelText("Search Label");
    expect(labelElement).toBeInTheDocument();
  });
});
