import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedPage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["top_rated"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <PageTemplate
      title="Top Rated"
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TopRatedPage;
