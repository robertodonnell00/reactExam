import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTrendingToday } from "../api/tmdb-api";

const TrendingTodayPage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["trending_day"],
    queryFn: getTrendingToday,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <PageTemplate
      title="Hot Right Now!"
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingTodayPage;
