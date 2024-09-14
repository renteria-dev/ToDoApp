import TodoTable from "../components/TodoTable";
import PaginationBar from "../components/PaginationBar";
import MetricsBox from "../components/MetricsBox";
import SearchBox from "../components/SearchBox";
import { DataContextProvider } from "../hooks/useData";
import CreateTodoButton from "../components/CreateTodoButton";
import { DialogContextProvider } from "../hooks/useDialog";
const MainPage = () => {
  return (
    <>
      <DataContextProvider>
        <SearchBox />
        <DialogContextProvider>
          <CreateTodoButton />
          <TodoTable />
        </DialogContextProvider>
        <PaginationBar />
        <MetricsBox />
      </DataContextProvider>
    </>
  );
};

export default MainPage;
