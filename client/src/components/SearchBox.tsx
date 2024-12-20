import { Send, Restore } from "@mui/icons-material";
import {
  SelectChangeEvent,
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import { CustomSearchBar } from "./CustomSearchBar";
import { useSearchBox } from "../hooks/useSearchBox";

export const SearchBox = () => {
  const {
    filterPriority,
    filterState,
    handleResetFilters,
    handleSearch,
    handleCancelSearch,
    handleFilterPriority,
    handleFilterState,
    handleSubmit,
  } = useSearchBox();

  return (
    <SearchBoxView
      filterPriority={filterPriority}
      filterState={filterState}
      onResetFilters={handleResetFilters}
      onSearch={handleSearch}
      onCancelSearch={handleCancelSearch}
      onFilterPriorityChange={handleFilterPriority}
      onFilterStateChange={handleFilterState}
      onSubmit={handleSubmit}
    />
  );
};

export interface SearchBoxViewProps {
  filterPriority: string;
  filterState: string;
  onResetFilters: () => void;
  onSearch: (value: string) => void;
  onCancelSearch: () => void;
  onFilterPriorityChange: (event: SelectChangeEvent) => void;
  onFilterStateChange: (event: SelectChangeEvent) => void;
  onSubmit: () => void;
}

export const SearchBoxView = ({
  filterPriority,
  filterState,
  onResetFilters,
  onSearch,
  onCancelSearch,
  onFilterPriorityChange,
  onFilterStateChange,
  onSubmit,
}: SearchBoxViewProps) => {
  return (
    <Box
      data-testid="search-box"
      component={Paper}
      sx={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
      }}
    >
      <CustomSearchBar
        onChange={(searchVal) => onSearch(searchVal)}
        onCancelSearch={onCancelSearch}
        placeholder="Search"
        sx={{ flex: "auto" }}
      />
      <Button
        aria-label="send"
        variant="outlined"
        size="small"
        startIcon={<Send />}
        sx={{ margin: "0 1rem 0 0", borderRadius: "0 8px 8px 0 " }}
        onClick={onSubmit}
      />
      <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel id="priority-filter-label">Filter Priority</InputLabel>
        <Select
          labelId="priority-filter-label"
          value={filterPriority}
          label="Filter Priority"
          onChange={onFilterPriorityChange}
        >
          <MenuItem value="ALL">
            <em>All</em>
          </MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel id="state-filter-label">Filter State</InputLabel>
        <Select
          labelId="state-filter-label"
          value={filterState}
          label="Filter State"
          onChange={onFilterStateChange}
        >
          <MenuItem value="ALL">
            <em>All</em>
          </MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
          <MenuItem value="UNDONE">Undone</MenuItem>
        </Select>
      </FormControl>
      <IconButton
        aria-label="restore"
        color="primary"
        size="small"
        onClick={onResetFilters}
        disabled={filterState === "ALL" && filterPriority === "ALL"}
      >
        <Restore />
      </IconButton>
    </Box>
  );
};
