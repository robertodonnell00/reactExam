import * as React from "react";
import { Stack, Typography, Divider } from "@mui/material";

export default function SectionHeader({ title, action }) {
  return (
    <Stack spacing={1.5} sx={{ mt: 3, mb: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={800}>{title}</Typography>
        {action}
      </Stack>
      <Divider />
    </Stack>
  );
}
