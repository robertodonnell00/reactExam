import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import TopRatedPage from "./pages/topRatedPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import PlaylistPage from "./pages/playlistPage";
import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6fa53fff" },
    secondary: { main: "#66a0ab" },
    background: { default: "#0b1020", paper: "#0f1326" },
    text: { primary: "#e5e7eb", secondary: "#a3a9b7" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
    MuiCard: { styleOverrides: { root: { boxShadow: "0 6px 24px rgba(2,6,23,0.4)" } } },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MoviesContextProvider>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/now-playing" element={<NowPlayingPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/popular" element={<PopularMoviesPage />} />
            <Route path="/trending" element={<TrendingTodayPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            
            <Route path="/movie/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/movie/:id/recommendations" element={<MovieRecommendationsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
