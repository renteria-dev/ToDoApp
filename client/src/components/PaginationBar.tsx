import * as React from "react";
import Box from "@mui/material/Box";
import { Pagination, Paper, Typography } from "@mui/material";
// import { useData } from "../hooks/useData";
import getTodos from "../api/getTodos";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import ResponseProps from "../interfaces/ResponseProps";
function PaginationBar() {
  const { pages, setPages, setRows } = useData();
  const [data, setData] = useState<ResponseProps>();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    console.log("DATA:");
    console.log(data);

    getTodos(value || 1)
      .then((d) => {
        setData(d);

        // Ayuda
        if (data) {
          setPages(data.pages);
          setRows(data.todos);
        } else {
          console.log("");
        }
      })
      .catch(console.error);
  }, [value]);

  const handleChange = async (_event: any, value: number) => {
    setValue(value);
    // const data = await getTodos(value);
    // console.log(value);

    // if (data.pages) {
    //   setPages(data.pages);
    //   setRows(data.todos);
    // }
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
        count={pages.totalPages} //{pages.totalPages}
        page={pages.actualPage} //{pages.totalPages}
        onChange={handleChange}
        variant={"outlined"}
        shape={"rounded"}
      />
    </Box>
  );
}
export default PaginationBar;
