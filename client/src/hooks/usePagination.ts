import { useEffect, useState } from "react";
import { getTodos } from "../api/getTodos";
import { useData } from "../hooks/useData";
import { ResponseProps } from "../interfaces/ResponseProps";

export function usePagination() {
  const {
    setMetrics,
    pages,
    setPages,
    setRows,
    updateData,
    filterPriority,
    filterState,
    searchQuery,
  } = useData();
  const [clickedPage, setClickedPage] = useState<number>(1);

  useEffect(() => {
    getTodos(clickedPage, filterPriority, filterState, searchQuery)
      .then((response: ResponseProps) => {
        if (response) {
          setPages(response.pages);
          setRows(response.content);
          setMetrics(response.metrics);
        }
      })
      .catch(console.error);
  }, [clickedPage, updateData, filterPriority, filterState]);

  const handlePageChange = (page: number) => {
    setClickedPage(page);
  };

  return { pages, clickedPage, handlePageChange };
}
