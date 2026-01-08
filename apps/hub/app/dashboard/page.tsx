'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';

// Mock data - replace with actual API calls
const organizerName = 'John Doe';
const profileImage = '/profile.jpg'; // Replace with actual profile image URL
const profileCompletion = 75; // Percentage

const myEvents = [
  {
    id: 1,
    name: 'City Marathon 2024',
    date: '2024-10-12',
    status: 'Published',
    participants: 32450,
    maxParticipants: 50000,
  },
  {
    id: 2,
    name: 'Trailblazer 10K',
    date: '2024-08-02',
    status: 'Draft',
    participants: 342,
    maxParticipants: 500,
  },
  {
    id: 3,
    name: 'Coastal Fun Run',
    date: '2024-09-20',
    status: 'Published',
    participants: 1245,
    maxParticipants: 2000,
  },
  {
    id: 4,
    name: 'Urban Sprint',
    date: '2024-11-15',
    status: 'Scheduled',
    participants: 0,
    maxParticipants: 1000,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Published':
      return 'success';
    case 'Draft':
      return 'default';
    case 'Scheduled':
      return 'info';
    default:
      return 'default';
  }
};

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome, {organizerName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your events and track your progress
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              href="/dashboard/events/new"
              variant="contained"
              size="large"
              sx={{ fontWeight: 600 }}
            >
              Create Event
            </Button>
            <Avatar
              src={profileImage}
              alt={organizerName}
              sx={{ width: 56, height: 56 }}
            >
              {organizerName.charAt(0)}
            </Avatar>
          </Box>
        </Box>
      </Card>

      {/* My Events Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              My Events
            </Typography>
            <Button component={Link} href="/dashboard/events/new" variant="outlined" size="small">
              + New Event
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Event Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Participants</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myEvents.map((event) => (
                  <TableRow key={event.id} hover>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {event.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(event.date), 'MMM d, yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={event.status}
                        color={getStatusColor(event.status) as 'success' | 'default' | 'info'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.participants.toLocaleString()} / {event.maxParticipants.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          component={Link}
                          href={`/races/${event.id}`}
                          size="small"
                          title="View Event"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          component={Link}
                          href={`/dashboard/events/${event.id}/edit`}
                          size="small"
                          title="Edit Event"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {myEvents.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                No events yet. Create your first event to get started!
              </Typography>
              <Button
                component={Link}
                href="/dashboard/events/new"
                variant="contained"
              >
                Create Event
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Profile Completion Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Profile Completion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileCompletion}% Complete
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={profileCompletion}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Complete your profile to improve your organizer visibility and attract more participants.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip
              label="✓ Profile Photo"
              color="success"
              size="small"
              variant="outlined"
            />
            <Chip
              label="✓ Contact Information"
              color="success"
              size="small"
              variant="outlined"
            />
            <Chip
              label="✗ Organization Bio"
              color="default"
              size="small"
              variant="outlined"
            />
            <Chip
              label="✗ Social Media Links"
              color="default"
              size="small"
              variant="outlined"
            />
          </Stack>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            component={Link}
            href="/dashboard/profile"
          >
            Complete Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
