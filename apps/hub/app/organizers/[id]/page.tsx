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
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import { format } from 'date-fns';

// Mock data - replace with actual API call
const organizersData: Record<number, {
  id: number;
  name: string;
  image: string;
  bio: string;
  fullBio: string;
  location: string;
  email: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  verified: boolean;
  totalRaces: number;
  totalParticipants: number;
  establishedYear: number;
  races: Array<{
    id: number;
    name: string;
    date: string;
    location: string;
    type: string;
    cover: string;
    participants: number;
    maxParticipants: number;
    status: 'upcoming' | 'past';
  }>;
}> = {
  1: {
    id: 1,
    name: 'NYC Running Club',
    image: '/organizer1.jpg',
    bio: 'New York City\'s premier running organization, hosting marathons and races since 2010.',
    fullBio: 'NYC Running Club has been at the forefront of the New York City running scene since 2010. We bring together runners of all levels for unforgettable experiences across all five boroughs. Our mission is to promote health, fitness, and community through the sport of running. We organize world-class marathons, half marathons, 10Ks, and 5Ks that showcase the best of what New York City has to offer. With over 50,000 participants across our events, we\'ve become one of the most trusted names in urban running.',
    location: 'New York, NY',
    email: 'contact@nycrunningclub.com',
    website: 'https://nycrunningclub.com',
    socialMedia: {
      facebook: 'https://facebook.com/nycrunningclub',
      twitter: 'https://twitter.com/nycrunningclub',
      instagram: 'https://instagram.com/nycrunningclub',
    },
    verified: true,
    totalRaces: 45,
    totalParticipants: 125000,
    establishedYear: 2010,
    races: [
      {
        id: 1,
        name: 'City Marathon 2024',
        date: '2024-10-12',
        location: 'New York, NY',
        type: 'Marathon',
        cover: '/race1.jpg',
        participants: 32450,
        maxParticipants: 50000,
        status: 'upcoming',
      },
      {
        id: 4,
        name: 'Urban Sprint',
        date: '2024-11-15',
        location: 'New York, NY',
        type: '5K',
        cover: '/race4.jpg',
        participants: 0,
        maxParticipants: 1000,
        status: 'upcoming',
      },
      {
        id: 7,
        name: 'Spring Half Marathon 2024',
        date: '2024-04-15',
        location: 'New York, NY',
        type: 'Half Marathon',
        cover: '/race7.jpg',
        participants: 8500,
        maxParticipants: 10000,
        status: 'past',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Mountain Runners',
    image: '/organizer2.jpg',
    bio: 'Specializing in trail runs and mountain races across Colorado.',
    fullBio: 'Mountain Runners is Colorado\'s premier trail running organization. Since 2015, we\'ve been creating challenging and beautiful trail running experiences in the Rocky Mountains. Our races range from beginner-friendly 5Ks to ultra-marathons that test even the most experienced runners. We\'re passionate about preserving the natural beauty of our mountain trails while providing runners with unforgettable experiences.',
    location: 'Boulder, CO',
    email: 'info@mountainrunners.com',
    website: 'https://mountainrunners.com',
    socialMedia: {
      facebook: 'https://facebook.com/mountainrunners',
      instagram: 'https://instagram.com/mountainrunners',
    },
    verified: true,
    totalRaces: 28,
    totalParticipants: 8500,
    establishedYear: 2015,
    races: [
      {
        id: 2,
        name: 'Trailblazer 10K',
        date: '2024-08-02',
        location: 'Boulder, CO',
        type: '10K',
        cover: '/race2.jpg',
        participants: 342,
        maxParticipants: 500,
        status: 'upcoming',
      },
      {
        id: 5,
        name: 'Mountain Ultra',
        date: '2024-12-01',
        location: 'Denver, CO',
        type: 'Ultra',
        cover: '/race5.jpg',
        participants: 0,
        maxParticipants: 200,
        status: 'upcoming',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Coastal Events',
    image: '/organizer3.jpg',
    bio: 'Creating memorable running experiences along the beautiful California coastline.',
    fullBio: 'Coastal Events has been organizing family-friendly running events along the California coastline since 2012. We specialize in creating accessible, fun, and scenic races that welcome runners of all ages and abilities. Our events combine the natural beauty of the Pacific Coast with a supportive community atmosphere.',
    location: 'San Diego, CA',
    email: 'hello@coastalevents.com',
    verified: true,
    totalRaces: 32,
    totalParticipants: 18000,
    establishedYear: 2012,
    races: [
      {
        id: 3,
        name: 'Coastal Fun Run',
        date: '2024-09-20',
        location: 'San Diego, CA',
        type: '5K',
        cover: '/race3.jpg',
        participants: 1245,
        maxParticipants: 2000,
        status: 'upcoming',
      },
    ],
  },
};

export default function OrganizerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const organizerId = parseInt(id, 10);
  const organizer = organizersData[organizerId];

  if (!organizer) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Organizer Not Found
        </Typography>
        <Button component={Link} href="/organizers" variant="contained">
          Back to Organizers
        </Button>
      </Container>
    );
  }

  const upcomingRaces = organizer.races.filter((race) => race.status === 'upcoming');
  const pastRaces = organizer.races.filter((race) => race.status === 'past');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/organizers"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Organizers
      </Button>

      {/* Header Section */}
      <Card sx={{ mb: 4, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'relative',
            height: 200,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'flex-end',
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 3,
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <Avatar
              src={organizer.image}
              alt={organizer.name}
              sx={{
                width: 120,
                height: 120,
                border: 4,
                borderColor: 'background.paper',
                bgcolor: 'background.paper',
              }}
            >
              {organizer.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 200, pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                  {organizer.name}
                </Typography>
                {organizer.verified && (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    color="success"
                    sx={{ bgcolor: 'white' }}
                  />
                )}
              </Box>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon fontSize="small" />
                  {organizer.location}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Established {organizer.establishedYear}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Main Content */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
          {/* About Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                About
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {organizer.fullBio}
              </Typography>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Statistics
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Total Races
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventIcon color="primary" />
                    {organizer.totalRaces}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Total Participants
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon color="primary" />
                    {organizer.totalParticipants.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Upcoming Races */}
          {upcomingRaces.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Upcoming Races
                </Typography>
                <Stack spacing={2}>
                  {upcomingRaces.map((race) => (
                    <Card
                      key={race.id}
                      component={Link}
                      href={`/races/${race.id}`}
                      sx={{
                        display: 'flex',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 4,
                          transform: 'translateY(-2px)',
                        },
                      }}
                      variant="outlined"
                    >
                      <CardMedia
                        component="img"
                        image={race.cover}
                        alt={race.name}
                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {race.name}
                          </Typography>
                          <Chip label={race.type} size="small" color="primary" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {format(new Date(race.date), 'MMMM d, yyyy')} • {race.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {race.participants.toLocaleString()} / {race.maxParticipants.toLocaleString()} participants
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Past Races */}
          {pastRaces.length > 0 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Past Races
                </Typography>
                <Stack spacing={2}>
                  {pastRaces.map((race) => (
                    <Card
                      key={race.id}
                      component={Link}
                      href={`/races/${race.id}`}
                      sx={{
                        display: 'flex',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        opacity: 0.8,
                        '&:hover': {
                          boxShadow: 4,
                          transform: 'translateY(-2px)',
                          opacity: 1,
                        },
                      }}
                      variant="outlined"
                    >
                      <CardMedia
                        component="img"
                        image={race.cover}
                        alt={race.name}
                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {race.name}
                          </Typography>
                          <Chip label={race.type} size="small" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {format(new Date(race.date), 'MMMM d, yyyy')} • {race.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {race.participants.toLocaleString()} participants
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Sidebar */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
          <Card sx={{ position: 'sticky', top: 80, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Contact Information
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {organizer.email}
                </Typography>
              </Box>

              {organizer.website && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Website
                  </Typography>
                  <Button
                    href={organizer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    size="small"
                    sx={{ textTransform: 'none', p: 0, justifyContent: 'flex-start' }}
                  >
                    {organizer.website.replace(/^https?:\/\//, '')}
                  </Button>
                </Box>
              )}

              {organizer.socialMedia && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Social Media
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {organizer.socialMedia.facebook && (
                      <Button
                        href={organizer.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                      >
                        Facebook
                      </Button>
                    )}
                    {organizer.socialMedia.twitter && (
                      <Button
                        href={organizer.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                      >
                        Twitter
                      </Button>
                    )}
                    {organizer.socialMedia.instagram && (
                      <Button
                        href={organizer.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                      >
                        Instagram
                      </Button>
                    )}
                  </Stack>
                </Box>
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Button
              variant="contained"
              fullWidth
              href={`mailto:${organizer.email}`}
              sx={{ mb: 2 }}
            >
              Contact Organizer
            </Button>

            <Button
              variant="outlined"
              fullWidth
              component={Link}
              href="/races"
            >
              View All Races
            </Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
