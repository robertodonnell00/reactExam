import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromPlaylistIcon = ({ movie }) => {
  const { removeFromPlaylist } = useContext(MoviesContext);
  const handleClick = (e) => {
    e.preventDefault();
    removeFromPlaylist(movie);
  };
  return (
    <IconButton aria-label="remove from playlist" onClick={handleClick}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export default RemoveFromPlaylistIcon;
