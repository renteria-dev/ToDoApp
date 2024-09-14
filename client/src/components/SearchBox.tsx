import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Button,
  Grid2,
  IconButton,
  Paper,
} from "@mui/material";
import { Restore, Send } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import { useData } from "../hooks/useData";

const SearchBox = () => {
  const resetFilters = () => {
    setFilterPriority("ALL");
    setFilterState("ALL");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const requestSearch = (searchedVal: string) => {
    console.log(searchedVal);

    /* TODO with searchedVal */
  };
  const cancelSearch = () => {
    /* TODO on cancelSearch */
  };

  const {filterPriority,filterState,setFilterPriority,setFilterState} =useData()

  const handleFilterPriority = (event: SelectChangeEvent) => {
    setFilterPriority(event.target.value);
  };

  const handleFilterState = (event: SelectChangeEvent) => {
    setFilterState(event.target.value);
  };

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        // border: "1px solid",
        // borderColor: "divider",
        // borderRadius: "0",
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
        
      }}
    >
      <SearchBar
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search"
      />
      <Button
        variant="outlined"
        size="small"
        startIcon={<Send />}
        sx={{ margin: "0 1rem 0 0", borderRadius: "0 8px 8px 0 " }}
      />
      <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel id="demo-select-small-label">FilterPriority</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={filterPriority}
          label="FilterPriority"
          onChange={handleFilterPriority}
        >
          <MenuItem value="ALL">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"HIGH"}>High</MenuItem>
          <MenuItem value={"MEDIUM"}>Medium</MenuItem>
          <MenuItem value={"LOW"}>Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel id="demo-select-small-label">FilterState</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={filterState}
          label="FilterState"
          onChange={handleFilterState}
        >
          <MenuItem value="ALL">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"DONE"}>Done</MenuItem>
          <MenuItem value={"UNDONE"}>Undone</MenuItem>
        </Select>
      </FormControl>
      {(!(filterState == "ALL" && filterPriority == "ALL") && (
        <IconButton color="primary" size="small" onClick={resetFilters}>
          <Restore />
        </IconButton>
      )) || (
        <IconButton color="primary" size="small" disabled>
          <Restore htmlColor="rgba(0,0,0,0)" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBox;
