import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDialog } from "../../hooks/useDialog";
import Todo from "../../interfaces/Todo";
import deleteTodo from "../../api/deleteTodo";
import { useData } from "../../hooks/useData";
import { useSnackbar } from "notistack";

function RemoveDialog() {
  const { openRemove, selectedItem, setSelectedItem, setOpenRemove } =
    useDialog();
  const { updateData, setUpdateData } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const closeDialog = () => {
    setOpenRemove(false);
    setSelectedItem(null);
  };

  const handleDelete = (row: Todo | null) => {
    if (row?.id) {
      deleteTodo(row.id)
        .then(() => {
          enqueueSnackbar("Task Deleted", { variant: "success" });
          closeDialog();
          setUpdateData(!updateData);
        })
        .catch((e) => {
          enqueueSnackbar(e.message, { variant: "success" });
          //console.log(e);

          console.error;
        });
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
    </>
  );
}

export default RemoveDialog;
