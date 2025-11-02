import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);

  // --- FAVOURITES ---
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  // --- REVIEW ---
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };
  console.log(myReviews);

  // --- PLAYLIST ---
  const addToPlaylist = (movie) => {
    setPlaylist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist((prev) => prev.filter((m) => m.id !== movie.id));
  };

  const isInPlaylist = (id) => playlist.some((m) => m.id === id);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,

        playlist,
        addToPlaylist,
        removeFromPlaylist,
        isInPlaylist,

        addReview,
        myReviews,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
