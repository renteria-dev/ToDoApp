import React, { useEffect, useState } from "react";

import {
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
    console.log(event.target.checked);
    
  };

  const handleChangeDueDate = (value: Dayjs | null) => {
    setDueDate(value);
  };

  const closeDialog = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (selectedItem) {
      let row;
      console.log("PREENVIO");
      console.log(checked,dueDate,selectedItem.dueDate);
      
      
      if (selectedItem.id) {
        row = createData(
          selectedItem.id,
          name || selectedItem.text,
          priority || selectedItem.priority,
          selectedItem.creationDate,
          selectedItem.done,
          checked ? (dueDate? dueDate.toISOString() : selectedItem.dueDate ):null,
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
            console.log(e);

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
                   dayjs(selectedItem?.dueDate)
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
    </>
  );
}
export default EditDialog;
