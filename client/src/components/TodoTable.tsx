import { useState } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import Todo from "../interfaces/Todo";
import RemoveDialog from "./dialogs/RemoveDialog";
import EditDialog from "./dialogs/EditDialog";
import TodoRow from "./TodoRow";
import { useData } from "../hooks/useData";

function createData(
  id: number,
  text: string,
  priority: string,
  creationDate: string | null,
  done: boolean,
  dueDate: string | null,
  doneDate: string | null
): Todo {
  return {
    id,
    text,
    priority,
    creationDate,
    done,
    dueDate,
    doneDate,
  };
}

const examples = [
  createData(1, "1Cupcake", "HIGH", null, false, "2025-04-04", null),
  createData(2, "2Cupcake", "HIGH", "2018-04-04", false, null, null),
  createData(3, "3Cupcake", "HIGH", null, false, "2025-03-04", null),
  createData(4, "4Cupcake", "HIGH", "2018-05-04", false, null, null),
  createData(5, "5Cupcake", "MEDIUM", "Fecha", true, null, null),
  createData(6, "6Cupcake", "MEDIUM", "Fecha", false, null, null),
  createData(7, "7Cupcake", "MEDIUM", "Fecha", true, null, null),
  createData(8, "8Cupcake", "LOW", "Fecha", false, null, null),
  createData(9, "9Cupcake", "LOW", "Fecha", true, null, null),
  createData(10, "10Cupcake", "LOW", "Fecha", false, null, null),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Todo;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "done",
    numeric: false,
    disablePadding: true,
    label: "Done",
  },
  {
    id: "text",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "priority",
    numeric: false,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Todo
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Todo) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

const TodoTable = () => {
  const { rows } = useData();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Todo>("creationDate");
  const [selected, setSelected] = useState<readonly number[]>([]);

  const rowsPerPage = 10;

  // const visibleRows = useMemo(
  //   () =>
  //     [...rows]
  //       // .sort(getComparator(order, orderBy))
  //       .slice(1 * rowsPerPage, 1 * rowsPerPage + rowsPerPage),
  //   [order, orderBy, 1, rowsPerPage]
  // );

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Todo
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows = 10 - rows.length;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={3}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row: Todo, index: number) => (
                <TodoRow key={row.id} row={row} index={index} />
              ))}

              <EditDialog />
              <RemoveDialog />

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 50 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default TodoTable;
