import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getMovie, getMovieCredits } from "../api/tmdb-api";

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError } = useQuery({
      queryKey: ['movie', { id: id }],
      queryFn: getMovie,
    })
  const credits = useQuery({ queryKey: ["credits", id], queryFn: () => getMovieCredits(id) });

  if (movie.isPending) return <Spinner />;
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h1>Cast — {movie.data.title}</h1>
      {credits.isPending && <Spinner />}
      {credits.isError && <p>Error: {credits.error.message}</p>}
      {credits.data && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {credits.data.cast.map((p) => (
            <li key={p.cast_id || p.credit_id}>
              <strong>{p.name}</strong> — <span style={{ opacity: 0.8 }}>{p.character}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCreditsPage;
