import { Todo } from "../interfaces/Todo";
import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell, Checkbox, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useTodoRow } from "../hooks/useTodoRow";

interface TodoRowProps {
  row: Todo;
  index: number;
}

export const TodoRow = ({ row, index }: TodoRowProps) => {
  const {
    visualChecked,
    handleCheckboxToggle,
    calculateColor,
    openEditDialog,
    openRemoveDialog,
  } = useTodoRow(row);

  return (
    <TodoRowView
      row={row}
      index={index}
      visualChecked={visualChecked}
      handleCheckboxToggle={handleCheckboxToggle}
      calculateColor={calculateColor}
      openEditDialog={openEditDialog}
      openRemoveDialog={openRemoveDialog}
    />
  );
};

interface TodoRowViewProps {
  row: Todo;
  index: number;
  visualChecked: boolean;
  calculateColor: (date: string) => string;
  handleCheckboxToggle: () => void;
  openEditDialog: () => void;
  openRemoveDialog: () => void;
}

export const TodoRowView = ({
  row,
  index,
  visualChecked,
  calculateColor,
  handleCheckboxToggle,
  openEditDialog,
  openRemoveDialog,
}: TodoRowViewProps) => {
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      data-testid="todo-row"
      role="row"
      tabIndex={-1}
      key={row.id}
      sx={{
        cursor: "pointer",
        bgcolor: row.dueDate ? calculateColor(row.dueDate) : "background",
      }}
    >
      <TableCell align="center"></TableCell>
      <TableCell align="left" padding="none">
        <Checkbox
          color="primary"
          checked={visualChecked}
          inputProps={{ "aria-labelledby": labelId }}
          onClick={handleCheckboxToggle}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{
          textDecoration: visualChecked ? "line-through" : "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 150,
          minWidth: 150,
          textWrap: "nowrap",
        }}
      >
        {row.text}
      </TableCell>
      <TableCell align="center">{row.priority}</TableCell>
      <TableCell align="center">
        {row.dueDate ? dayjs(row.dueDate).format("DD/MM/YYYY") : "N/A"}
      </TableCell>
      <TableCell align="center">
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="info"
            startIcon={<Edit />}
            onClick={openEditDialog}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={openRemoveDialog}
          >
            Delete
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};
