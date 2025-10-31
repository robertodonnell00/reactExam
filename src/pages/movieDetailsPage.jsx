import React from "react";
import { useParams, Link } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getMovieRecommendations } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'


const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })
  const credits = useQuery({ queryKey: ["credits", id], queryFn: () => getMovieCredits(id) });
  const recs = useQuery({ queryKey: ["recs", id], queryFn: () => getMovieRecommendations(id) });

  

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      <PageTemplate movie={movie}>
        <MovieDetails movie={movie} />
      </PageTemplate>

      {/* CAST */}
      <section style={{ padding: "1rem 2rem" }}>
        <h2>Cast</h2>
        {credits.isPending && <Spinner />}
        {credits.isError && <p>Error: {credits.error.message}</p>}
        {credits.data && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            {credits.data.cast.slice(0, 12).map((p) => (
              <li key={p.cast_id || p.credit_id}>
                <strong>{p.name}</strong>
                <div style={{ opacity: 0.8 }}>{p.character}</div>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 8 }}>
          <Link to={`/movies/${id}/credits`}>View full cast →</Link>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section style={{ padding: "1rem 2rem" }}>
        <h2>Recommended Movies</h2>
        {recs.isPending && <Spinner />}
        {recs.isError && <p>Error: {recs.error.message}</p>}
        {recs.data && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {recs.data.results.slice(0, 12).map((m) => (
              <li key={m.id}>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 8 }}>
          <Link to={`/movies/${id}/recommendations`}>See all recommendations →</Link>
        </div>
      </section>
    </>
  );
};

export default MoviePage;
