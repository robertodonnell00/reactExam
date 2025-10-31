import * as React from "react";
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router";

const IMG = "https://image.tmdb.org/t/p";
const posterUrl = (path) => (path ? `${IMG}/w342${path}` : null);

export default function RecommendationsGrid({ movies = [], toDetailsBase = "/movies" }) {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {movies.map((m) => {
        const src = posterUrl(m.poster_path);
        return (
          <Grid key={m.id} item xs={6} sm={4} md={3} lg={2}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardActionArea component={RouterLink} to={`${toDetailsBase}/${m.id}`}>
                {src ? (
                  <CardMedia
                    component="img"
                    src={src}
                    alt={m.title}
                    sx={{ aspectRatio: "2/3", objectFit: "cover" }}
                    loading="lazy"
                  />
                ) : (
                  <Box sx={{ aspectRatio: "2/3", display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
                    <Typography variant="caption" color="text.secondary">No image</Typography>
                  </Box>
                )}
                <CardContent sx={{ py: 1.25 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap title={m.title}>
                    {m.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
