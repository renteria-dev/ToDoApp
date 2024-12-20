import { useState } from "react";
import { Todo } from "../interfaces/Todo";
import { useDialog } from "../hooks/useDialog";
import { useData } from "../hooks/useData";
import { postTodoDone } from "../api/postTodoDone";
import { putTodoUndone } from "../api/putTodoUndone";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { alpha } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";

export const useTodoRow = (row: Todo) => {
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

  const handleCheckboxToggle = () => {
    if (visualChecked) {
      putTodoUndone(row.id!)
        .then(() => {
          setVisualChecked(false);
          enqueueSnackbar(`Task ${row.text} Undone`, { variant: "info" });
          setUpdateData(!updateData);
        })
        .catch((e) => enqueueSnackbar(e.message, { variant: "error" }));
    } else {
      postTodoDone(row.id!)
        .then(() => {
          setVisualChecked(true);
          enqueueSnackbar(`Task ${row.text} Done`, { variant: "success" });
          setUpdateData(!updateData);
        })
        .catch((e) => enqueueSnackbar(e.message, { variant: "error" }));
    }
  };

  const calculateColor = (date: string | null) => {
    const today = dayjs();
    const givenDate = dayjs(date);
    const differenceInDays = today.diff(givenDate, "day");

    if (!givenDate.isValid()) return "background";

    if (-differenceInDays < 7) return alpha(red["A400"], 0.2);
    if (-differenceInDays < 14) return alpha(yellow["A700"], 0.3);
    return alpha(green["A700"], 0.3);
  };

  return {
    visualChecked,
    handleCheckboxToggle,
    calculateColor,
    openEditDialog,
    openRemoveDialog,
  };
};
