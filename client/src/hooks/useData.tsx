import { createContext, useContext, useState } from "react";
import Todo from "../interfaces/Todo";
import Page from "../interfaces/Page";
type dataContextProviderProps = {
  children: React.ReactNode;
};

type dataContextType = {
  rows: Todo[];
  setRows: (rows: Todo[]) => void;
  pages: Page;
  setPages: (pages: Page) => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  filterPriority: string;
  setFilterPriority: (text: string) => void;
  filterState: string;
  setFilterState: (text: string) => void;
};

export const dataContext = createContext({} as dataContextType);

export const useData = () => {
    const context = useContext(dataContext);
    return context;
  };

export const dataContextProvider = ({ children }: dataContextProviderProps) => {
  const [rows, setRows] = useState<Todo[]>([]);
  const [pages, setPages] = useState<Page>( {actualPage:1,totalPages:1});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterState, setFilterState] = useState("ALL");
  return (
    <dataContext.Provider
      value={{
        rows,
        setRows,
        pages,
        setPages,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filterState,
        setFilterState,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

