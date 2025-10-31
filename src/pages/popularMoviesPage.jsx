import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getPopularMovies } from "../api/tmdb-api";

const PopularMoviesPage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <PageTemplate
      title="Popular"
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default PopularMoviesPage;
