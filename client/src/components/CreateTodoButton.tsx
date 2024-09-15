import CreateDialog from "./dialogs/CreateDialog";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useDialog } from "../hooks/useDialog";

const CreateTodoButton = () => {
  const { setOpenCreate } = useDialog();
  const openCreateDialog = () => {
    setOpenCreate(true);
  };

  return (
    <>
      <Box paddingTop={2} />

      <Button
        color={"secondary"}
        variant={"contained"}
        startIcon={<Add />}
        sx={{
          borderRadius: "8px 8px 0 0",
          fontWeight: "bold",
          boxShadow: "none",
        }}
        onClick={openCreateDialog}
      >
        New Todo
      </Button>

      <CreateDialog />
    </>
  );
};

export default CreateTodoButton;
