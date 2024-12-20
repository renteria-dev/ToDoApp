import { useDialog } from "../../hooks/useDialog";
import { postTodoCreate } from "../../api/postTodoCreate";
import { useData } from "../../hooks/useData";
import { useSnackbar } from "notistack";
import { FormDialog } from "./FormDialog";
import { Dayjs } from "dayjs";

export function CreateDialog() {
  const { openCreate, setOpenCreate } = useDialog();
  const { updateData, setUpdateData } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    text: "",
    priority: "MEDIUM",
    dueDate: null,
    checked: false,
  };

  const closeDialog = () => setOpenCreate(false);

  const handleCreate = (values: {
    text: string;
    priority: string;
    dueDate: Dayjs | null;
    checked: boolean;
  }) => {
    const { text, priority, dueDate, checked } = values;

    let row;
    if (checked && dueDate) {
      row = {
        id: 0,
        text,
        priority,
        creationDate: null,
        done: false,
        dueDate: dueDate.toISOString(),
        doneDate: null,
      };
    } else {
      row = {
        id: 0,
        text,
        priority,
        creationDate: null,
        done: false,
        dueDate: null,
        doneDate: null,
      };
    }

    postTodoCreate(row)
      .then(() => {
        enqueueSnackbar("Task Created Successfully", { variant: "success" });
        setUpdateData(!updateData);
        closeDialog();
      })
      .catch((e) => {
        enqueueSnackbar(e.message, { variant: "error" });
      });
  };

  return (
    <FormDialog
      initialValues={initialValues}
      onSubmit={handleCreate}
      openDialog={openCreate}
      closeDialog={closeDialog}
      title="Create Task"
      action="Save"
    />
  );
}
