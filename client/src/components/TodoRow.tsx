import Todo from "../interfaces/Todo";
import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell, Checkbox, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useDialog } from "../hooks/useDialog";
import postTodoDone from "../api/postTodoDone";
import putTodoUndone from "../api/putTodoUndone";
import { useEffect, useState } from "react";
import { useData } from "../hooks/useData";
import { useSnackbar } from "notistack";

interface TodoRowProps {
  row: Todo;
  index: number;
}

const TodoRow = ({ row, index }: TodoRowProps) => {
  const { setSelectedItem, setOpenEdit, setOpenRemove } = useDialog();
  const { setUpdateData, updateData } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const [visualChecked, setVisualChecked] = useState<boolean>(row.done);

  const openEditDialog = () => {
    setSelectedItem(row);
    setOpenEdit(true);
  };
  const openRemoveDialog = () => {
    setSelectedItem(row);
    setOpenRemove(true);
  };

  useEffect(() => {
    //console.log(row.id + "RENDERIZED" + row.done);
  }, [visualChecked]);

  const handleClickedCheckBox = (row: Todo) => {
    if (visualChecked) {
      if (row.id) {
        putTodoUndone(row.id)
          .then((response) => {
            if (response) {
              setVisualChecked(false);
              enqueueSnackbar(`Task ${row.text} Undone`, { variant: "info" });
              setUpdateData(!updateData);
            }
          })
          .catch((e) => {
            enqueueSnackbar(e.message, { variant: "error" });
            //console.log(e);

            console.error;
          });
      }
    } else {
      if (row.id) {
        postTodoDone(row.id)
          .then((response) => {
            if (response) {
              setVisualChecked(true);
              enqueueSnackbar(`Task ${row.text} Done`, { variant: "success" });

              setUpdateData(!updateData);
            }
          })
          .catch((e) => {
            enqueueSnackbar(e, { variant: "error" });
            //console.log(e);

            console.error;
          });
      }
    }
  };

  const labelId = `enhanced-table-checkbox-${index}`;
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
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          sx={{
            textDecoration: visualChecked ? "line-through" : "none",
            
          }}
          
        >
          &nbsp;
          {row.text}
          &nbsp;
        
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
