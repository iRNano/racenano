import type { Event } from '@repo/types';
import { EventSchema } from '@repo/schemas';

// Mock events matching the base Event schema
export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'City Marathon 2024',
    preset: 'ROAD',
    date: '2024-10-12',
    location: 'New York, NY',
    organizerId: '1',
    status: 'PUBLISHED',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Trailblazer 10K',
    preset: 'TRAIL',
    date: '2024-08-02',
    location: 'Boulder, CO',
    organizerId: '2',
    status: 'PUBLISHED',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Coastal Fun Run',
    preset: 'ROAD',
    date: '2024-09-20',
    location: 'San Diego, CA',
    organizerId: '3',
    status: 'PUBLISHED',
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Urban Sprint',
    preset: 'ROAD',
    date: '2024-11-15',
    location: 'Chicago, IL',
    organizerId: '4',
    status: 'PUBLISHED',
    createdAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Mountain Ultra',
    preset: 'TRAIL',
    date: '2024-12-01',
    location: 'Denver, CO',
    organizerId: '5',
    status: 'PUBLISHED',
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Beach Half Marathon',
    preset: 'ROAD',
    date: '2025-01-10',
    location: 'Miami, FL',
    organizerId: '6',
    status: 'PUBLISHED',
    createdAt: '2024-01-06',
  },
];

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((event) => event.id === id);
}

export function getEventsByOrganizer(organizerId: string): Event[] {
  return mockEvents.filter((event) => event.organizerId === organizerId);
}

export function getAllEvents(): Event[] {
  return mockEvents;
}

export function validateEvent(data: unknown): Event {
  return EventSchema.parse(data);
}

