'use client';

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Navbar from "@repo/ui/Navbar";

const races = [
  {
    id: 1,
    name: "City Marathon 2024",
    date: "2024-10-12",
    location: "New York, NY",
    cover: "/race1.jpg",
  },
  {
    id: 2,
    name: "Trailblazer 10K",
    date: "2024-08-02",
    location: "Boulder, CO",
    cover: "/race2.jpg",
  },
  {
    id: 3,
    name: "Coastal Fun Run",
    date: "2024-09-20",
    location: "San Diego, CA",
    cover: "/race3.jpg",
  },
];

export default function Home() {

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", bgcolor: "zinc.50", fontFamily: "sans-serif" }}>
      {/* Fixed Navbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1300 }}>
        <Navbar />
      </Box>

      <Container maxWidth="lg" sx={{ pt: 14, pb: 0 }}>
        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
            mt: 6,
            mb: 10,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
              background: "linear-gradient(90deg, #3b82f6 20%, #a21cf4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              mb: 1,
              letterSpacing: "-1px",
            }}
          >
            Discover Races. Empower Organizers.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, maxWidth: "500px" }}>
            The central hub for runners and race organizers. Find, join, and organize races with ease.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
            <Button
              component={Link}
              href="/races"
              size="large"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 9999,
                fontWeight: 600,
                px: 4,
                fontSize: "1.1rem",
                boxShadow: 2,
              }}
            >
              Explore Races
            </Button>
            <Button
              component={Link}
              href="/organizers/create"
              size="large"
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 9999,
                fontWeight: 600,
                px: 4,
                fontSize: "1.1rem",
                backgroundColor: "#fff",
                boxShadow: 1,
              }}
            >
              Organize a Race
            </Button>
          </Stack>
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            mb: { xs: 6, md: 10 }
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.333%" }, maxWidth: { md: "400px" } }}>
            <Card
              variant="outlined"
              sx={{ borderRadius: 4, p: 2, textAlign: "center", bgcolor: "background.paper", boxShadow: 2 }}
            >
              <Typography sx={{ fontSize: 36, color: "#3b82f6", mb: 1 }}>✔️</Typography>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Verified Organizers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join races curated by trusted organizers for a reliable experience.
              </Typography>
            </Card>
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.333%" }, maxWidth: { md: "400px" } }}>
            <Card
              variant="outlined"
              sx={{ borderRadius: 4, p: 2, textAlign: "center", bgcolor: "background.paper", boxShadow: 2 }}
            >
              <Typography sx={{ fontSize: 36, color: "#a21cf4", mb: 1 }}>🌐</Typography>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Central Hub
              </Typography>
              <Typography variant="body2" color="text.secondary">
                One place for all races, whether you want to run or organize.
              </Typography>
            </Card>
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33.333%" }, maxWidth: { md: "400px" } }}>
            <Card
              variant="outlined"
              sx={{ borderRadius: 4, p: 2, textAlign: "center", bgcolor: "background.paper", boxShadow: 2 }}
            >
              <Typography sx={{ fontSize: 36, color: "#22c55e", mb: 1 }}>🚀</Typography>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Free Promotion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organizers get free exposure to thousands of runners.
              </Typography>
            </Card>
          </Box>
        </Box>

        {/* Upcoming Races */}
        <Box component="section" sx={{ mb: 10 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "text.primary" }}>
            Upcoming Races
          </Typography>
          <Box sx={{ overflowX: "auto", pb: 2 }}>
            <Stack direction="row" spacing={3}>
              {races.map((race) => (
                <Card
                  key={race.id}
                  component={Link}
                  href={`/races/${race.id}`}
                  sx={{
                    minWidth: 260,
                    maxWidth: 280,
                    bgcolor: "background.paper",
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 3,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6, borderColor: "primary.main" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                  variant="outlined"
                >
                  <CardMedia
                    component="img"
                    image={race.cover}
                    alt={race.name}
                    height="130"
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {race.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {race.location}
                    </Typography>
                    <Typography
                      sx={{ mt: 1, fontSize: 14, color: "text.primary", letterSpacing: "0.03em" }}
                    >
                      {race.date}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>

      </Container>

      {/* Full Width CTA */}
      <Box
        component="section"
        sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          transform: "translateX(-50%)",
          bgcolor: "linear-gradient(90deg, #3b82f6 0%, #a21cf4 100%)",
          background: "linear-gradient(90deg, #3b82f6 0%, #a21cf4 100%)",
          py: { xs: 6, sm: 10 },
          mt: 0,
          mb: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: "#fff", mb: 1.5, textShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
            Become a Race Organizer Today
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.86)", mb: 3 }}>
            Start your journey and connect with our growing community of race enthusiasts.
          </Typography>
          <Button
            component={Link}
            href="/organizers/create"
            size="large"
            sx={{
              borderRadius: 9999,
              px: 5,
              py: 2,
              bgcolor: "#fff",
              color: "#3b82f6",
              fontWeight: 700,
              fontSize: "1.1rem",
              boxShadow: 2,
              mt: 1,
              "&:hover": {
                bgcolor: "zinc.100",
              },
            }}
          >
            Create Organizer Profile
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
