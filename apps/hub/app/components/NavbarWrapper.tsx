'use client';

import Navbar from "@repo/ui/Navbar";
import Box from "@mui/material/Box";

export default function NavbarWrapper() {
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1300 }}>
      <Navbar />
    </Box>
  );
}

