import * as React from "react";
import Box from "@mui/material/Box";
import { Pagination, Paper, Typography } from "@mui/material";

function PaginationBar() {
  const [actualPage, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(10);
  const handleChange = (_event: any, value: React.SetStateAction<number>) => {
    setPage(value);
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
      
        <Pagination
          size={"large"}
          count={totalPages}
          page={actualPage}
          onChange={handleChange}
          variant={"outlined"}
          shape={"rounded"}
        />
      
    </Box>
  );
}
export default PaginationBar;
