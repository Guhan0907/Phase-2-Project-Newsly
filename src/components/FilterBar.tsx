// components/Filters/FiltersBar.tsx
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
  type SelectChangeEvent
} from "@mui/material";
import { useState } from "react";

export interface Filters {
  category: string;
  section: string;
  date: string;
}

interface Props {
  onFilterChange: (filters: Filters) => void;
}

const FiltersBar = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    section: "",
    date: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      gap={2}
      my={2}
      alignItems="center"
    >
      {/* Category */}
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="arts">Arts</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="politics">Politics</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
        </Select>
      </FormControl>

      {/* Section */}
      <FormControl fullWidth>
        <InputLabel>Section</InputLabel>
        <Select
          label="Section"
          name="section"
          value={filters.section}
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="world">World</MenuItem>
          <MenuItem value="us">U.S.</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="health">Health</MenuItem>
        </Select>
      </FormControl>

      {/* Date */}
      <TextField
        label="Published After"
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
    </Box>
  );
};

export default FiltersBar;
