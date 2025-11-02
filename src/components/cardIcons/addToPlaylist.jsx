import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckIcon from "@mui/icons-material/Check";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylist = ({ movie }) => {
  const { addToPlaylist, isInPlaylist } = useContext(MoviesContext);
  //determine if already in playlist
  const inList = isInPlaylist(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    if (!inList) addToPlaylist(movie);
  };

  return (
    <IconButton aria-label="add to playlist" onClick={handleClick}>
      {inList ? <CheckIcon color="success" /> : <PlaylistAddIcon color="primary" />}
    </IconButton>
  );
};

export default AddToPlaylist;
