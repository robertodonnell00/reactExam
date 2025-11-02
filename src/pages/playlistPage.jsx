import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import MovieListPageTemplate from "../components/templateMovieListPage";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
  const { playlist } = useContext(MoviesContext);

  return (
    <MovieListPageTemplate
      title="My Playlist"
      movies={playlist}
      action={(movie) => <RemoveFromPlaylist movie={movie} />}
      emptyMessage="Your playlist is empty. Add some movies from any list."
    />
  );
};

export default PlaylistPage;
