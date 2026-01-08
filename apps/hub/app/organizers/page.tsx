'use client';

import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import { format } from 'date-fns';

// Mock data - replace with actual API call
const organizers = [
  {
    id: 1,
    name: 'NYC Running Club',
    image: '/organizer1.jpg',
    bio: 'New York City\'s premier running organization, hosting marathons and races since 2010. We bring together runners of all levels for unforgettable experiences.',
    location: 'New York, NY',
    totalRaces: 45,
    verified: true,
    upcomingRaces: [
      {
        id: 1,
        name: 'City Marathon 2024',
        date: '2024-10-12',
        type: 'Marathon',
      },
      {
        id: 4,
        name: 'Urban Sprint',
        date: '2024-11-15',
        type: '5K',
      },
    ],
  },
  {
    id: 2,
    name: 'Mountain Runners',
    image: '/organizer2.jpg',
    bio: 'Specializing in trail runs and mountain races across Colorado. Experience the beauty of nature while challenging yourself.',
    location: 'Boulder, CO',
    totalRaces: 28,
    verified: true,
    upcomingRaces: [
      {
        id: 2,
        name: 'Trailblazer 10K',
        date: '2024-08-02',
        type: '10K',
      },
      {
        id: 5,
        name: 'Mountain Ultra',
        date: '2024-12-01',
        type: 'Ultra',
      },
    ],
  },
  {
    id: 3,
    name: 'Coastal Events',
    image: '/organizer3.jpg',
    bio: 'Creating memorable running experiences along the beautiful California coastline. Family-friendly events for all skill levels.',
    location: 'San Diego, CA',
    totalRaces: 32,
    verified: true,
    upcomingRaces: [
      {
        id: 3,
        name: 'Coastal Fun Run',
        date: '2024-09-20',
        type: '5K',
      },
    ],
  },
  {
    id: 4,
    name: 'Windy City Runners',
    image: '/organizer4.jpg',
    bio: 'Chicago\'s fastest-growing running community. Urban races that showcase the city\'s iconic architecture and neighborhoods.',
    location: 'Chicago, IL',
    totalRaces: 19,
    verified: false,
    upcomingRaces: [
      {
        id: 4,
        name: 'Urban Sprint',
        date: '2024-11-15',
        type: '5K',
      },
    ],
  },
  {
    id: 5,
    name: 'Altitude Athletics',
    image: '/organizer5.jpg',
    bio: 'High-altitude training and racing specialists. Challenge yourself with our ultra-marathons in the Rocky Mountains.',
    location: 'Denver, CO',
    totalRaces: 15,
    verified: true,
    upcomingRaces: [
      {
        id: 5,
        name: 'Mountain Ultra',
        date: '2024-12-01',
        type: 'Ultra',
      },
    ],
  },
  {
    id: 6,
    name: 'Beach Runners',
    image: '/organizer6.jpg',
    bio: 'Miami\'s premier running organization. Scenic beach runs with perfect weather year-round.',
    location: 'Miami, FL',
    totalRaces: 22,
    verified: true,
    upcomingRaces: [
      {
        id: 6,
        name: 'Beach Half Marathon',
        date: '2025-01-10',
        type: 'Half Marathon',
      },
    ],
  },
];

export default function OrganizersPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Paginate organizers
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrganizers = organizers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(organizers.length / itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Race Organizers
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Showing {organizers.length} organizer{organizers.length !== 1 ? 's' : ''}
        </Typography>

        <Stack spacing={3}>
          {paginatedOrganizers.map((organizer) => (
            <Card
              key={organizer.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                },
              }}
              variant="outlined"
            >
              {/* Organizer Image */}
              <Box
                sx={{
                  width: { xs: '100%', md: 200 },
                  height: { xs: 200, md: 'auto' },
                  minHeight: { md: 200 },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={organizer.image}
                  alt={organizer.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {organizer.verified && (
                  <Chip
                    label="Verified"
                    color="success"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                    }}
                  />
                )}
              </Box>

              {/* Organizer Details */}
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  p: 3,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {organizer.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    📍 {organizer.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {organizer.totalRaces} {organizer.totalRaces === 1 ? 'race' : 'races'} organized
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'text.secondary',
                  }}
                >
                  {organizer.bio}
                </Typography>

                {/* Upcoming Races */}
                {organizer.upcomingRaces.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Upcoming Races:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      {organizer.upcomingRaces.map((race) => (
                        <Chip
                          key={race.id}
                          label={`${race.name} - ${format(new Date(race.date), 'MMM d')}`}
                          size="small"
                          variant="outlined"
                          component={Link}
                          href={`/races/${race.id}`}
                          clickable
                          sx={{
                            '&:hover': {
                              bgcolor: 'primary.lighter',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* CTA Button */}
                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Button
                    component={Link}
                    href={`/organizers/${organizer.id}`}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 'auto' }}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {paginatedOrganizers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No organizers found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}
