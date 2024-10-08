import React, { useState } from "react";

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
import Todo from "../../interfaces/Todo";
import postTodoCreate from "../../api/postTodoCreate";
import { useData } from "../../hooks/useData";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState<string>("");
  const [priority, setPriority] = React.useState("MEDIUM");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [checked, setChecked] = useState(false);

  const resetCreate = () => {
    setName("");
    setPriority("MEDIUM");
    setDueDate(null);
    setChecked(false);
  };

  const closeDialog = () => {
    setOpenCreate(false);
  };

  const handleCreate = () => {
    //console.log(name,priority);

    if (name && name?.length > 0 && name?.length <= 120) {
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
          enqueueSnackbar("Task Created Sucessfully", { variant: "success" });
          closeDialog();
          setUpdateData(!updateData);
        })
        .catch((e) => {
          enqueueSnackbar(e.message, { variant: "error" });
          //console.log(e);

          console.error;
        });
    } else {
      enqueueSnackbar("Maximum task name length is 120 characters", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Dialog open={openCreate} onClose={closeDialog} fullWidth>
        <DialogTitle>
          <TextField
            autoFocus
            fullWidth
            aria-modal
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value={"LOW"}>LOW</MenuItem>
              <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
              <MenuItem value={"HIGH"}>HIGH</MenuItem>
            </Select>

            <FormControlLabel
              label="Add due date"
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                disabled={!checked}
                value={dueDate}
                minDate={dayjs()}
                onChange={(value) => setDueDate(value)}
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
    </>
  );
}
export default CreateDialog;
