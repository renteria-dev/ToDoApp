import { createContext, useContext, useState } from "react";
import Todo from "../interfaces/Todo";
import Page from "../interfaces/Page";
import Metrics from "../interfaces/Metrics";
type DataContextProviderProps = {
  children: React.ReactNode;
};

type DataContextType = {
  rows: Todo[];
  setRows: (rows: Todo[]) => void;
  pages: Page;
  setPages: (pages: Page) => void;
  metrics:Metrics;
  setMetrics:(metrics:Metrics)=>void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  filterPriority: string;
  setFilterPriority: (text: string) => void;
  filterState: string;
  setFilterState: (text: string) => void;
};

export const DataContext = createContext({} as DataContextType);

export const useData = () => {
    const context = useContext(DataContext);
    return context;
  };

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [rows, setRows] = useState<Todo[]>([]);
  const [pages, setPages] = useState<Page>( {actualPage:1,totalPages:1});
  const [metrics, setMetrics] = useState<Metrics>({average:"",averageHigh:"",averageMedium:"",averageLow:""});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterState, setFilterState] = useState("ALL");
  return (
    <DataContext.Provider
      value={{
        rows,
        setRows,
        pages,
        setPages,
        metrics,
        setMetrics,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filterState,
        setFilterState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

