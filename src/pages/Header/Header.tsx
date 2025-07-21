// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   IconButton,
//   Box,
//   Menu,
//   MenuItem,
//   Avatar,
//   Badge,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import { Search, Favorite, Logout } from '@mui/icons-material';
// import { useState } from 'react';

// interface HeaderProps {
//   onSearch: (query: string) => void;
//   onLogout: () => void;
//   user: { name: string; avatar: string } | null;
// }

// const Header = ({ onSearch, onLogout, user }: HeaderProps) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const [query, setQuery] = useState('');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     console.log("Something got clicked")
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSearch = () => {
//     if (query.trim()) {
//       onSearch(query.trim());
//     }
//   };

//   const handleWishList = () => {
//     console.log("WishList Icon got clicked");

//   }

//   return (
//     <AppBar position="sticky" color="default" elevation={1}>
//       <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
//         {/* Logo */}
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Newsly
//         </Typography>

//         {/* Search bar */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             border: '1px solid',
//             borderColor: 'divider',
//             borderRadius: 2,
//             px: 1,
//             py: 0.5,
//             width: isMobile ? '100%' : '40%',
//             mt: isMobile ? 1 : 0,
//           }}
//         >
//           <InputBase
//             placeholder="Search news..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             sx={{ flex: 1, pl: 1 }}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//           />
//           <IconButton size="small" onClick={handleSearch}>
//             <Search />
//           </IconButton>
//         </Box>

//         {/* Icons */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: isMobile ? 1 : 0 }}>
//           {/* Wishlist */}
//           <IconButton color="primary" onClick={handleWishList}>
//             <Badge badgeContent={2} color="secondary">
//               <Favorite />
//             </Badge>
//           </IconButton>

//           {/* User Avatar with Menu */}
//           {user && (
//             <>
//               <IconButton onClick={handleMenuOpen}>
//                 <Avatar src={user.avatar} alt={user.name} />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//               >
//                 <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>
//                   <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search, Favorite, Logout } from "@mui/icons-material";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onLogout: () => void;
  user: { name: string; avatar: string } | null;
}

const Header = ({ onSearch, onLogout, user }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
    console.log("Search item done");
  };

  const handleWishList = () => {
    console.log("Wishlist clicked");
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: isMobile ? 0.5 : 2,
          px: 1,
          py: isMobile ? 0.5 : 1,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: isMobile ? "1rem" : "1.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Newsly
        </Typography>

        {/* Search bar */}
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
          }}
        >
          <InputBase
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              flex: 1,
              fontSize: isMobile ? "0.8rem" : "1rem",
              pl: 0.5,
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <IconButton size="small" onClick={handleSearch}>
            <Search fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>

        {/* Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 0.5 : 1,
          }}
        >
          {/* Wishlist */}
          <IconButton
            color="primary"
            onClick={handleWishList}
            size={isMobile ? "small" : "medium"}
          >
            <Badge badgeContent={2} color="secondary">
              <Favorite fontSize={isMobile ? "small" : "medium"} />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          {user && (
            <>
              <IconButton
                onClick={handleMenuOpen}
                size={isMobile ? "small" : "medium"}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: isMobile ? 30 : 36, height: isMobile ? 30 : 36 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    onLogout();
                  }}
                >
                  <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
