import Box from "@mui/material/Box";
import { Pagination, Paper } from "@mui/material";
import getTodos from "../api/getTodos";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
function PaginationBox() {
  const {
    setMetrics,
    pages,
    setPages,
    setRows,
    updateData,
    filterPriority,
    filterState,
    searchQuery,
  } = useData();
  const [clickedPage, setClickedPage] = useState<number>(1);

  useEffect(() => {
    getTodos(clickedPage, filterPriority, filterState, searchQuery)
      .then((response) => {
        if (response) {
          setPages(response.pages);
          setRows(response.todos);
          setMetrics(response.metrics);
        }
      })
      .catch(console.error);
  }, [clickedPage, updateData, filterPriority, filterState]);

  const handleChange = async (_event: any, clickedPage: number) => {
    setClickedPage(clickedPage);
  };
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
          size={"large"}
          count={pages.totalPages}
          page={pages.actualPage}
          onChange={handleChange}
          variant={"outlined"}
          shape={"rounded"}
          color="secondary"
        />
      </Paper>
    </Box>
  );
}
export default PaginationBox;
