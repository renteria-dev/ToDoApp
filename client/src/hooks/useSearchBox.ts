import { useData } from "../hooks/useData";
import { SelectChangeEvent } from "@mui/material";

export const useSearchBox = () => {
  const {
    updateData,
    setUpdateData,
    setSearchQuery,
    filterPriority,
    filterState,
    setFilterPriority,
    setFilterState,
  } = useData();

  const handleResetFilters = () => {
    setFilterPriority("ALL");
    setFilterState("ALL");
  };

  const handleSearch = (searchedVal: string) => {
    setSearchQuery(searchedVal);
  };

  const handleCancelSearch = () => {
    setSearchQuery("");
    setUpdateData(!updateData);
  };

  const handleFilterPriority = (event: SelectChangeEvent) => {
    setFilterPriority(event.target.value);
  };

  const handleFilterState = (event: SelectChangeEvent) => {
    setFilterState(event.target.value);
  };

  const handleSubmit = () => {
    setUpdateData(!updateData);
  };

  return {
    filterPriority,
    filterState,
    handleResetFilters,
    handleSearch,
    handleCancelSearch,
    handleFilterPriority,
    handleFilterState,
    handleSubmit,
  };
};
