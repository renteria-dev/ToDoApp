
import Todo from "../interfaces/Todo";
import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell, Checkbox, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useDialog } from "../hooks/useDialog";

interface TodoRowProps {
  row: Todo;
  index: number;
}

const TodoRow = ({ row, index }: TodoRowProps) => {
  const { setSelectedItem, setOpenEdit, setOpenRemove } = useDialog();
  const openEditDialog = () => {
    setSelectedItem(row);
    setOpenEdit(true);
  };
  const openRemoveDialog = () => {
    setSelectedItem(row);
    setOpenRemove(true);
  };
  const labelId = `enhanced-table-checkbox-${index}`;
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={index}
        sx={{ cursor: "pointer" }}
      >
        <TableCell align="center"></TableCell>
        <TableCell align="left" padding="none">
          <Checkbox
            color="primary"
            checked={row.done}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
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
    </>
  );
};

export default TodoRow;
