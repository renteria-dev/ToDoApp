import Todo from "../interfaces/Todo";
import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell, Checkbox, Box, Button, Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import dayjs from "dayjs";
import { useDialog } from "../hooks/useDialog";
import postTodoDone from "../api/postTodoDone";
import putTodoUndone from "../api/putTodoUndone";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

interface TodoRowProps {
  row: Todo;
  index: number;
}

const TodoRow = ({ row, index }: TodoRowProps) => {
  const { setSelectedItem, setOpenEdit, setOpenRemove } = useDialog();
  const [visualChecked, setVisualChecked] = useState<boolean>(row.done);

  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const openEditDialog = () => {
    setSelectedItem(row);
    setOpenEdit(true);
  };
  const openRemoveDialog = () => {
    setSelectedItem(row);
    setOpenRemove(true);
  };

  useEffect(() => {
    console.log(row.id+"RENDERIZED"+row.done);
    
  }, [visualChecked])
  

  const handleClickedCheckBox = (row: Todo) => {
    if (visualChecked) {
      if (row.id) {
        putTodoUndone(row.id)
          .then((response) => {
            if (response) {
              //row = response;
              setVisualChecked(false)
            }
          })
          .catch((e) => {
            setError(e);
            console.log(e);
  
            console.error;
          }).finally(alertRemoved)
      }
    } else {
      if (row.id) {
        postTodoDone(row.id)
          .then((response) => {
            if (response) {
              //row = response;
              setVisualChecked(true)
            }
          })
          .catch((e) => {
            setError(e);
            console.log(e);
  
            console.error;
          }).finally(alertRemoved)
      }
    }
  };

  const handleCloseSnack = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const alertRemoved = () => {
    setOpenSnack(true);
    
  };

  

  const labelId = `enhanced-table-checkbox-${row.id}`;
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{ cursor: "pointer" }}
      >
        <TableCell align="center"></TableCell>
        <TableCell align="left" padding="none">
          <Checkbox
            color="primary"
            checked={visualChecked}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onClick={() => handleClickedCheckBox(row)}
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
      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        {error ? (
          <Alert
            style={{ position: "relative" }}
            variant="filled"
            severity="error"
          >
            {error.message}
          </Alert>
        ) : (
          <Alert
            style={{ position: "relative" }}
            variant="filled"
            severity={visualChecked?"success":"info"}
          >
            {visualChecked?"Task Done.":"Task Undone."}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default TodoRow;
