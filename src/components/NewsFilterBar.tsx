// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   type SelectChangeEvent,
// } from "@mui/material";

// interface Props {
//   storyType: string;
//   onStoryTypeChange: (value: string) => void;
// }

// const NewsFilterBar = ({ storyType, onStoryTypeChange }: Props) => {
//   return (
//     <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
//       <FormControl size="small" sx={{ minWidth: 180 }}>
//         <InputLabel id="story-type-label">Story Type</InputLabel>
//         <Select
//           labelId="story-type-label"
//           value={storyType}
//           onChange={(e: SelectChangeEvent) => onStoryTypeChange(e.target.value)}
//           label="Story Type"
//         >
//           <MenuItem value="top">Top Stories</MenuItem>
//           <MenuItem value="trending">Trending</MenuItem>
//           {/* <MenuItem value="archived">Archived</MenuItem> */}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default NewsFilterBar;

// new code
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
  Stack,
  type SelectChangeEvent,
} from "@mui/material";

interface NewsFilterBarProps {
  storyType: string;
  onStoryTypeChange: (type: string) => void;
  filters: {
    section?: string;
    category?: string;
    date?: string;
    year?: string;
    month?: string;
  };
  onFiltersChange: (filters: any) => void;
}

const NewsFilterBar = ({
  storyType,
  onStoryTypeChange,
  filters,
  onFiltersChange,
}: NewsFilterBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Unified handler for both TextField & Select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    onFiltersChange({ ...filters, [name]: value });
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      flexWrap="wrap"
      alignItems="center"
      my={2}
    >
      {/* Story Type */}
      <FormControl sx={{ minWidth: 150 }} fullWidth={isMobile}>
        <InputLabel>Story Type</InputLabel>
        <Select
          name="storyType" // ✅ Add name to fix type error
          value={storyType}
          label="Story Type"
          onChange={(e) => onStoryTypeChange(e.target.value)}
        >
          <MenuItem value="top">Top Stories</MenuItem>
          <MenuItem value="trending">Trending</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </FormControl>

      {/* Top Stories Section Filter */}
      {storyType === "top" && (
        <FormControl sx={{ minWidth: 150 }} fullWidth={isMobile}>
          <InputLabel>Section</InputLabel>
          <Select
            name="section"
            value={filters.section || ""}
            label="Section"
            onChange={handleChange}
          >
            <MenuItem value="">Home</MenuItem>
            <MenuItem value="world">World</MenuItem>
            <MenuItem value="us">U.S.</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="arts">Arts</MenuItem>
            <MenuItem value="science">Science</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Archived Filters */}
      {storyType === "archived" && (
        <>
          <TextField
            name="year"
            label="Year"
            type="number"
            value={filters.year || ""}
            onChange={handleChange}
            fullWidth={isMobile}
            sx={{ minWidth: 120 }}
          />
          <TextField
            name="month"
            label="Month"
            type="number"
            value={filters.month || ""}
            onChange={handleChange}
            fullWidth={isMobile}
            sx={{ minWidth: 120 }}
          />
        </>
      )}
    </Stack>
  );
};

export default NewsFilterBar;
