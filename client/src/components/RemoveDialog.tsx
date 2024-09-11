import React, { useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useDialog } from "../hooks/useDialog";


function RemoveDialog() {
  const { openRemove, selectedItem, setSelectedItem, setOpenRemove } =
    useDialog();
  const [openSnack, setOpenSnack] = useState(false);
  const closeDialog = () => {
    setOpenRemove(false);
    setSelectedItem(null);
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
      <Dialog open={openRemove} onClose={closeDialog}>
        <DialogTitle>{selectedItem?.text}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertRemoved} color="primary">
            Remove
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
          Item has been removed.
        </Alert>
      </Snackbar>
    </>
  );
}

export default RemoveDialog;
