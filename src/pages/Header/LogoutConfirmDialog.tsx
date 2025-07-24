import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface LogoutConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog = ({
  open,
  onClose,
  onConfirm,
}: LogoutConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to log out?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
          color="error"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
