'use client';

import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';

// Mock data - replace with actual API call
const allRaces = [
  {
    id: 1,
    name: "City Marathon 2024",
    date: "2024-10-12",
    location: "New York, NY",
    type: "Marathon",
    description: "Join thousands of runners in the heart of New York City for this iconic marathon. Experience the energy of the city as you run through all five boroughs.",
    cover: "/race1.jpg",
    organizer: "NYC Running Club",
    price: "$120",
  },
  {
    id: 2,
    name: "Trailblazer 10K",
    date: "2024-08-02",
    location: "Boulder, CO",
    type: "10K",
    description: "A scenic trail run through the beautiful mountains of Colorado. Perfect for nature lovers and trail running enthusiasts.",
    cover: "/race2.jpg",
    organizer: "Mountain Runners",
    price: "$45",
  },
  {
    id: 3,
    name: "Coastal Fun Run",
    date: "2024-09-20",
    location: "San Diego, CA",
    type: "5K",
    description: "A fun and family-friendly 5K run along the beautiful San Diego coastline. Great for beginners and families.",
    cover: "/race3.jpg",
    organizer: "Coastal Events",
    price: "$30",
  },
  {
    id: 4,
    name: "Urban Sprint",
    date: "2024-11-15",
    location: "Chicago, IL",
    type: "5K",
    description: "Fast-paced urban 5K through downtown Chicago. Experience the city's architecture while pushing your limits.",
    cover: "/race4.jpg",
    organizer: "Windy City Runners",
    price: "$35",
  },
  {
    id: 5,
    name: "Mountain Ultra",
    date: "2024-12-01",
    location: "Denver, CO",
    type: "Ultra",
    description: "Challenge yourself with this ultra-marathon through the Rocky Mountains. For experienced runners only.",
    cover: "/race5.jpg",
    organizer: "Altitude Athletics",
    price: "$200",
  },
  {
    id: 6,
    name: "Beach Half Marathon",
    date: "2025-01-10",
    location: "Miami, FL",
    type: "Half Marathon",
    description: "Run along the beautiful beaches of Miami in this scenic half marathon. Perfect weather and stunning views.",
    cover: "/race6.jpg",
    organizer: "Beach Runners",
    price: "$75",
  },
];

const raceTypes = ['All', '5K', '10K', 'Half Marathon', 'Marathon', 'Ultra'];
const locations = ['All', 'New York, NY', 'Boulder, CO', 'San Diego, CA', 'Chicago, IL', 'Denver, CO', 'Miami, FL'];

export default function RacesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    date: '',
    location: 'All',
    type: 'All',
  });

  const itemsPerPage = 6;

  // Filter races based on selected filters
  const filteredRaces = allRaces.filter((race) => {
    if (filters.location !== 'All' && race.location !== filters.location) return false;
    if (filters.type !== 'All' && race.type !== filters.type) return false;
    if (filters.date && race.date !== filters.date) return false;
    return true;
  });

  // Paginate filtered races
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRaces = filteredRaces.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRaces.length / itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1); // Reset to first page when filters change
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Discover Races
      </Typography>

      {/* Filters Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Filter Races
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              select
              label="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              select
              label="Race Type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              {raceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Card>

      {/* Race List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Showing {filteredRaces.length} race{filteredRaces.length !== 1 ? 's' : ''}
        </Typography>

        <Stack spacing={3}>
          {paginatedRaces.map((race) => (
            <Card
              key={race.id}
              component={Link}
              href={`/races/${race.id}`}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                },
                cursor: 'pointer',
              }}
              variant="outlined"
            >
              {/* Left Side: Thumbnail, Name, Date, Description */}
              <Box sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
                <CardMedia
                  component="img"
                  image={race.cover}
                  alt={race.name}
                  sx={{
                    width: { xs: '100%', md: 200 },
                    height: { xs: 200, md: 'auto' },
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                      {race.name}
                    </Typography>
                    <Chip label={race.type} size="small" color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(race.date), 'MMMM d, yyyy')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {race.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {race.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                    Organized by {race.organizer}
                  </Typography>
                </CardContent>
              </Box>

              {/* Right Side: CTA and Details */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  minWidth: { xs: '100%', md: 200 },
                  borderLeft: { xs: 'none', md: '1px solid' },
                  borderTop: { xs: '1px solid', md: 'none' },
                  borderColor: 'divider',
                  bgcolor: { xs: 'grey.50', md: 'transparent' },
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {race.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Registration Fee
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/races/${race.id}`;
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          ))}
        </Stack>

        {paginatedRaces.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No races found matching your filters
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                setFilters({ date: '', location: 'All', type: 'All' });
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
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
