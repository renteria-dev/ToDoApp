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
import { useDialog } from "../../hooks/useDialog";
import Todo from "../../interfaces/Todo";
import deleteTodo from "../../api/deleteTodo";
import { AxiosError } from "axios";
import { useData } from "../../hooks/useData";

function RemoveDialog() {
  const { openRemove, selectedItem, setSelectedItem, setOpenRemove } =
    useDialog();
  const { updateData, setUpdateData } = useData();
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

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

  const handleDelete = (row: Todo | null) => {
    setError(null);
    if (row?.id) {
      deleteTodo(row.id)
        .then(() => {
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
      <Dialog open={openRemove} onClose={closeDialog}>
        <DialogTitle>{selectedItem?.text}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(selectedItem)} color="primary">
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
            Task has been deleted.
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default RemoveDialog;
