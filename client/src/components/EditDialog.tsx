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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDialog } from "../hooks/useDialog";
function noop() {}

function EditDialog() {
  const { openEdit, selectedItem, setSelectedItem, setOpenEdit } = useDialog();
  const [openSnack, setOpenSnack] = useState(false);
  const closeDialog = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const [checked, setChecked] = useState(
    selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
  );
  useEffect(() => {
    if (selectedItem !== undefined) {
      setChecked(
        selectedItem?.dueDate !== null && selectedItem?.dueDate !== undefined
      );
    }
  }, [selectedItem?.dueDate]);

  console.log(selectedItem?.dueDate, typeof selectedItem?.dueDate, checked);

  const [priority, setPriority] = React.useState(
    selectedItem?.priority || "MEDIUM"
  );

  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
    closeDialog();
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
            value={selectedItem?.text}
            onChange={noop}
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
              />
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertRemoved} color="primary">
            Edit and Save
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
        <Alert style={{ position: "relative" }} variant="filled" severity="success">
          Item has been Edited.
        </Alert>
      </Snackbar>
    </>
  );
}
export default EditDialog;
