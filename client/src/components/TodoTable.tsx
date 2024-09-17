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




type Order = "asc" | "desc";


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
  const [selected] = useState<readonly number[]>([]);

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

              {emptyRows == 10 && (
                <TableRow
                  style={{
                    height: 50 *3,
                  }}
                >
                  <TableCell colSpan={6} align="center" sx={{fontSize:"1.5rem"}}>Empty</TableCell>
                </TableRow>
              )}
              {emptyRows < 10 && (
                <TableRow
                  style={{
                    height: 50.5 *emptyRows,
                  }}
                >
                  <TableCell colSpan={6} ></TableCell>
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
