import React, { useEffect, useState } from "react";

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
import putTodoEdit from "../../api/putTodoEdit";
import Todo from "../../interfaces/Todo";
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

function EditDialog() {
  const { openEdit, selectedItem, setSelectedItem, setOpenEdit } = useDialog();
  const { updateData, setUpdateData } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState<string>("");
  const [priority, setPriority] = React.useState(
    selectedItem?.priority || "MEDIUM"
  );
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [checked, setChecked] = useState(
    selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
  );

  const resetEdited = () => {
    setName("");
    setPriority("MEDIUM");
    setDueDate(null);
    setChecked(false);
  };

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem?.text);
      setChecked(
        selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
      );
    }
  }, [selectedItem]);

  const closeDialog = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (selectedItem) {
      let row;
      //console.log("PREENVIO");
      //console.log(checked,dueDate,selectedItem.dueDate);

      if (selectedItem.id) {
        row = createData(
          selectedItem.id,
          name || selectedItem.text,
          priority || selectedItem.priority,
          selectedItem.creationDate,
          selectedItem.done,
          checked
            ? dueDate
              ? dueDate.toISOString()
              : selectedItem.dueDate
            : null,
          selectedItem.doneDate
        );
      }
      if (row && row.id) {
        putTodoEdit(row.id, row)
          .then(() => {
            resetEdited();
            enqueueSnackbar("Task Edited", { variant: "success" });
            setUpdateData(!updateData);
            closeDialog();
          })
          .catch((e) => {
            enqueueSnackbar(e.message, { variant: "error" });
            //console.log(e);

            console.error;
          });
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
                defaultValue={dayjs(selectedItem?.dueDate)}
                minDate={dayjs()}
                onChange={(value) => setDueDate(value)}
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
    </>
  );
}
export default EditDialog;
