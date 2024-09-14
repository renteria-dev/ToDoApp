import React from "react";

import { ButtonBase, InputAdornment, TextField } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { SearchRounded } from "@mui/icons-material";

interface SearchBarProps {
  id?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  //onChange?: ChangeEventHandler<HTMLInputElement>;
  onChange?: (input: string) => void;
  //onCancelSearch?: MouseEventHandler<HTMLButtonElement>;
  onCancelSearch?: () => void;
  autoComplete?: string;
  disabled?: boolean;
  debounceTime?: number;
}
const SearchBar: React.FC<SearchBarProps> = ({
  id,
  value,
  label,
  placeholder,
  onChange,
  onCancelSearch,
  autoComplete,
  disabled,
  debounceTime,
  ...props
}) => {
  const [searchValue, setSearchValue] = React.useState(value || "");
  const [dbTime, setDbTime] = React.useState(debounceTime || 0);
  const clearSearch = () => {
    setSearchValue("");
    if (onCancelSearch) {
      onCancelSearch();
    }
  };

  const changeValue = (searchValue: any) => {
    setSearchValue(searchValue);
  };
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onChange) {
        onChange(searchValue);
      }
    }, dbTime);
    return () => clearTimeout(timeoutId);
  }, [searchValue, dbTime]);
  return (
    <>
      <TextField
        size="small"
        sx={{ width: { xs: "100%" } }}
        disabled={disabled}
        id={id}
        label={label}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => changeValue(e.target.value)}
        autoComplete={autoComplete}
        onKeyDown={(event) => {
          console.log(event);

          if (event.key === "Enter") {
            console.log("enter key was pressed");
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ButtonBase
                onClick={clearSearch}
                disabled={searchValue ? false : true}
                sx={{
                  borderRadius: "12px",
                  padding: "5px",
                  marginRight: "-5px",
                }}
              >
                {searchValue.trim() !== "" ? (
                  <ClearIcon />
                ) : (
                  <ClearIcon htmlColor="rgba(0,0,0,0)" />
                )}
              </ButtonBase>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default SearchBar;
