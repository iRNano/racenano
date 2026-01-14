import type { Organizer } from '@repo/types';

// Extended organizer type for the app
export interface ExtendedOrganizer extends Organizer {
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
  totalRaces: number;
  totalParticipants: number;
  establishedYear: number;
  upcomingRaces?: Array<{
    id: string;
    name: string;
    date: string;
    type: string;
  }>;
}

export const mockOrganizers: ExtendedOrganizer[] = [
  {
    id: '1',
    name: 'NYC Running Club',
    image: '/organizer1.jpg',
    bio: 'New York City\'s premier running organization, hosting marathons and races since 2010.',
    fullBio: 'NYC Running Club has been at the forefront of the New York City running scene since 2010. We bring together runners of all levels for unforgettable experiences across all five boroughs. Our mission is to promote health, fitness, and community through the sport of running. We organize world-class marathons, half marathons, 10Ks, and 5Ks that showcase the best of what New York City has to offer. With over 50,000 participants across our events, we\'ve become one of the most trusted names in urban running.',
    description: 'New York City\'s premier running organization',
    location: 'New York, NY',
    email: 'contact@nycrunningclub.com',
    website: 'https://nycrunningclub.com',
    socials: {
      facebook: 'https://facebook.com/nycrunningclub',
      instagram: 'https://instagram.com/nycrunningclub',
    },
    socialMedia: {
      facebook: 'https://facebook.com/nycrunningclub',
      twitter: 'https://twitter.com/nycrunningclub',
      instagram: 'https://instagram.com/nycrunningclub',
    },
    verified: true,
    totalRaces: 45,
    totalParticipants: 125000,
    establishedYear: 2010,
    upcomingRaces: [
      {
        id: '1',
        name: 'City Marathon 2024',
        date: '2024-10-12',
        type: 'Marathon',
      },
      {
        id: '4',
        name: 'Urban Sprint',
        date: '2024-11-15',
        type: '5K',
      },
    ],
  },
  {
    id: '2',
    name: 'Mountain Runners',
    image: '/organizer2.jpg',
    bio: 'Specializing in trail runs and mountain races across Colorado.',
    fullBio: 'Mountain Runners is Colorado\'s premier trail running organization. Since 2015, we\'ve been creating challenging and beautiful trail running experiences in the Rocky Mountains. Our races range from beginner-friendly 5Ks to ultra-marathons that test even the most experienced runners. We\'re passionate about preserving the natural beauty of our mountain trails while providing runners with unforgettable experiences.',
    description: 'Specializing in trail runs and mountain races',
    location: 'Boulder, CO',
    email: 'info@mountainrunners.com',
    website: 'https://mountainrunners.com',
    socials: {
      facebook: 'https://facebook.com/mountainrunners',
      instagram: 'https://instagram.com/mountainrunners',
    },
    socialMedia: {
      facebook: 'https://facebook.com/mountainrunners',
      instagram: 'https://instagram.com/mountainrunners',
    },
    verified: true,
    totalRaces: 28,
    totalParticipants: 8500,
    establishedYear: 2015,
    upcomingRaces: [
      {
        id: '2',
        name: 'Trailblazer 10K',
        date: '2024-08-02',
        type: '10K',
      },
      {
        id: '5',
        name: 'Mountain Ultra',
        date: '2024-12-01',
        type: 'Ultra',
      },
    ],
  },
  {
    id: '3',
    name: 'Coastal Events',
    image: '/organizer3.jpg',
    bio: 'Creating memorable running experiences along the beautiful California coastline.',
    fullBio: 'Coastal Events has been organizing family-friendly running events along the California coastline since 2012. We specialize in creating accessible, fun, and scenic races that welcome runners of all ages and abilities. Our events combine the natural beauty of the Pacific Coast with a supportive community atmosphere.',
    description: 'Creating memorable running experiences',
    location: 'San Diego, CA',
    email: 'hello@coastalevents.com',
    socials: {},
    verified: true,
    totalRaces: 32,
    totalParticipants: 18000,
    establishedYear: 2012,
    upcomingRaces: [
      {
        id: '3',
        name: 'Coastal Fun Run',
        date: '2024-09-20',
        type: '5K',
      },
    ],
  },
  {
    id: '4',
    name: 'Windy City Runners',
    image: '/organizer4.jpg',
    bio: 'Chicago\'s fastest-growing running community.',
    description: 'Urban races in Chicago',
    location: 'Chicago, IL',
    email: 'contact@windycityrunners.com',
    socials: {},
    verified: false,
    totalRaces: 19,
    totalParticipants: 5200,
    establishedYear: 2018,
    fullBio: 'Chicago\'s fastest-growing running community. Urban races that showcase the city\'s iconic architecture and neighborhoods.',
    upcomingRaces: [
      {
        id: '4',
        name: 'Urban Sprint',
        date: '2024-11-15',
        type: '5K',
      },
    ],
  },
  {
    id: '5',
    name: 'Altitude Athletics',
    image: '/organizer5.jpg',
    bio: 'High-altitude training and racing specialists.',
    description: 'High-altitude racing',
    location: 'Denver, CO',
    email: 'info@altitudeathletics.com',
    socials: {},
    verified: true,
    totalRaces: 15,
    totalParticipants: 3200,
    establishedYear: 2016,
    fullBio: 'High-altitude training and racing specialists. Challenge yourself with our ultra-marathons in the Rocky Mountains. For experienced runners only.',
    upcomingRaces: [
      {
        id: '5',
        name: 'Mountain Ultra',
        date: '2024-12-01',
        type: 'Ultra',
      },
    ],
  },
  {
    id: '6',
    name: 'Beach Runners',
    image: '/organizer6.jpg',
    bio: 'Miami\'s premier running organization.',
    description: 'Beach running events',
    location: 'Miami, FL',
    email: 'contact@beachrunners.com',
    socials: {},
    verified: true,
    totalRaces: 22,
    totalParticipants: 9800,
    establishedYear: 2014,
    fullBio: 'Miami\'s premier running organization. Scenic beach runs with perfect weather year-round.',
    upcomingRaces: [
      {
        id: '6',
        name: 'Beach Half Marathon',
        date: '2025-01-10',
        type: 'Half Marathon',
      },
    ],
  },
];

export function getOrganizerById(id: string): ExtendedOrganizer | undefined {
  return mockOrganizers.find((org) => org.id === id);
}

export function getAllOrganizers(): ExtendedOrganizer[] {
  return mockOrganizers;
}

