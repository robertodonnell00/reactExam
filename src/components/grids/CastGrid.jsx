import * as React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Avatar, Box } from "@mui/material";

const IMG = "https://image.tmdb.org/t/p";
const profileUrl = (path) => (path ? `${IMG}/w185${path}` : null);

export default function CastGrid({ cast = [], max = 12 }) {
  const items = cast.slice(0, max);

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {items.map((p) => {
        const src = profileUrl(p.profile_path);
        return (
          <Grid key={p.cast_id || p.credit_id || p.id} item xs={6} sm={4} md={3} lg={2}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3 }}>
              {src ? (
                <CardMedia
                  component="img"
                  src={src}
                  alt={p.name}
                  sx={{ aspectRatio: "2/3", objectFit: "cover" }}
                  loading="lazy"
                />
              ) : (
                <Box sx={{ aspectRatio: "2/3", display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
                  <Avatar sx={{ width: 64, height: 64 }}>{p.name?.[0]}</Avatar>
                </Box>
              )}
              <CardContent sx={{ pt: 1.5 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom noWrap>
                  {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap title={p.character}>
                  {p.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
