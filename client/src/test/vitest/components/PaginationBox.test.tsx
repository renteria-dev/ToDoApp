import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { PaginationBox } from "../../../components/PaginationBox";
import { usePagination } from "../../../hooks/usePagination";
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

vi.mock("../../../hooks/usePagination", () => ({
  usePagination: vi.fn(() => ({
    pages: { totalPages: 5, actualPage: 1 },
    clickedPage: 1,
    handlePageChange: vi.fn(),
  })),
}));

describe("PaginationBox", () => {
  it("should render pagination component with correct props", () => {
    render(<PaginationBox />);
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
  });

  it("should call handlePageChange on page click", () => {
    const handlePageChange = vi.fn();
    vi.mocked(usePagination).mockReturnValue({
      pages: { totalPages: 5, actualPage: 1 },
      clickedPage: 1,
      handlePageChange,
    });

    render(<PaginationBox />);
    const pageButton = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(pageButton);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
