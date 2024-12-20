import React, { useEffect, useState, useCallback } from "react";
import {
  ButtonBase,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Clear as ClearIcon, SearchRounded, MoreHoriz } from "@mui/icons-material";

// Props Interface
interface CustomSearchBarProps extends Omit<TextFieldProps, "onChange"> {
  value?: string;
  onChange?: (input: string) => void;
  onCancelSearch?: () => void;
  debounceTime?: number;
}

// Debounce Hook
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Component
export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  id,
  value = "",
  label,
  placeholder,
  onChange,
  onCancelSearch,
  autoComplete,
  disabled,
  debounceTime = 300,
  ...textFieldProps
}) => {
  const [searchValue, setSearchValue] = useState<string>(value);

  // Debounced search value
  const debouncedSearchValue = useDebounce(searchValue, debounceTime);

  // Clear Search
  const clearSearch = useCallback(() => {
    setSearchValue("");
    onCancelSearch?.();
  }, [onCancelSearch]);

  // Notify parent on debounced value change
  useEffect(() => {
    if (onChange) onChange(debouncedSearchValue);
  }, [debouncedSearchValue, onChange]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );

  return (
    <TextField
      data-testid="custom-search-bar"
      {...textFieldProps}
      id={id}
      size="small"
      label={label}
      placeholder={placeholder}
      value={searchValue}
      onChange={handleInputChange}
      disabled={disabled}
      autoComplete={autoComplete}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <ButtonBase
              aria-label="clear"
              onClick={clearSearch}
              disabled={!searchValue}
              sx={{
                borderRadius: "12px",
                padding: "5px",
                marginRight: "-5px",
              }}
            >
              {searchValue.trim() ? (
                <ClearIcon />
              ) : (
                <MoreHoriz htmlColor="rgba(0,0,0,0.2)" /> // Placeholder Icon
              )}
            </ButtonBase>
          </InputAdornment>
        ),
      }}
    />
  );
};
