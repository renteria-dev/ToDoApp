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
import { Todo } from "../interfaces/Todo";
import { TodoRow } from "./TodoRow";
import { EditDialog } from "./dialogs/EditDialog";
import { RemoveDialog } from "./dialogs/RemoveDialog";
import { useData } from "../hooks/useData";
import { useTodoTable } from "../hooks/useTodoTable";

interface TodoTableViewProps {
  rows: Todo[];
  order: "asc" | "desc";
  orderBy: keyof Todo;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Todo,
    order: "asc" | "desc"
  ) => void;
}

export const TodoTableView = ({
  rows,
  order,
  orderBy,
  onRequestSort,
}: TodoTableViewProps) => {
  const emptyRows = 10 - rows.length;

  return (
    <Box data-testid="todo-table" sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={3}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                {["done", "text", "priority", "dueDate"].map((head) => (
                  <TableCell key={head} align="center">
                    <TableSortLabel
                      active={orderBy === head}
                      direction={orderBy === head ? order : "asc"}
                      onClick={(e) => onRequestSort(e, head as keyof Todo, order)}
                    >
                      {head.charAt(0).toUpperCase() + head.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TodoRow key={row.id} row={row} index={index} />
              ))}
              <EditDialog />
              <RemoveDialog />

              {emptyRows > 0 && (
                <TableRow style={{ height: 50 * emptyRows }}>
                  <TableCell colSpan={6} align="center">
                    {rows.length === 0 ? "Empty" : null}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export const TodoTable = () => {
  const { rows } = useData();
  const { order, orderBy, handleRequestSort, sortedRows } = useTodoTable(rows);

  const handleRequestSortWithProperty = (
    event: React.MouseEvent<unknown>,
    property: keyof Todo,
    order: "asc" | "desc"
  ) => {
    handleRequestSort(event, property, order as keyof Todo);
  };

  return (
    <TodoTableView
      rows={sortedRows}
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSortWithProperty}
    />
  );
};
