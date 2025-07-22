// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   type SelectChangeEvent,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { useState } from "react";

// interface Props {
//   storyType: string;
//   section: string;
//   archiveDate: Date;
//   onStoryTypeChange: (value: string) => void;
//   onSectionChange: (value: string) => void;
//   onDateChange: (date: Date) => void;
// }

// const NewsFilterBar = ({
//   storyType,
//   section,
//   archiveDate,
//   onStoryTypeChange,
//   onSectionChange,
//   onDateChange,
// }: Props) => {
//   return (
//     <Box
//       display="flex"
//       gap={2}
//       flexWrap="wrap"
//       alignItems="center"
//       justifyContent="space-between"
//       mb={3}
//     >
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
//           <MenuItem value="archived">Archived</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl size="small" sx={{ minWidth: 160 }}>
//         <InputLabel id="section-label">Section</InputLabel>
//         <Select
//           labelId="section-label"
//           value={section}
//           onChange={(e: SelectChangeEvent) => onSectionChange(e.target.value)}
//           label="Section"
//         >
//           <MenuItem value="all">All</MenuItem>
//           <MenuItem value="world">World</MenuItem>
//           <MenuItem value="technology">Technology</MenuItem>
//           <MenuItem value="sports">Sports</MenuItem>
//           <MenuItem value="science">Science</MenuItem>
//           <MenuItem value="health">Health</MenuItem>
//           <MenuItem value="arts">Arts</MenuItem>
//         </Select>
//       </FormControl>

//       {storyType === "archived" && (
//         <DatePicker
//           views={["year", "month"]}
//           label="Archive Date"
//           value={dayjs(archiveDate)}
//           onChange={(newValue) => onDateChange(newValue?.toDate() || new Date())}
//           slotProps={{
//             textField: {
//               size: "small",
//             },
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default NewsFilterBar;

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



// components/NewsFilterBar.tsx
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";

interface NewsFilterBarProps {
  storyType: string;
  onStoryTypeChange: (type: string) => void;
  filters: {
    category: string;
    section: string;
    date: string;
  };
  onFiltersChange: (filters: {
    category: string;
    section: string;
    date: string;
  }) => void;
}

const NewsFilterBar = ({
  storyType,
  onStoryTypeChange,
  filters,
  onFiltersChange,
}: NewsFilterBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      gap={2}
      my={3}
      flexWrap="wrap"
    >
      {/* Story Type */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <InputLabel>Story Type</InputLabel>
        <Select
          value={storyType}
          label="Story Type"
          onChange={(e) => onStoryTypeChange(e.target.value)}
        >
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="trending">Trending</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </FormControl>

      {/* Category */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          onChange={handleChange}
          name="category"
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="arts">Arts</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="politics">Politics</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
        </Select>
      </FormControl>

      {/* Section */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <InputLabel>Section</InputLabel>
        <Select
          value={filters.section}
          onChange={handleChange}
          name="section"
          label="Section"
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
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Box>
  );
};

export default NewsFilterBar;
