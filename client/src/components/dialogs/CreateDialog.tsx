import React, { useState } from "react";

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
import Todo from "../../interfaces/Todo";
import postTodoCreate from "../../api/postTodoCreate";
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

function CreateDialog() {
  const { openCreate, setOpenCreate } = useDialog();
  const { updateData, setUpdateData } = useData();

  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const [name, setName] = useState<string>();
  const [priority, setPriority] = React.useState("MEDIUM");
  const [dueDate, setDueDate] = useState<Dayjs | null>();
  const [checked, setChecked] = useState(false);
  const resetCreate = () => {
    setName(undefined);
    setPriority("MEDIUM");
    setDueDate(undefined);
    setChecked(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    console.log(newName);
  };

  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setOpenCreate(false);
  };

  const alertRemoved = () => {
    setOpenSnack(true);
    closeDialog();
  };

  const handleCreate = () => {
    setError(null);
    if (name && priority) {
      let row;
      if (checked && dueDate) {
        row = createData(
          0,
          name,
          priority,
          null,
          false,
          dueDate.toISOString(),
          null
        );
      } else {
        row = createData(0, name, priority, null, false, null, null);
      }
      postTodoCreate(row)
        .then(() => {
          resetCreate();
          setUpdateData(!updateData);
        })
        .catch((e) => {
          setError(e);
          console.log(e);

          console.error;
        })
        .finally(alertRemoved);
    }
  };

  return (
    <>
      <Dialog open={openCreate} onClose={closeDialog} fullWidth>
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
              control={
                <Checkbox checked={checked} onChange={handleChangeCheckBox} />
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                disabled={!checked}
                value={dueDate}
                minDate={dayjs()}
                onChange={handleChangeDueDate}
              />
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCreate();
            }}
            color="primary"
          >
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
            Task has been created.
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
export default CreateDialog;
