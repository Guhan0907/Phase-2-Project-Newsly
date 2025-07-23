import { Stack, Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

interface Props {
  isSaved: boolean;
  onShare: () => void;
  onSave: () => void;
}

const ArticleDetailAction = ({ isSaved, onShare, onSave }: Props) => (
  <Stack direction="row" spacing={2} my={3}>
    <Button variant="outlined" startIcon={<ShareIcon />} onClick={onShare}>
      Share
    </Button>
    <Button
      variant={isSaved ? "contained" : "outlined"}
      color={isSaved ? "success" : "primary"}
      startIcon={isSaved ? <BookmarkAddedIcon /> : <BookmarkAddOutlinedIcon />}
      onClick={onSave}
    >
      {isSaved ? "Saved" : "Save"}
    </Button>
  </Stack>
);

export default ArticleDetailAction;
