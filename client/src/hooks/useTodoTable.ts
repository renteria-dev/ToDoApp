import { useState } from "react";
import { Todo } from "../interfaces/Todo";

type Order = "asc" | "desc";

export const useTodoTable = (rows: Todo[]) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Todo>("creationDate");

  const handleRequestSort = (_event: React.MouseEvent<unknown>, _p0: string, property: keyof Todo) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = [...rows].sort((_a, _b) => {
    // if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    // if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  return { order, orderBy, handleRequestSort, sortedRows };
};
