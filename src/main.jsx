import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import NowPlayingPage from "./pages/nowPlayingPage";
import TopRatedPage from "./pages/topRatedPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/now-playing" element={<NowPlayingPage />}/>
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/popular" element={<PopularMoviesPage />} />
            <Route path="/trending" element={<TrendingTodayPage />} />

            <Route path="/movie/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/movie/:id/recommendations" element={<MovieRecommendationsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
