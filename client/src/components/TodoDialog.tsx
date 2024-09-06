import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
const noop = () => {};
const TodoDialog = () => {
  return (
    <>
      <Dialog open={true} onClose={noop} >
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={noop} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoDialog;
