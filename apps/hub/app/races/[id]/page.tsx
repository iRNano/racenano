'use client';

import { use } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';

// Mock data - replace with actual API call
const racesData: Record<number, {
  id: number;
  name: string;
  date: string;
  location: string;
  type: string;
  description: string;
  cover: string;
  organizer: string;
  price: string;
  fullDescription: string;
  distance: string;
  elevation: string;
  timeLimit: string;
  registrationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
}> = {
  1: {
    id: 1,
    name: "City Marathon 2024",
    date: "2024-10-12",
    location: "New York, NY",
    type: "Marathon",
    description: "Join thousands of runners in the heart of New York City for this iconic marathon.",
    cover: "/race1.jpg",
    organizer: "NYC Running Club",
    price: "$120",
    fullDescription: "Experience the energy of New York City as you run through all five boroughs in this iconic marathon. This world-renowned race takes you through Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. With over 50,000 participants annually, this is one of the largest marathons in the world. The course features flat terrain with some challenging bridges, making it accessible for runners of all levels while still providing a true test of endurance.",
    distance: "26.2 miles (42.2 km)",
    elevation: "1,200 ft gain",
    timeLimit: "6 hours 30 minutes",
    registrationDeadline: "2024-09-15",
    maxParticipants: 50000,
    currentParticipants: 32450,
  },
  2: {
    id: 2,
    name: "Trailblazer 10K",
    date: "2024-08-02",
    location: "Boulder, CO",
    type: "10K",
    description: "A scenic trail run through the beautiful mountains of Colorado.",
    cover: "/race2.jpg",
    organizer: "Mountain Runners",
    price: "$45",
    fullDescription: "A scenic trail run through the beautiful mountains of Colorado. Perfect for nature lovers and trail running enthusiasts. The course winds through pristine mountain trails, offering breathtaking views of the Rocky Mountains. This challenging yet rewarding route includes technical sections, stream crossings, and elevation changes that will test your trail running skills.",
    distance: "10 km (6.2 miles)",
    elevation: "2,500 ft gain",
    timeLimit: "2 hours",
    registrationDeadline: "2024-07-25",
    maxParticipants: 500,
    currentParticipants: 342,
  },
  3: {
    id: 3,
    name: "Coastal Fun Run",
    date: "2024-09-20",
    location: "San Diego, CA",
    type: "5K",
    description: "A fun and family-friendly 5K run along the beautiful San Diego coastline.",
    cover: "/race3.jpg",
    organizer: "Coastal Events",
    price: "$30",
    fullDescription: "A fun and family-friendly 5K run along the beautiful San Diego coastline. Great for beginners and families. The flat, paved course offers stunning ocean views and perfect weather. This event welcomes walkers, joggers, and runners of all ages and abilities. Post-race festivities include food trucks, live music, and activities for kids.",
    distance: "5 km (3.1 miles)",
    elevation: "Flat",
    timeLimit: "1 hour",
    registrationDeadline: "2024-09-15",
    maxParticipants: 2000,
    currentParticipants: 1245,
  },
};

export default function RaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const raceId = parseInt(id, 10);
  const race = racesData[raceId];

  if (!race) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Race Not Found
        </Typography>
        <Button component={Link} href="/races" variant="contained">
          Back to Races
        </Button>
      </Container>
    );
  }

  const registrationOpen = new Date(race.registrationDeadline) > new Date();
  const spotsRemaining = race.maxParticipants - race.currentParticipants;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/races"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Races
      </Button>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left Column: Main Content */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
          {/* Hero Image */}
          <CardMedia
            component="img"
            image={race.cover}
            alt={race.name}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
            }}
          />

          {/* Race Title and Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {race.name}
              </Typography>
              <Chip label={race.type} color="primary" />
            </Box>
            <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.secondary">
                📅 {format(new Date(race.date), 'MMMM d, yyyy')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                📍 {race.location}
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Full Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              About This Race
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {race.fullDescription}
            </Typography>
          </Box>

          {/* Race Details */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Race Details
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Distance
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {race.distance}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Elevation
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {race.elevation}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Time Limit
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {race.timeLimit}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Registration Deadline
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {format(new Date(race.registrationDeadline), 'MMMM d, yyyy')}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column: Registration Card */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
          <Card sx={{ position: 'sticky', top: 80, p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {race.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Registration Fee
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Participants
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {race.currentParticipants.toLocaleString()} / {race.maxParticipants.toLocaleString()}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  mt: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${(race.currentParticipants / race.maxParticipants) * 100}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {spotsRemaining} spots remaining
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              disabled={!registrationOpen || spotsRemaining === 0}
              sx={{ mb: 2 }}
            >
              {!registrationOpen
                ? 'Registration Closed'
                : spotsRemaining === 0
                ? 'Sold Out'
                : 'Register Now'}
            </Button>

            <Button variant="outlined" fullWidth>
              Share Event
            </Button>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Organized by
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {race.organizer}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
