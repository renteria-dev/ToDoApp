
import TodoTable from "../components/TodoTable";
import PaginationBar from "../components/PaginationBar";
import MetricsBox from "../components/MetricsBox";
import SearchBox from "../components/SearchBox";
import { DataContextProvider } from "../hooks/useData";
const MainPage = () => {

  return (
    <>
    <DataContextProvider>

      <SearchBox/>
      <TodoTable />
      <PaginationBar />
      <MetricsBox />
    </DataContextProvider>
    </>
  );
};

export default MainPage;
