
import TodoTable from "../components/TodoTable";
import PaginationBar from "../components/PaginationBar";
import MetricsBox from "../components/MetricsBox";
import SearchBox from "../components/SearchBox";

const MainPage = () => {
  return (
    <>
      <SearchBox/>
      <TodoTable />
      <PaginationBar />
      <MetricsBox />
    </>
  );
};

export default MainPage;
