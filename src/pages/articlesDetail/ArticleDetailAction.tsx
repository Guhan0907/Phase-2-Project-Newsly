import {
  Button,
  Stack,
  Menu,
  MenuItem,
  Snackbar,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import { useState, type MouseEvent } from "react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

interface Props {
  isSaved: boolean;
  onSave: () => void;
  articleTitle: string;
}

const ArticleDetailAction = ({ isSaved, onSave, articleTitle }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const shareUrl = window.location.href;

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      // fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    } finally {
      setSnackbarOpen(true);
      handleMenuClose();
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} my={3} flexWrap="wrap">
        {/* Share Button */}
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleMenuOpen}
        >
          Share
        </Button>

        {/* Save Button */}
        <Button
          variant={isSaved ? "contained" : "outlined"}
          color={isSaved ? "success" : "primary"}
          startIcon={
            isSaved ? <BookmarkAddedIcon /> : <BookmarkAddOutlinedIcon />
          }
          onClick={onSave}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </Stack>

      {/* Share Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>

        <MenuItem
          component="a"
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${articleTitle} - ${shareUrl}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>

        <MenuItem
          component="a"
          href={`mailto:?subject=${encodeURIComponent(
            articleTitle,
          )}&body=Check out this article: ${encodeURIComponent(shareUrl)}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default ArticleDetailAction;
