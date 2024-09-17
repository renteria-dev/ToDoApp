import TodoTable from "../components/TodoTable";
import PaginationBox from "../components/PaginationBox";
import MetricsBox from "../components/MetricsBox";
import SearchBox from "../components/SearchBox";
import { DataContextProvider } from "../hooks/useData";
import CreateTodoButton from "../components/CreateTodoButton";
import { DialogContextProvider } from "../hooks/useDialog";
import { SnackbarProvider } from "notistack";
const MainPage = () => {
  return (
    <>
      <DataContextProvider>
        <SearchBox />
        <SnackbarProvider>
          <DialogContextProvider>
            <CreateTodoButton />
            <TodoTable />
          </DialogContextProvider>
        </SnackbarProvider>
        <PaginationBox />
        <MetricsBox />
      </DataContextProvider>
    </>
  );
};

export default MainPage;
