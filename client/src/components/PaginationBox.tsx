import { Box, Pagination, Paper } from "@mui/material";
import { usePagination } from "../hooks/usePagination";

export const PaginationBox = () => {
  const { pages, clickedPage, handlePageChange } = usePagination();

  return (
    <Box
      sx={{
        margin: "auto",
        width: "fit-content",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Paper sx={{ padding: 0.5 }}>
        <Pagination
          size="large"
          count={pages.totalPages}
          page={clickedPage}
          onChange={(_, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </Paper>
    </Box>
  );
};
