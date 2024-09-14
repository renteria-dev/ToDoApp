import React, { useEffect, useState } from "react";

import {
  Alert,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDialog } from "../../hooks/useDialog";
import { AxiosError } from "axios";
import putTodoEdit from "../../api/putTodoEdit";
import Todo from "../../interfaces/Todo";
import { useData } from "../../hooks/useData";

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

function EditDialog() {
  const { openEdit, selectedItem, setSelectedItem, setOpenEdit } = useDialog();
  const { updateData, setUpdateData } = useData();
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const [name, setName] = useState<string>();
  const [priority, setPriority] = React.useState(
    selectedItem?.priority || "MEDIUM"
  );
  const [dueDate, setDueDate] = useState<Dayjs | null>();

  const [checked, setChecked] = useState(
    selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
  );
  const resetEdited = () => {
    setName(undefined);
    setPriority("MEDIUM");
    setDueDate(undefined);
    setChecked(false);
  };

  useEffect(() => {
    if (selectedItem !== undefined) {
      setName(selectedItem?.text);
      setChecked(
        selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
      );
    }
  }, [selectedItem]);

  // useEffect(() => {
  //   if (selectedItem) {
  //     setName(selectedItem?.text);
  //   }
  // }, [selectedItem]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    console.log(newName);
  };

  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChangeDueDate = (value: Dayjs | null) => {
    setDueDate(value);
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

  const closeDialog = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const alertRemoved = () => {
    setOpenSnack(true);
    closeDialog();
  };

  const handleEdit = () => {
    setError(null);

    if (selectedItem) {
      let row;
      if (selectedItem.id) {
        row = createData(
          selectedItem.id,
          name || selectedItem.text,
          priority || selectedItem.priority,
          selectedItem.creationDate,
          selectedItem.done,
          checked ? dueDate?.toISOString() || selectedItem.dueDate : null,
          selectedItem.dueDate
        );
      }
      if (row && row.id) {
        putTodoEdit(row.id, row)
          .then(() => {
            resetEdited();
            setUpdateData(!updateData);
          })
          .catch((e) => {
            setError(e);
            console.log(e);

            console.error;
          })
          .finally(alertRemoved);
      }
    }
  };

  return (
    <>
      <Dialog open={openEdit} onClose={closeDialog} fullWidth>
        <DialogTitle>
          <TextField
            fullWidth
            id=""
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleChangeName}
          />
        </DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              fullWidth
              value={priority}
              onChange={handlePriority}
              label="Priority"
            >
              <MenuItem value={"LOW"}>LOW</MenuItem>
              <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
              <MenuItem value={"HIGH"}>HIGH</MenuItem>
            </Select>

            <FormControlLabel
              label="Add due date"
              control={<Checkbox checked={checked} onChange={handleChange} />}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                disabled={!checked}
                defaultValue={
                  selectedItem?.dueDate
                    ? dayjs(selectedItem?.dueDate)
                    : dayjs().add(1, "day")
                }
                minDate={dayjs()}
                onChange={handleChangeDueDate}
              />
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleEdit}>
            Save changes
          </Button>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
            severity="success"
          >
            Task has been edited.
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
export default EditDialog;
