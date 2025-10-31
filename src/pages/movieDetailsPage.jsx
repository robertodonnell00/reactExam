import React from "react";
import { useParams, Link } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import CastGrid from "../components/grids/CastGrid";
import RecommendationsGrid from "../components/grids/RecommendationsGrid";
import { getMovie, getMovieCredits, getMovieRecommendations } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import SectionHeader from "../components/sectionHeader";
import Button from "@mui/material/Button";


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

      <SectionHeader
          title="Cast"
          action={
            <Button component={Link} to={`/movies/${id}/credits`} size="small">
              View full cast:
            </Button>
          }
        />
        {credits.isPending && <Spinner />}
        {credits.isError && <p>Error: {credits.error.message}</p>}
        {credits.data?.cast && <CastGrid cast={credits.data.cast} />}

        {/* RECOMMENDATIONS */}
        <SectionHeader
          title="Recommended Movies"
          action={
            <Button component={Link} to={`/movies/${id}/recommendations`} size="small">
              See all recommendations: 
            </Button>
          }
        />
        {recs.isPending && <Spinner />}
        {recs.isError && <p>Error: {recs.error.message}</p>}
        {recs.data?.results && <RecommendationsGrid movies={recs.data.results} />}
    </>
  );
};

export default MoviePage;
