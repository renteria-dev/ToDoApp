import Todo from "../interfaces/Todo";
import { Edit, Delete } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Button,
  alpha,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useDialog } from "../hooks/useDialog";
import postTodoDone from "../api/postTodoDone";
import putTodoUndone from "../api/putTodoUndone";
import { useEffect, useState } from "react";
import { useData } from "../hooks/useData";
import { useSnackbar } from "notistack";
import { green, red, yellow } from "@mui/material/colors";

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

  function calculateColor(date: Dayjs) {
    const today = dayjs();
    const givenDate = dayjs(date);
    const differenceInDays = today.diff(givenDate, "day");

    if (!givenDate.isValid) {
      return "background";
    }

    if (-differenceInDays < 7) {
      return alpha(red["A400"], 0.2);
    } else if (-differenceInDays >= 7 && -differenceInDays < 14) {
      return alpha(yellow["A700"], 0.3);
    } else if (-differenceInDays >= 14) {
      return alpha(green["A700"], 0.3);
    }
  }

  const labelId = `enhanced-table-checkbox-${index}`;
  return (
    <>
      <TableRow
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{
          cursor: "pointer",
          backgroundColor: calculateColor(dayjs(row.dueDate)),
        }}
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
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 150,
            minWidth: 150,
            textWrap: "nowrap",
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
