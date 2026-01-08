'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';  
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo Placeholder - links to dashboard */}
        <Typography variant="h6" component="div" sx={{ flexShrink: 0, mr: 4 }}>
          <MuiLink
            component={Link}
            href="/dashboard"
            color="inherit"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {/* Replace this with your logo image/icon as needed */}
            LOGO
          </MuiLink>
        </Typography>
        {/* Main Nav Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            href="/races"
          >
            Races
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/organizers"
          >
            Organizers
          </Button>
        </Box>
        {/* Auth Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            href="/login"
          >
            Login
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            href="/signup"
            sx={{ ml: 1 }}
          >
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;