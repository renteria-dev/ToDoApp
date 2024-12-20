import { useEffect } from "react";
import { useDialog } from "../../hooks/useDialog";
import { putTodoEdit } from "../../api/putTodoEdit";
import { useData } from "../../hooks/useData";
import { useSnackbar } from "notistack";
import { FormDialog } from "./FormDialog";
import dayjs, { Dayjs } from "dayjs";
import { Todo } from "../../interfaces/Todo";

export function EditDialog() {
  const { openEdit, selectedItem, setSelectedItem, setOpenEdit } = useDialog();
  const { updateData, setUpdateData } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    text: selectedItem?.text || "",
    priority: selectedItem?.priority || "MEDIUM",
    dueDate: selectedItem?.dueDate ? dayjs(selectedItem.dueDate) : null,
    checked: selectedItem?.dueDate !== null,
  };

  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  }, [selectedItem, setSelectedItem]);

  const closeDialog = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const handleEdit = (values: {
    text: string;
    priority: string;
    dueDate: Dayjs | null;
    checked: boolean;
  }) => {
    if (selectedItem) {
      const { text, priority, dueDate, checked } = values;

      const row: Todo = {
        id: selectedItem.id,
        text: text || selectedItem.text,
        priority: priority || selectedItem.priority,
        creationDate: selectedItem.creationDate,
        done: selectedItem.done,
        dueDate: checked ? (dueDate ? dueDate.toISOString() : null) : null,
        doneDate: selectedItem.doneDate,
      };
      if (row && row.id) {
        putTodoEdit(row.id, row)
          .then(() => {
            enqueueSnackbar("Task Edited", { variant: "success" });
            setUpdateData(!updateData);
            closeDialog();
          })
          .catch((e) => {
            enqueueSnackbar(e.message, { variant: "error" });
          });
      }
    }
  };

  return (
    <FormDialog
      initialValues={initialValues}
      onSubmit={handleEdit}
      openDialog={openEdit}
      closeDialog={closeDialog}
      title="Edit Task"
      action="Save Changes"
    />
  );
}
