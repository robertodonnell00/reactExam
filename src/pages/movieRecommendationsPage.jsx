import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getMovie, getMovieRecommendations } from "../api/tmdb-api";

const MovieRecommendationsPage = () => {
  const { id } = useParams();
  const movie = useQuery({ queryKey: ["movie", id], queryFn: () => getMovie(id) });
  const recs = useQuery({ queryKey: ["recs", id], queryFn: () => getMovieRecommendations(id) });

  if (movie.isPending) return <Spinner />;
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h1>Recommended for “{movie.data.title}”</h1>
      {recs.isPending && <Spinner />}
      {recs.isError && <p>Error: {recs.error.message}</p>}
      {recs.data && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recs.data.results.map((m) => (
            <li key={m.id}>
              <Link to={`/movies/${m.id}`}>{m.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieRecommendationsPage;
