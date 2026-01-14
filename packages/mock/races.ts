import type { Event } from '@repo/types';

// Extended race type for the app (includes additional fields not in base schema)
export interface Race extends Omit<Event, 'preset'> {
  type: string; // 5K, 10K, Half Marathon, Marathon, Ultra
  description: string;
  cover: string;
  organizer: string;
  price: string;
  fullDescription?: string;
  distance?: string;
  elevation?: string;
  timeLimit?: string;
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
}

export const mockRaces: Race[] = [
  {
    id: '1',
    name: 'City Marathon 2024',
    date: '2024-10-12',
    location: 'New York, NY',
    type: 'Marathon',
    description: 'Join thousands of runners in the heart of New York City for this iconic marathon. Experience the energy of the city as you run through all five boroughs.',
    cover: '/race1.jpg',
    organizer: 'NYC Running Club',
    organizerId: '1',
    price: '$120',
    status: 'PUBLISHED',
    createdAt: '2024-01-01',
    fullDescription: 'Experience the energy of New York City as you run through all five boroughs in this iconic marathon. This world-renowned race takes you through Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. With over 50,000 participants annually, this is one of the largest marathons in the world. The course features flat terrain with some challenging bridges, making it accessible for runners of all levels while still providing a true test of endurance.',
    distance: '26.2 miles (42.2 km)',
    elevation: '1,200 ft gain',
    timeLimit: '6 hours 30 minutes',
    registrationDeadline: '2024-09-15',
    maxParticipants: 50000,
    currentParticipants: 32450,
  },
  {
    id: '2',
    name: 'Trailblazer 10K',
    date: '2024-08-02',
    location: 'Boulder, CO',
    type: '10K',
    description: 'A scenic trail run through the beautiful mountains of Colorado. Perfect for nature lovers and trail running enthusiasts.',
    cover: '/race2.jpg',
    organizer: 'Mountain Runners',
    organizerId: '2',
    price: '$45',
    status: 'PUBLISHED',
    createdAt: '2024-01-02',
    fullDescription: 'A scenic trail run through the beautiful mountains of Colorado. Perfect for nature lovers and trail running enthusiasts. The course winds through pristine mountain trails, offering breathtaking views of the Rocky Mountains. This challenging yet rewarding route includes technical sections, stream crossings, and elevation changes that will test your trail running skills.',
    distance: '10 km (6.2 miles)',
    elevation: '2,500 ft gain',
    timeLimit: '2 hours',
    registrationDeadline: '2024-07-25',
    maxParticipants: 500,
    currentParticipants: 342,
  },
  {
    id: '3',
    name: 'Coastal Fun Run',
    date: '2024-09-20',
    location: 'San Diego, CA',
    type: '5K',
    description: 'A fun and family-friendly 5K run along the beautiful San Diego coastline. Great for beginners and families.',
    cover: '/race3.jpg',
    organizer: 'Coastal Events',
    organizerId: '3',
    price: '$30',
    status: 'PUBLISHED',
    createdAt: '2024-01-03',
    fullDescription: 'A fun and family-friendly 5K run along the beautiful San Diego coastline. Great for beginners and families. The flat, paved course offers stunning ocean views and perfect weather. This event welcomes walkers, joggers, and runners of all ages and abilities. Post-race festivities include food trucks, live music, and activities for kids.',
    distance: '5 km (3.1 miles)',
    elevation: 'Flat',
    timeLimit: '1 hour',
    registrationDeadline: '2024-09-15',
    maxParticipants: 2000,
    currentParticipants: 1245,
  },
  {
    id: '4',
    name: 'Urban Sprint',
    date: '2024-11-15',
    location: 'Chicago, IL',
    type: '5K',
    description: 'Fast-paced urban 5K through downtown Chicago. Experience the city\'s architecture while pushing your limits.',
    cover: '/race4.jpg',
    organizer: 'Windy City Runners',
    organizerId: '4',
    price: '$35',
    status: 'PUBLISHED',
    createdAt: '2024-01-04',
    maxParticipants: 1000,
    currentParticipants: 0,
  },
  {
    id: '5',
    name: 'Mountain Ultra',
    date: '2024-12-01',
    location: 'Denver, CO',
    type: 'Ultra',
    description: 'Challenge yourself with this ultra-marathon through the Rocky Mountains. For experienced runners only.',
    cover: '/race5.jpg',
    organizer: 'Altitude Athletics',
    organizerId: '5',
    price: '$200',
    status: 'PUBLISHED',
    createdAt: '2024-01-05',
    maxParticipants: 200,
    currentParticipants: 0,
  },
  {
    id: '6',
    name: 'Beach Half Marathon',
    date: '2025-01-10',
    location: 'Miami, FL',
    type: 'Half Marathon',
    description: 'Run along the beautiful beaches of Miami in this scenic half marathon. Perfect weather and stunning views.',
    cover: '/race6.jpg',
    organizer: 'Beach Runners',
    organizerId: '6',
    price: '$75',
    status: 'PUBLISHED',
    createdAt: '2024-01-06',
    maxParticipants: 3000,
    currentParticipants: 0,
  },
];

export function getRaceById(id: string): Race | undefined {
  return mockRaces.find((race) => race.id === id);
}

export function getRacesByOrganizer(organizerId: string): Race[] {
  return mockRaces.filter((race) => race.organizerId === organizerId);
}

export function getAllRaces(): Race[] {
  return mockRaces;
}

