import TodoTable from "../components/TodoTable";
import PaginationBar from "../components/PaginationBar";
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
        <PaginationBar />
        <MetricsBox />
      </DataContextProvider>
    </>
  );
};

export default MainPage;
