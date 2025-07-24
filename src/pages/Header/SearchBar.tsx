import {
  InputBase,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ query, onQueryChange, onSearch }: SearchBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        px: 1,
        py: isMobile ? 0.25 : 0.5,
        width: isMobile ? "40%" : "50%",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <InputBase
        placeholder="Search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        sx={{
          flex: 1,
          fontSize: isMobile ? "0.8rem" : "1rem",
          pl: 0.5,
        }}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <IconButton size="small" onClick={onSearch}>
        <Search fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
