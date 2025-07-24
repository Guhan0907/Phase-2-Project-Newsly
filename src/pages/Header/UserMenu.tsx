import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";

interface UserMenuProps {
  user: { name: string; imageUrl: string } | null;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar
          src={user.imageUrl || "/fallback-avatar.png"}
          alt={user.name}
          sx={{ width: isMobile ? 30 : 36, height: isMobile ? 30 : 36 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onLogout();
          }}
        >
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
